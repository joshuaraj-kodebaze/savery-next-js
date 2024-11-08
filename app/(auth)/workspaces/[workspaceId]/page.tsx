"use client";

// Import libraries
import { Typography, Box, Skeleton } from "@mui/material";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";

// Import components
import SearchField from "@/components/search-field/search-field";
import Button from "@/components/button/button";
import ProjectCard from "@/features/project-card/project-card";
import CreateDrawer from "@/features/create-drawer/create-drawer";
import { SectionToolBar } from "@/app/(auth)/all-projects/all-projects.styles";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import queries
import useGetProjects from "@/queries/projects/useGetProjects";
import useCreateProject from "@/queries/projects/useCreateProject";

// Import redux
import { toggleIsCreate } from "@/redux/project/projectSlice";
import { showToast } from "@/redux/toast/toastSlice";

// Import utils
import { USER_ACCOUNT_ID } from "@/utils/constants";

// Import types
import { TProjectCard } from "@/features/project-card/project-card";

const MockWorkspaceMembers = [
  "John Doe",
  "Lisa Worker",
  "Michael Jackson",
  "Bob Builder",
];

type TProjectList = {
  searchText: string;
  projectList: TProjectCard[];
  refetch: () => void;
};

const EmptyProjectList = ({ onClick }: { onClick: () => void }) => {
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
      <Button
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />}
        onClick={onClick}
        style={{ textTransform: "none" }}
      >
        Create project
      </Button>
    </Box>
  );
};

const ProjectList = ({ searchText, projectList, refetch }: TProjectList) => {
  const projects = useMemo(() => {
    if (!searchText) return projectList;

    return projectList.filter((project) =>
      project.name
        .toLocaleLowerCase()
        .startsWith(searchText.toLocaleLowerCase())
    );
  }, [projectList, searchText]);

  return (
    <>
      <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {projects
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((project, idx) => (
            <ProjectCard
              key={`project-card-${idx}`}
              id={project.id}
              name={project.name}
              refetch={refetch}
            />
          ))}
      </Box>
    </>
  );
};

export const ProjectListLoader = () => {
  return (
    <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
    </Box>
  );
};

const AllProjects = () => {
  const { workspaceId } = useParams();
  const dispatch = useAppDispatch();

  const {
    projects,
    isLoading: isGetProjectsLoading,
    mutate: refetchGetProjects,
  } = useGetProjects(USER_ACCOUNT_ID, workspaceId as string);

  const { createProject, isMutating } = useCreateProject(
    USER_ACCOUNT_ID,
    workspaceId as string
  );

  const { isCreate } = useAppSelector((state) => state.project);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectName, setProjectName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isCreate) {
      setIsDrawerOpen(true);
    }
    window.history.replaceState({}, "");
  }, [isCreate]);

  useEffect(() => {
    if (projectName) {
      setIsError(false);
    }
  }, [projectName]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
    dispatch(toggleIsCreate());
    setProjectName("");
  };

  const handleCreateProject = () => {
    if (!projectName) return setIsError(true);

    const newProject = {
      name: projectName,
      description: "",
      image_sha: "",
    };

    createProject(newProject)
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Successfully created project!",
            })
          );
          refetchGetProjects();
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
        toggleDrawer();
      });
  };

  return (
    <Box component={"section"}>
      <SectionToolBar component={"div"}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          All Projects
        </Typography>
        {projects?.length ? (
          <Box component={"div"} sx={{ display: "flex", gap: "12px" }}>
            <SearchField
              value={searchText}
              placeholder="Search projects"
              onChange={(e) => setSearchText(e.target.value)}
              onClose={() => setSearchText("")}
            />
            {/* <Button
              variant="outlined"
              startIcon={
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
              }
              onClick={() => {}}
            >
              Workspace Elements
            </Button> */}
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
              }
              onClick={toggleDrawer}
            >
              New Project
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
        {isGetProjectsLoading ? (
          <ProjectListLoader />
        ) : projects?.length ? (
          <ProjectList
            searchText={searchText}
            projectList={projects}
            refetch={refetchGetProjects}
          />
        ) : (
          <EmptyProjectList onClick={toggleDrawer} />
        )}
      </Box>
      <CreateDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        name={projectName}
        setName={setProjectName}
        itemList={MockWorkspaceMembers}
        handleCreate={handleCreateProject}
        createType={"project"}
        isError={isError}
        isLoading={isMutating}
      />
    </Box>
  );
};

export default AllProjects;
