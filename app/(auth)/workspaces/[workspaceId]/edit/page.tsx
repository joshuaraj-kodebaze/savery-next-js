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
import {
  faStars,
  faArrowUpFromBracket,
  faChevronDown,
} from "@fortawesome/pro-regular-svg-icons";
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

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetWorkspace from "@/queries/workspaces/useGetWorkspace";
import useEditWorkspace from "@/queries/workspaces/useEditWorkspace";
import useGetWorkspaceUsers from "@/queries/workspaces/useGetWorkspaceUsers";

// Import utils
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

const UserProps = {
  name: "Neal Drasback",
};

const MockWorkspaceTotalMembers = [
  {
    memberType: "Workspace admin",
    numOfMembers: 1,
  },
  {
    memberType: "Project admin",
    numOfMembers: 2,
  },
  {
    memberType: "Super Users",
    numOfMembers: 3,
  },
  {
    memberType: "Users",
    numOfMembers: 3,
  },
];

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

interface WorkspaceUser {
  email: string;
  id: string;
}

const EditWorkspace = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const { workspaceId } = useParams();
  const { workspace, isLoading } = useGetWorkspace(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId
  );
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [workspaceMembers, setWorkspaceMembers] =
    useState<any>(MockWorkspaceMembers);
  const [searchText, setSearchText] = useState<string>("");

  const { editWorkspace, isMutating } = useEditWorkspace(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId
  );

  const { workspaceUsers } = useGetWorkspaceUsers(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId
  );

  useEffect(() => {
    if (workspaceUsers) {
      const filteredMembers: WorkspaceUser[] = workspaceUsers.filter(
        (member: WorkspaceUser) =>
          member.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setWorkspaceMembers(filteredMembers);
    }
  }, [searchText]);

  useEffect(() => {
    setWorkspaceName(workspace?.name);
  }, [workspace]);

  useEffect(() => {
    workspaceMembers(workspaceUsers);
  }, [workspaceUsers]);

  const handleSave = () => {
    let params = {
      name: workspaceName,
      description: "string",
      limit: 1,
      image_sha: "string",
    };

    editWorkspace(params)
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Successfully edited workapace!",
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
        navigate.push(ROUTES.workspaces.ALL_WORKSPACES);
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
          <FontAwesomeIcon icon={faStars} style={{ fontSize: 14 }} />{" "}
          <Title>Edit Workspace</Title>
        </div>
        {isMobile && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isMutating}
            loading={isMutating}
          >
            Save
          </Button>
        )}
      </div>
      <Grid container spacing={4} style={{ maxWidth: 1000 }}>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton variant="rounded" width={400} height={32} />
          ) : (
            <TextInput
              label={"Workspace name"}
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`Neal's Workspace`}
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              sx={{ width: "400px" }}
            />
          )}
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
          <Divider />
        </Grid>

        {/*Workspace invites */}
        {/* <Grid item xs={12}>
          <Select
            label={"Workspace invites"}
            labelFontSize={14}
            labelFontWeight={600}
            placeholder={`Project admin`}
          >
            <MenuItem value={"Workspace admin"}>Workspace admin</MenuItem>
            <MenuItem value={"Project admin"}>Project admin</MenuItem>
            <MenuItem value={"Super users"}>Super users</MenuItem>
            <MenuItem value={"Users"}>Users</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "12px",
              marginBottom: "10px",
              marginTop: -3,
            }}
          >
            What role can invite to this Workspace
          </Typography>
        </Grid> */}

        <Grid item xs={12}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, marginTop: 3 }}>
            Add member to workspace
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextInput
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`Write user email`}
              sx={{ marginTop: "5px", width: "400px" }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "5px", width: "100px" }}
            >
              Add
            </Button>
          </Box>
        </Grid>

        {/*Workspace members */}
        <Grid item xs={12}>
          <SectionHeader>Workspace members</SectionHeader>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "12px",
              marginBottom: "10px",
              marginTop: -4,
            }}
          >
            What role can invite to this Workspace
          </Typography>
        </Grid>

        {/* hide for now */}
        <Grid
          item
          xs={7}
          sx={{
            marginTop: -4,
          }}
        >
          <Box component={"div"} sx={{ display: "flex", gap: "32px" }}>
            {/* {MockWorkspaceTotalMembers.map((member, index) => (
              <Box component={"div"} key={`workspace-member-${index}`}>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {member.numOfMembers}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {member.memberType}
                </Typography>
              </Box>
            ))} */}
          </Box>
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
        <Grid item xs={12} sx={{ marginTop: -2 }}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              // justifyContent: "space-between",
              padding: "0px 24px",
            }}
          >
            <Box
              component={"div"}
              sx={{
                // width: "39%",
                width: "29%",
              }}
            >
              <TableHeader>User Email</TableHeader>
            </Box>
            <Box
              component={"div"}
              sx={{
                width: "39%",
              }}
            >
              <TableHeader>User ID</TableHeader>
            </Box>
            {/* <Box
              component={"div"}
              sx={{
                width: "22%",
              }}
            >
              <TableHeader>Role</TableHeader>
            </Box> */}
          </Box>
          {workspaceMembers &&
            workspaceMembers.map((member: any, index: number) => (
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
                    // width: "39%",
                    width: "29%",
                  }}
                >
                  <TableCell>{member.email}</TableCell>
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    width: "39%",
                  }}
                >
                  <TableCell>{member.id}</TableCell>
                </Box>
                {/* <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "22%",
                }}
              >
                <TableCell>{member.role}</TableCell>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ fontSize: 14, cursor: "pointer" }}
                />{" "}
              </Box> */}
              </Box>
            ))}
        </Grid>

        {/* Account info */}
        {/* <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon
              icon={faUserBountyHunter}
              style={{ fontSize: 14 }}
            />{" "}
            <Title>Account info</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"First name"} placeholder={"Neal"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Last name"} placeholder={"Drasbeck"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Email"} placeholder={"nealdrasbeck@gmail.com"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Phone"} placeholder={"-"} />
        </Grid> */}

        {/* Authentication info */}
        {/* <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon icon={faLockKeyhole} style={{ fontSize: 14 }} />{" "}
            <Title>Authentication</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label={"SAML Authentication"}
            placeholder={
              "SAML Authentication is currently enabled for this team"
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Microsoft Authentication"} placeholder={"-"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Google Authentication"} placeholder={"-"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Github Authentication"} placeholder={"-"} />
        </Grid> */}

        {/* Email notifications */}
        {/* <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 14 }} />{" "}
            <Title>Email notifications</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup>
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Billing and account"
            />
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Announcements"
            />
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Newsletter"
            />
          </FormGroup>
        </Grid> */}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!isMobile && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isMutating}
            loading={isMutating}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditWorkspace;
