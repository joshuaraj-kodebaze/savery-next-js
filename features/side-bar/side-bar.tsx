"use client";

// Import libraries
import {
  Box,
  Divider,
  Typography,
  DialogContent,
  Skeleton,
} from "@mui/material";
import {
  faArrowUpRight,
  faRightFromBracket,
} from "@fortawesome/pro-regular-svg-icons";
import { faAngleRight, faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import { signOut } from "next-auth/react";

// Import components
import {
  SideBarContainer,
  SectionTitle,
  NavLink,
  SideBarInnerContainer,
} from "./side-bar.styles";
import Dialog from "@/components/dialog/dialog";
import Button from "@/components/button/button";

// Import queries
import useGetWorkspaces from "@/queries/workspaces/useGetWorkspaces";
import useGetProjects from "@/queries/projects/useGetProjects";
import useGetAgentNetworks from "@/queries/agent-networks/useGetAgentNetworks";

// Import types
import { TWorkspaceList } from "@/app/(auth)/workspaces/page";
import { TProjectCard } from "../project-card/project-card";

// Import utils
import { SIDEBAR_NAV_ITEMS, SIDEBAR_SECTIONS } from "./side-bar.utils";
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

type SideBarProps = {
  isOpen: boolean;
  handleClose?: () => void;
};

const SideBarContentWithoutActiveWorkspace = ({
  handleClose,
  toggleLogoutDialog,
}: {
  handleClose?: () => void;
  toggleLogoutDialog: () => void;
}) => {
  const location = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(location);
  }, [location]);

  return (
    <SideBarInnerContainer>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {Object.entries(SIDEBAR_NAV_ITEMS).map(([key, value], idx) => {
          if (key === SIDEBAR_SECTIONS.EXTERNAL) return;
          if (key === SIDEBAR_SECTIONS.MAIN) {
            return value.map((item, i) => (
              <NavLink
                key={`nav-item-${key}-${i}`}
                href={item.path}
                disabled={item.isDisabled}
                isactivelink={activeLink === item.path ? 1 : 0}
                onClick={handleClose}
              >
                {item.title}
              </NavLink>
            ));
          }

          return (
            <Box
              key={`nav-section-${idx}`}
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {idx === 0 ? <></> : <Divider />}
              <SectionTitle isFirst={idx === 0}>{key}</SectionTitle>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {value.map((item, i) => {
                  if (item.isHidden) return;
                  return (
                    <NavLink
                      key={`nav-item-${key}-${i}`}
                      href={item.path}
                      disabled={item.isDisabled}
                      isactivelink={activeLink === item.path ? 1 : 0}
                      onClick={handleClose}
                    >
                      {item.title}
                    </NavLink>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {Object.entries(SIDEBAR_NAV_ITEMS).map(([key, value]) => {
          if (key === SIDEBAR_SECTIONS.EXTERNAL) {
            return value.map((item, i) => (
              <NavLink
                key={`nav-item-${key}-${i}`}
                href={item.path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                disabled={item.isDisabled}
                target="_blank"
                onClick={handleClose}
              >
                {item.title}
                <FontAwesomeIcon
                  icon={faArrowUpRight}
                  style={{ fontSize: 10 }}
                />
              </NavLink>
            ));
          }
        })}
        <Divider />
        <Box
          sx={{
            padding: "0px 24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => toggleLogoutDialog()}
        >
          <Typography sx={{ fontSize: "14px" }}>Logout</Typography>
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: 10 }} />
        </Box>
      </Box>
    </SideBarInnerContainer>
  );
};

const WorkspacesDropdown = ({ workspaceId }: { workspaceId: string }) => {
  const { workspaces, isLoading } = useGetWorkspaces(USER_ACCOUNT_ID) as {
    workspaces: TWorkspaceList["workspaces"];
    isLoading: boolean;
  };

  const [expandWorkspaces, setExpandWorkspaces] = useState(false);

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0px",
            paddingRight: 2,
            cursor: "pointer",
          }}
        >
          <Skeleton
            variant="rounded"
            width={100}
            height={12}
            style={{
              margin: "0 12px",
            }}
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: expandWorkspaces ? "25px" : "0px",
              paddingRight: 2,
              cursor: "pointer",
            }}
            onClick={() => setExpandWorkspaces((prevState) => !prevState)}
          >
            <SectionTitle isFirst={true} isWorspaceActive={true}>
              Workspaces
            </SectionTitle>
            <FontAwesomeIcon
              icon={expandWorkspaces ? faAngleDown : faAngleRight}
              style={{ fontSize: 10 }}
            />
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              height: expandWorkspaces ? "fit-content" : "0px",
              overflow: "hidden",
            }}
          >
            {workspaces?.length ? (
              workspaces
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, i) => (
                  <NavLink
                    key={`workspace-item-${i}`}
                    href={`${ROUTES.workspaces.ALL_WORKSPACES}/${item.id}`}
                    isactivelink={workspaceId === item.id.toString() ? 1 : 0}
                  >
                    <span
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                ))
            ) : (
              <></>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

const ProjectsDropdown = ({
  workspaceId,
  projectId,
}: {
  workspaceId: string;
  projectId: string;
}) => {
  const { projects, isLoading } = useGetProjects(
    USER_ACCOUNT_ID,
    workspaceId
  ) as {
    projects: TProjectCard[];
    isLoading: boolean;
  };

  console.log("projects ->", projects);

  const [expandProjects, setExpandProjects] = useState(false);

  return (
    <>
      <Divider />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0px",
              paddingRight: 2,
              cursor: "pointer",
            }}
          >
            <Skeleton
              variant="rounded"
              width={100}
              height={12}
              style={{
                margin: "0 12px",
              }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: expandProjects ? "25px" : "0px",
                paddingRight: 2,
                cursor: "pointer",
              }}
              onClick={() => setExpandProjects((prevState) => !prevState)}
            >
              <SectionTitle isFirst={true} isWorspaceActive={true}>
                Projects
              </SectionTitle>
              <FontAwesomeIcon
                icon={expandProjects ? faAngleDown : faAngleRight}
                style={{ fontSize: 10 }}
              />
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: expandProjects ? "fit-content" : "0px",
                overflow: "hidden",
              }}
            >
              {projects?.length ? (
                projects
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, i) => (
                    <NavLink
                      key={`workspace-item-${i}`}
                      href={`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}${ROUTES.projects.PROJECT}/${item.id}`}
                      isactivelink={projectId === item.id.toString() ? 1 : 0}
                    >
                      {item.name}
                    </NavLink>
                  ))
              ) : (
                <></>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

const AgentNetworksDropdown = ({
  workspaceId,
  projectId,
  networkId,
}: {
  workspaceId: string;
  projectId: string;
  networkId: string;
}) => {
  const { agentNetworks, isLoading } = useGetAgentNetworks(
    USER_ACCOUNT_ID,
    workspaceId,
    projectId
  ) as {
    agentNetworks: TWorkspaceList["workspaces"];
    isLoading: boolean;
  };

  const [expandNetworks, setExpandNetworks] = useState(false);

  return (
    <>
      <Divider />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0px",
              paddingRight: 2,
              cursor: "pointer",
            }}
          >
            <Skeleton
              variant="rounded"
              width={100}
              height={12}
              style={{
                margin: "0 12px",
              }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: expandNetworks ? "25px" : "0px",
                paddingRight: 2,
                cursor: "pointer",
              }}
              onClick={() => setExpandNetworks((prevState) => !prevState)}
            >
              <SectionTitle isFirst={true} isWorspaceActive={true}>
                Agent Networks
              </SectionTitle>
              <FontAwesomeIcon
                icon={expandNetworks ? faAngleDown : faAngleRight}
                style={{ fontSize: 10 }}
              />
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: expandNetworks ? "fit-content" : "0px",
                overflow: "hidden",
              }}
            >
              {agentNetworks?.length ? (
                agentNetworks.map((item, i) => (
                  <NavLink
                    key={`workspace-item-${i}`}
                    href={`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}${ROUTES.projects.PROJECT}/${projectId}${ROUTES.network.NETWORK}/${item.id}`}
                    isactivelink={networkId === item.id.toString() ? 1 : 0}
                  >
                    {item.name}
                  </NavLink>
                ))
              ) : (
                <></>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

const SideBarContentWithActiveWorkspace = ({
  handleClose,
  toggleLogoutDialog,
}: {
  handleClose?: () => void;
  toggleLogoutDialog: () => void;
}) => {
  const { workspaceId, projectId, networkId } = useParams();

  return (
    <SideBarInnerContainer>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          height: "calc(100vh-100px)",
          overflow: "auto",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        {workspaceId ? (
          <WorkspacesDropdown workspaceId={workspaceId as string} />
        ) : (
          <></>
        )}
        {projectId ? (
          <ProjectsDropdown
            workspaceId={workspaceId as string}
            projectId={projectId as string}
          />
        ) : (
          <></>
        )}
        {networkId ? (
          <AgentNetworksDropdown
            workspaceId={workspaceId as string}
            projectId={projectId as string}
            networkId={networkId as string}
          />
        ) : (
          <></>
        )}
      </Box>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Divider />
        {Object.entries(SIDEBAR_NAV_ITEMS).map(([key, value], idx) => {
          if (key === SIDEBAR_SECTIONS.SETTINGS) {
            return (
              <Box
                key={`nav-section-${idx}`}
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SectionTitle>{key}</SectionTitle>
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {value.map((item, i) => (
                    <NavLink
                      key={`nav-item-${key}-${i}`}
                      href={item.path}
                      disabled={item.isDisabled}
                      // isactivelink={activeLink === item.path ? 1 : 0}
                      onClick={handleClose}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </Box>
              </Box>
            );
          }
        })}
        <Divider />
        <Box
          sx={{
            padding: "0px 24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => toggleLogoutDialog()}
        >
          <Typography sx={{ fontSize: "14px" }}>Logout</Typography>
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: 10 }} />
        </Box>
      </Box>
    </SideBarInnerContainer>
  );
};

const SideBar = ({ isOpen, handleClose }: SideBarProps) => {
  const { workspaceId, projectId } = useParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleLogoutDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  return (
    <>
      <SideBarContainer
        variant="persistent"
        open={isOpen}
        isWorkspaceActive={!!workspaceId && !!projectId}
      >
        {workspaceId && projectId ? (
          <SideBarContentWithActiveWorkspace
            handleClose={handleClose}
            toggleLogoutDialog={toggleLogoutDialog}
          />
        ) : (
          <SideBarContentWithoutActiveWorkspace
            handleClose={handleClose}
            toggleLogoutDialog={toggleLogoutDialog}
          />
        )}
      </SideBarContainer>
      <Dialog open={isDialogOpen} onClose={() => toggleLogoutDialog()}>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            padding: 0,
          }}
        >
          <Typography>Are you sure you want to logout?</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/login" });
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={() => toggleLogoutDialog()}>
              No
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SideBar;
