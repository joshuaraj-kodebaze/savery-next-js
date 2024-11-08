"use client";

// Import libraries
import { Typography, Box } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

// Import components
import SearchField from "@/components/search-field/search-field";
import ProjectCard from "@/features/project-card/project-card";
import { SectionToolBar } from "./all-projects.styles";
import { ProjectListLoader } from "../workspaces/[workspaceId]/page";

// Import queries
import useGetWorkspaces from "@/queries/workspaces/useGetWorkspaces";

// Import types
import { TProjectCard } from "@/features/project-card/project-card";

// Import utils
import { USER_ACCOUNT_ID } from "@/utils/constants";

const EmptyProjectList = () => {
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
        Currently, you have no projects
      </Typography>
    </Box>
  );
};

const AllProjects = () => {
  const { workspaces, isLoading: isGetWorkspacesLoading } =
    useGetWorkspaces(USER_ACCOUNT_ID);

  const [projectList, setProjectList] = useState<TProjectCard[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  useEffect(() => {
    if (!workspaces) return;

    const getWorkspaceProjects = async (workspaceId: string) => {
      const response = await axios
        .get(`/api/v1/project/${workspaceId}?account_id=${USER_ACCOUNT_ID}`)
        .then((res) => res.data);

      if (response.length) {
        response.map((project) => {
          setProjectList((prevState) => {
            if (prevState.map((_state) => _state.id).includes(project.id))
              return prevState;
            return [...prevState, { ...project, workspace_id: workspaceId }];
          });
        });
      }
      return response;
    };

    workspaces.map((workspace) => {
      try {
        setIsProjectsLoading(true);
        getWorkspaceProjects(workspace.id);
      } finally {
        setIsProjectsLoading(false);
      }
    });
  }, [workspaces]);

  const projects = useMemo(() => {
    if (!searchText) return projectList;

    return projectList?.filter((project) =>
      project.name
        .toLocaleLowerCase()
        .startsWith(searchText.toLocaleLowerCase())
    );
  }, [projectList, searchText]);

  return (
    <Box component={"section"}>
      <SectionToolBar component={"div"}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          All Projects
        </Typography>
        <Box component={"div"} sx={{ display: "flex", gap: "12px" }}>
          <SearchField
            value={searchText}
            placeholder="Search project"
            onChange={(e) => setSearchText(e.target.value)}
            onClose={() => setSearchText("")}
          />
        </Box>
      </SectionToolBar>
      <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {isGetWorkspacesLoading ? (
          <ProjectListLoader />
        ) : (
          projects
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((project, idx) => (
              <ProjectCard
                key={`project-card-${idx}`}
                id={project.id}
                name={project.name}
                workspace_id={project.workspace_id}
              />
            ))
        )}
      </Box>
    </Box>
  );
};

export default AllProjects;
