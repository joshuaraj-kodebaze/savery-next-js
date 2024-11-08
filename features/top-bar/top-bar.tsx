"use client";

// Import libraries
import { Box, useTheme, useMediaQuery, Skeleton } from "@mui/material";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/pro-regular-svg-icons";
import { Typography } from "@mui/material";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Import assets
import ProjectIcon from "@/assets/icons/project-icon.svg";
import NetworkIcon from "@/assets/icons/network-icon.svg";

// Import components
import {
  HeaderContainer,
  UserContainer,
  ToolBarContainer,
  UserAvatar,
  ToolBarInnerContainer,
  SimpleContainer,
  PaddedContainer,
} from "./top-bar.styles";
import Logo from "@/components/logo/logo";
import IconButton from "@/components/icon-button/icon-button";

// Import features
import { IconCardSmall } from "@/features/workspace-card/workspace-card.styles";

// Import queries
import useGetWorkspace from "@/queries/workspaces/useGetWorkspace";
import useGetProject from "@/queries/projects/useGetProject";
import useGetAgentNetwork from "@/queries/agent-networks/useGetAgentNetwork";

// Import utils
import { ROUTES, SESSIONS, USER_ACCOUNT_ID } from "@/utils/constants";
import { COLORS } from "@/utils/colors";

type TopBarProps = {
  isOpen?: boolean;
  onClick?: () => void;
};

const SESSION_OPTIONS = {
  CHAT: "Chat & task",
  FILES: "Files",
  PREVIEW: "Preview",
};

