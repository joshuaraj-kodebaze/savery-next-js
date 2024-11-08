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
import NetworkCard from "@/features/network-card/network-card";
import { SectionToolBar } from "@/app/(auth)/all-projects/all-projects.styles";
import CreateDrawer from "@/features/create-drawer/create-drawer";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { toggleIsCreate } from "@/redux/project/projectSlice";
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetAgentNetworks from "@/queries/agent-networks/useGetAgentNetworks";
import useCreateAgentNetwork from "@/queries/agent-networks/useCreateAgentNetwork";

// Import utils
import { USER_ACCOUNT_ID } from "@/utils/constants";

// Import types
import { TProjectCard } from "@/features/project-card/project-card";

const MockAgentNetworks = [
  "Software network",
  "Data science network",
  "Documentation network",
];

type TNetworkList = {
  searchText: string;
  networkList: TProjectCard[];
  refetch: () => void;
};

const EmptyNetworkList = ({ onClick }: { onClick: () => void }) => {
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
        Currently, you have no agent networks
      </Typography>
      <Button
        variant="contained"
        startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />}
        onClick={onClick}
        style={{ textTransform: "none" }}
      >
        Create agent network
      </Button>
    </Box>
  );
};

const NetworkList = ({ searchText, networkList, refetch }: TNetworkList) => {
  const networks = useMemo(() => {
    if (!searchText) return networkList;

    return networkList.filter((project) =>
      project.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }, [networkList, searchText]);

  return (
    <>
      <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {networks?.map((network, idx) => (
          <NetworkCard
            key={`network-card-${idx}`}
            id={network.id}
            name={network.name}
            refetch={refetch}
          />
        ))}
      </Box>
    </>
  );
};

const NetworkListLoader = () => {
  return (
    <Box component={"div"} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
      <Skeleton variant="rounded" width={182} height={208} />
    </Box>
  );
};

const AllNetworks = () => {
  const { workspaceId, projectId } = useParams();
  const dispatch = useAppDispatch();

  const {
    agentNetworks,
    isLoading: isGetAgentNetworksLoading,
    mutate: refetchGetAgentNetworks,
  } = useGetAgentNetworks(
    USER_ACCOUNT_ID,
    workspaceId as string,
    projectId as string
  );

  const { createAgentNetwork, isMutating } = useCreateAgentNetwork(
    USER_ACCOUNT_ID,
    workspaceId as string,
    projectId as string
  );

  const { isCreate } = useAppSelector((state) => state.project);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [agentName, setAgentName] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isCreate) {
      setIsDrawerOpen(true);
    }
    window.history.replaceState({}, "");
  }, [isCreate]);

  useEffect(() => {
    if (agentName) {
      setIsError(false);
    }
  }, [agentName]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
    dispatch(toggleIsCreate());
    setAgentName("");
  };

  const handleCreateAgentNetwork = () => {
    if (!agentName) return setIsError(true);

    const newAgentNetwork = {
      name: agentName,
      description: "123",
      configuration: "123",
    };

    createAgentNetwork(newAgentNetwork)
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Successfully created agent network!",
            })
          );
          refetchGetAgentNetworks();
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
          All Networks
        </Typography>
        {agentNetworks?.length ? (
          <Box component={"div"} sx={{ display: "flex", gap: "12px" }}>
            <SearchField
              value={searchText}
              placeholder="Search networks"
              onChange={(e) => setSearchText(e.target.value)}
              onClose={() => setSearchText("")}
            />
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
              }
              onClick={toggleDrawer}
            >
              New Agent Network
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
        {isGetAgentNetworksLoading ? (
          <NetworkListLoader />
        ) : agentNetworks?.length ? (
          <NetworkList
            searchText={searchText}
            networkList={agentNetworks}
            refetch={refetchGetAgentNetworks}
          />
        ) : (
          <EmptyNetworkList onClick={toggleDrawer} />
        )}
      </Box>
      <CreateDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        name={agentName}
        setName={setAgentName}
        itemList={MockAgentNetworks}
        handleCreate={handleCreateAgentNetwork}
        createType={"network"}
        isError={isError}
        isLoading={isMutating}
      />
    </Box>
  );
};

export default AllNetworks;
