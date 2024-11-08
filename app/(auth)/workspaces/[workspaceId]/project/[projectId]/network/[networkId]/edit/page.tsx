"use client";

// Import libraries
import { useState, useEffect } from "react";
import { Grid, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

// Import components
import { Title } from "./edit.styles";
import TextInput from "@/components/text-input/text-input";
import Button from "@/components/button/button";

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetAgentNetwork from "@/queries/agent-networks/useGetAgentNetwork";
import useEditAgentNetwork from "@/queries/agent-networks/useEditAgentNetwork";

// Import utils
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

const EditAgentNetwork = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  const { workspaceId, projectId, networkId } = useParams();
  const { agentNetwork, isLoading } = useGetAgentNetwork(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId,
    Array.isArray(projectId) ? projectId[0] : projectId,
    Array.isArray(networkId) ? networkId[0] : networkId
  );

  const { editAgentNetwork, isMutating } = useEditAgentNetwork(
    USER_ACCOUNT_ID,
    Array.isArray(workspaceId) ? workspaceId[0] : workspaceId,
    Array.isArray(projectId) ? projectId[0] : projectId,
    Array.isArray(networkId) ? networkId[0] : networkId
  );

  const [agentNetworkName, setAgentNetworkName] = useState<string>("");
  const [currentAgentNetworkName, setCurrentAgentNetworkName] =
    useState<string>("");

  useEffect(() => {
    setAgentNetworkName(agentNetwork?.name);
    setCurrentAgentNetworkName(agentNetwork?.name);
  }, [agentNetwork]);

  const handleSave = () => {
    let params = {
      name: agentNetworkName,
      description: "123",
      configuration: "123",
    };
    editAgentNetwork(params)
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
        navigate.push(
          `${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}/${ROUTES.projects.PROJECT}/${projectId}`
        );
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
          <Title>Edit {currentAgentNetworkName}</Title>
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
              label={"Agent network name"}
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`Agent Network 1`}
              value={agentNetworkName}
              onChange={(e) => setAgentNetworkName(e.target.value)}
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
      </Grid>
    </div>
  );
};

export default EditAgentNetwork;