const CurrentWorkspace = ({ workspaceId }: { workspaceId: string }) => {
  const { workspace, isLoading } = useGetWorkspace(
    USER_ACCOUNT_ID,
    workspaceId
  );

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <Skeleton variant="rounded" width={16} height={16} />
      <Skeleton variant="rounded" width={50} height={12} />
    </Box>
  ) : (
    <Link
      href={`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {workspace ? (
          <>
            <IconCardSmall>
              <span style={{ textTransform: "capitalize" }}>
                {workspace?.name.charAt(0)}
              </span>
            </IconCardSmall>
            <Typography
              sx={{
                fontSize: 12,
                color: COLORS.mildGrey,
                textTransform: "capitalize",
              }}
            >
              {workspace?.name}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Link>
  );
};

const CurrentProject = ({
  workspaceId,
  projectId,
  networkId,
}: {
  workspaceId: string;
  projectId: string;
  networkId?: string;
}) => {
  const { project, isLoading } = useGetProject(
    USER_ACCOUNT_ID,
    workspaceId,
    projectId
  );

  return (
    <>
      <Typography
        sx={{
          fontSize: 12,
          color: COLORS.mildGrey,
        }}
      >
        /
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rounded" width={16} height={16} />
          <Skeleton variant="rounded" width={50} height={12} />
        </Box>
      ) : (
        <Link
          href={`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}${ROUTES.projects.PROJECT}/${projectId}`}
          style={{
            userSelect: "none",
            textDecoration: "none",
            pointerEvents: networkId ? "auto" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Image src={ProjectIcon} style={{ width: 16 }} alt="Project Icon" />
            <Typography
              sx={{
                fontSize: 12,
                color: COLORS.mildGrey,
              }}
            >
              {project?.name}
            </Typography>
          </Box>
        </Link>
      )}
    </>
  );
};

const CurrentAgentNetwork = ({
  workspaceId,
  projectId,
  networkId,
  sessionId,
}: {
  workspaceId: string;
  projectId: string;
  networkId: string;
  sessionId?: string;
}) => {
  const { agentNetwork, isLoading } = useGetAgentNetwork(
    USER_ACCOUNT_ID,
    workspaceId,
    projectId,
    networkId
  );

  return (
    <>
      <Typography
        sx={{
          fontSize: 12,
          color: COLORS.mildGrey,
        }}
      >
        /
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rounded" width={16} height={16} />
          <Skeleton variant="rounded" width={50} height={12} />
        </Box>
      ) : (
        <Link
          href={`${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}${ROUTES.projects.PROJECT}/${projectId}${ROUTES.network.NETWORK}/${networkId}`}
          style={{
            userSelect: "none",
            textDecoration: "none",
            pointerEvents: sessionId ? "auto" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Image src={NetworkIcon} style={{ width: 16 }} alt="Network Icon" />
            <Typography
              sx={{
                fontSize: 12,
                color: COLORS.mildGrey,
              }}
            >
              {agentNetwork?.name}
            </Typography>
          </Box>
        </Link>
      )}
    </>
  );
};

const TopBar = ({ isOpen = false, onClick }: TopBarProps) => {
  const { workspaceId, projectId, networkId, sessionId } = useParams();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = usePathname();
  const router = useRouter();

  const { data: sessionData } = useSession();

  const [isNavigateBack, setIsNavigateBack] = useState<boolean>(false);
  const [isNavigateForward, setIsNavigateForward] = useState<boolean>(false);

  useEffect(() => {
    if (location !== ROUTES.projects.ALL_PROJECTS) {
      setIsNavigateBack(true);
    } else {
      setIsNavigateBack(false);
    }
  }, [location]);

  const sessionDetails = useMemo(() => {
    if (!sessionId) return;
    return SESSIONS.find((val) => val.id === parseInt(sessionId[0]));
  }, [sessionId]);

  const locationAuthPath = () => {
    //will be removed
    if (location === ROUTES.user.SAML) {
      return true;
    } else if (location === ROUTES.user.LOGIN) {
      return true;
    } else if (location === ROUTES.user.POLICY) {
      return true;
    } else if (location === ROUTES.user.TERMS) {
      return true;
    }
    return false;
  };

  return (
    <HeaderContainer>
      {!locationAuthPath() ? (
        <>
          <UserContainer>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <UserAvatar>
                {sessionData?.user?.name && sessionData?.user?.name.charAt(0)}
              </UserAvatar>
              {isDesktop ? (
                <Typography
                  sx={{
                    fontSize: 14,
                    color: COLORS.darkBlue,
                  }}
                >
                  {sessionData?.user?.name && sessionData?.user?.name}
                </Typography>
              ) : null}
            </Box>
            <IconButton
              icontype="icon"
              icon={isOpen ? faAngleUp : faAngleDown}
              onClick={onClick}
            />
          </UserContainer>
          <ToolBarContainer>
            <ToolBarInnerContainer>
              <PaddedContainer>
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    icontype="icon"
                    icon={faAngleLeft}
                    disabled={!isNavigateBack}
                    onClick={() => router.back()}
                  />
                  <IconButton
                    icontype="icon"
                    icon={faAngleRight}
                    disabled={!isNavigateForward}
                    onClick={() => router.forward()}
                  />
                </Box>
              </PaddedContainer>
              {isDesktop && workspaceId ? (
                <>
                  <Box
                    sx={{
                      height: "100%",
                      borderLeft: `1px solid ${COLORS.slightDarkGray}`,
                    }}
                  ></Box>
                  <PaddedContainer>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CurrentWorkspace workspaceId={workspaceId as string} />
                      {projectId ? (
                        <CurrentProject
                          workspaceId={workspaceId as string}
                          projectId={projectId as string}
                          networkId={networkId as string}
                        />
                      ) : (
                        <></>
                      )}
                      {networkId ? (
                        <CurrentAgentNetwork
                          workspaceId={workspaceId as string}
                          projectId={projectId as string}
                          networkId={networkId as string}
                          sessionId={sessionId as string}
                        />
                      ) : (
                        <></>
                      )}
                      {sessionDetails ? (
                        <>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: COLORS.mildGrey,
                            }}
                          >
                            /
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                color: COLORS.mildGrey,
                              }}
                            >
                              {sessionDetails.name}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </PaddedContainer>
                </>
              ) : null}
              <Box
                sx={{
                  padding: "14px 24px 14px 0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    borderLeft: `1px solid ${COLORS.slightDarkGray}`,
                    paddingLeft: "24px",
                  }}
                >
                  {sessionId ? (
                    Object.entries(SESSION_OPTIONS).map(([k, v], idx) => (
                      <Box
                        key={`session-option-${k}`}
                        sx={{
                          borderRadius: "4px",
                          backgroundColor:
                            idx === 0 ? COLORS.slightDarkGray : "initial",
                          padding: idx === 0 ? "4px 8px" : "0px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: idx === 0 ? 700 : 400,
                          }}
                        >
                          {v}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </ToolBarInnerContainer>
            <PaddedContainer>
              {/* {isMobile ? (
                projectDetails ? (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={ProjectIcon}
                      style={{ width: 20 }}
                      alt="Project Icon"
                    />
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {projectDetails.name}
                    </Typography>
                  </Box>
                ) : (
                  <Logo />
                )
              ) : (
                <Logo />
              )} */}
              <Logo />
            </PaddedContainer>
          </ToolBarContainer>
        </>
      ) : (
        <SimpleContainer>
          {/* {location === ROUTES.user.SAML ? (
            <Box
              sx={{
                width: "70px",
              }}
            >
              <IconButton
                icontype="icon"
                icon={faAngleLeft}
                disabled={!isNavigateBack}
                onClick={() => router.back()}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "70px",
              }}
            ></Box>
          )} */}

          <Logo />
          {/* <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: theme.palette.primary.main,
            }}
          >
            Sign in
          </Typography> */}
        </SimpleContainer>
      )}
    </HeaderContainer>
  );
};

export default TopBar;
