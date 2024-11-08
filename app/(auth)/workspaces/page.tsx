"use client";

// Import libraries
import { Typography, Box, useTheme, Skeleton } from "@mui/material";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

// Import components
import SearchField from "@/components/search-field/search-field";
import Button from "@/components/button/button";
import { SectionToolBar } from "../all-projects/all-projects.styles";

// Import features
import WorkspaceCard from "@/features/workspace-card/workspace-card";

// Import queries
import useGetWorkspaces from "@/queries/workspaces/useGetWorkspaces";

// Import utils
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

export type TWorkspaceList = {
  searchText: string;
  workspaces: {
    id: string;
    name: string;
    description: string;
    limit: number;
    image_sha: string;
    created_at: string;
  }[];
  refetch: () => void;
};

const EmptyWorkspaceList = ({ onClick }: { onClick: () => void }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "-100px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
        Currently, you are not part of any workspaces
      </Typography>
      <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
        Accept an invite from a workspace admin to start using Savery or
      </Typography>
      <Button
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />}
        onClick={onClick}
        style={{ textTransform: "none" }}
      >
        Create a workspace
      </Button>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 400,
          color: theme.palette.text.secondary,
        }}
      >
        Requires billing information
      </Typography>
    </Box>
  );
};

const WorkspaceList = ({ searchText, workspaces, refetch }: TWorkspaceList) => {
  const _workspaces = useMemo(() => {
    if (!searchText) return workspaces;

    return workspaces.filter((workspace) =>
      workspace.name
        .toLocaleLowerCase()
        .startsWith(searchText.toLocaleLowerCase())
    );
  }, [workspaces, searchText]);

  return (
    <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {_workspaces
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((workspace, idx) => (
          <WorkspaceCard
            key={`workspace-card-${idx}`}
            id={workspace.id}
            name={workspace.name}
            refetch={refetch}
          />
        ))}
    </Box>
  );
};

const WorkspaceListLoader = () => {
  return (
    <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
    </Box>
  );
};

const Workspaces = () => {
  const navigate = useRouter();

  const {
    workspaces,
    isLoading: isGetWorkspacesLoading,
    mutate: refetchGetWorkspaces,
  } = useGetWorkspaces(USER_ACCOUNT_ID);

  const [searchText, setSearchText] = useState<string>("");

  const handleCreateWorkspaceLink = () => {
    navigate.push(
      `${ROUTES.workspaces.ALL_WORKSPACES}/${ROUTES.workspaces.CREATE_WORKSPACES}`
    );
  };

  return (
    <Box component={"section"}>
      <SectionToolBar component={"div"}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          Workspaces
        </Typography>
        {workspaces?.length ? (
          <Box component={"div"} sx={{ display: "flex", gap: "12px" }}>
            <SearchField
              value={searchText}
              placeholder="Search workspaces"
              onChange={(e) => setSearchText(e.target.value)}
              onClose={() => setSearchText("")}
            />
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
              }
              onClick={handleCreateWorkspaceLink}
            >
              New Workspace
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </SectionToolBar>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 95px)",
          marginTop: "42px",
        }}
      >
        {isGetWorkspacesLoading ? (
          <WorkspaceListLoader />
        ) : workspaces?.length ? (
          <WorkspaceList
            searchText={searchText}
            workspaces={workspaces}
            refetch={refetchGetWorkspaces}
          />
        ) : (
          <EmptyWorkspaceList onClick={handleCreateWorkspaceLink} />
        )}
      </Box>
    </Box>
  );
};

export default Workspaces;
