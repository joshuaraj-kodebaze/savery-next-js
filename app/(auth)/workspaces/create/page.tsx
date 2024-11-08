"use client";

// Import libraries
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { faStars } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// Import components
import Button from "@/components/button/button";

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import utils
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";
import TextInput from "@/components/text-input/text-input";

// Import queries
import useCreateWorkspace from "@/queries/workspaces/useCreateWorkspace";

const StepOne = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const [workspaceName, setWorkspaceName] = useState("");
  const [isError, setIsError] = useState(false);

  const { createWorkspace, isMutating } = useCreateWorkspace(USER_ACCOUNT_ID);

  const handleCreateWorkspace = (): void => {
    if (!workspaceName) return setIsError(true);

    let params = {
      name: workspaceName,
      description: "string",
      limit: 1,
      image_sha: "string",
    };

    createWorkspace(params)
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Successfully created project!",
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
    <Box
      sx={{
        marginTop: "42px",
        display: "flex",
        flexDirection: "column",
        gap: "42px",
      }}
    >
      <TextInput
        label={"Workspace name"}
        value={workspaceName}
        onChange={(e) => {
          setWorkspaceName(e.target.value);
          setIsError(false);
        }}
        placeholder={`Neal's Workspace`}
        disabled={isMutating}
        error={isError}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          Add members
        </Typography>
        <TextInput placeholder={`Workspace Admins`} disabled />
        <Typography sx={{ fontSize: "12px" }}>
          What role can invite to this Workspace
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Button
          variant="contained"
          onClick={handleCreateWorkspace}
          disabled={isMutating}
          loading={isMutating}
        >
          Save
        </Button>
        <Button variant="text" disabled={isMutating}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const CreateWorkspace = () => {
  return (
    <Box component={"section"}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faStars} style={{ fontSize: 14 }} />
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          Create Workspace
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>1/3</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 95px)",
        }}
      >
        <Box sx={{ width: "400px" }}>
          <StepOne />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateWorkspace;
