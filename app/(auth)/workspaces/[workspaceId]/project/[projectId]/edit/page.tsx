"use client";

// Import libraries
import { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import { useParams, useRouter } from "next/navigation";

// Import components
import {
  Title,
  UserAvatar,
  UploadButtonContainer,
  TableHeader,
  TableCell,
  SectionHeader,
} from "./edit.styles";
import SearchField from "@/components/search-field/search-field";
import TextInput from "@/components/text-input/text-input";
import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetProject from "@/queries/projects/useGetProject";
import useEditProject from "@/queries/projects/useEditProject";
import useGetProjectUsers from "@/queries/projects/useGetProjectUsers";

// Import utils
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

const UserProps = {
  name: "Neal Drasback",
};

const MockWorkspaceMembers = [
  {
    username: "John Doe",
    userId: "1q2w3e4r5t6y7u8i9",
    role: "Workspace admin",
  },
  {
    username: "Lisa Worker",
    userId: "1q2w3e4r5t6y7u8i9",
    role: "Project admin",
  },
  {
    username: "Michael Jackson",
    userId: "1q2w3e4r5t6y7u8i9",
    role: "Super Users",
  },
  {
    username: "Bob Builder",
    userId: "1q2w3e4r5t6y7u8i9",
    role: "User",
  },
];

const EditProject = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  const [projectMembers, setProjectMembers] =
    useState<any>(MockWorkspaceMembers);
  const [searchText, setSearchText] = useState<string>("");

  const { workspaceId, projectId } = useParams();
  const { project, isLoading } = useGetProject(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId,
    Array.isArray(projectId) ? projectId[0] : projectId
  );

  const { editProject, isMutating } = useEditProject(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId,
    Array.isArray(projectId) ? projectId[0] : projectId
  );

  const { projectUsers } = useGetProjectUsers(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId,
    Array.isArray(projectId) ? projectId[0] : projectId
  );

  const [projectName, setProjectName] = useState<string>("");
  const [currentProjectName, setCurrentProjectName] = useState<string>("");

  useEffect(() => {
    setProjectName(project?.name);
    setCurrentProjectName(project?.name);
  }, [project]);

  useEffect(() => {
    setProjectMembers(projectUsers);
  }, [projectUsers]);

  useEffect(() => {
    if (projectUsers) {
      const filteredMembers = projectUsers.filter((member: { email: string }) =>
        member.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setProjectMembers(filteredMembers);
    }
  }, [searchText]);

  const handleSave = () => {
    let params = {
      name: projectName,
      description: "string",
      image_sha: "string",
    };

    editProject(params)
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Successfully edited project!",
            })
          );
        } else {
          dispatch(
            showToast({
              message: "Please try again!",
              type: "error",
            })
          );
        }
      })
      .finally(() => {
        navigate.push(`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}`);
      });
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <Title>Edit {currentProjectName}</Title>
        </div>
      </div>
      <Grid container spacing={4} style={{ maxWidth: 700 }}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", gap: "12px", alignItems: "end" }}
        >
          {isLoading ? (
            <Skeleton variant="rounded" width={400} height={32} />
          ) : (
            <TextInput
              label={"Project name"}
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`IT Project`}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ width: 364 }}
            />
          )}
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isMutating}
            loading={isMutating}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            You can upload images up to 256x256
          </Typography>
          <div style={{ display: "flex", gap: 10, marginBottom: 40 }}>
            <UserAvatar>{UserProps.name.charAt(0)}</UserAvatar>
            <UploadButtonContainer>
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                style={{ fontSize: 12 }}
              />{" "}
              <Typography
                sx={{
                  fontSize: "12px",
                  marginLeft: "5px",
                  marginTop: "-2px",
                  fontWeight: 600,
                  color: theme.palette.common.white,
                }}
              >
                Upload
              </Typography>
            </UploadButtonContainer>
          </div>
        </Grid>

        {/*Remove members */}
        <Grid item xs={12}>
          <SectionHeader>Remove members</SectionHeader>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "12px",
              marginBottom: "10px",
              marginTop: -4,
            }}
          >
            Is it always possible to invite users again
          </Typography>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            marginTop: -4,
          }}
        >
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <SearchField
              value={searchText}
              placeholder="Search user"
              onChange={(e) => setSearchText(e.target.value)}
              onClose={() => setSearchText("")}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            marginTop: -4,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button variant="contained">Remove selected</Button>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: -2 }}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 24px",
            }}
          >
            <Box
              component={"div"}
              sx={{
                width: "90%",
              }}
            >
              <TableHeader>User Name</TableHeader>
            </Box>
            <Box
              component={"div"}
              sx={{
                width: "10%",
              }}
            >
              <TableHeader>Remove</TableHeader>
            </Box>
          </Box>
          {projectMembers &&
            projectMembers.map((member: any, index: number) => (
              <Box
                key={`workspace-member-${index}`}
                component={"div"}
                sx={{
                  display: "flex",
                  padding: "8px 24px",
                }}
              >
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <TableCell>{member.email}</TableCell>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "10%",
                  }}
                >
                  <Checkbox />
                </Box>
              </Box>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProject;
