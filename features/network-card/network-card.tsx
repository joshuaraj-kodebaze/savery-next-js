"use client";

// Import libraries
import { Box, DialogContent, Typography, Skeleton } from "@mui/material";
import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useParams } from "next/navigation";

// Import assets
import NetworkIcon from "@/assets/icons/network-icon.svg";

// Import components
import { Card, Title, MembersCount } from "../project-card/project-card.styles";
import IconButton from "@/components/icon-button/icon-button";
import CustomPopover from "@/components/custom-popover/custom-popover";
import { DropdownOption } from "../workspace-card/workspace-card.styles";
import Dialog from "@/components/dialog/dialog";
import Button from "@/components/button/button";

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetAgentNetworkUsers from "@/queries/agent-networks/useGetAgentNetworkUsers";
import useDeleteAgentNetwork from "@/queries/agent-networks/useDeleteAgentNetwork";

// Import utils
import { COLORS } from "@/utils/colors";
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

export interface TNetworkCard {
  id: number;
  name: string;
  refetch: () => void;
}

const NetworkCard = ({ id, name, refetch }: TNetworkCard) => {
  const dispatch = useAppDispatch();
  const location = usePathname();
  const navigate = useRouter();
  const { workspaceId, projectId } = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popover" : undefined;

  const { agentNetworkUsers, isLoading: isGetAgentNetworkUsersLoading } =
    useGetAgentNetworkUsers(
      USER_ACCOUNT_ID,
      workspaceId[0],
      projectId[0],
      id.toString()
    );
  const { deleteAgentNetwork, isMutating } = useDeleteAgentNetwork(
    USER_ACCOUNT_ID,
    workspaceId[0],
    projectId[0],
    id.toString()
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDeleteDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate.push(
      `${ROUTES.workspaces.ALL_WORKSPACES}/${workspaceId}/project/${projectId}/network/${id}/edit`
    );
  };

  const handleDeleteWorkspace = () => {
    deleteAgentNetwork()
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Deleted agent network",
            })
          );
          refetch();
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
        toggleDeleteDialog();
        handleClose();
      });
  };

  return (
    <Card>
      <Image src={NetworkIcon} style={{ width: 40 }} alt="Network Icon" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Link
          href={`${location}${ROUTES.network.NETWORK}/${id}`}
          style={{ textDecoration: "none" }}
        >
          <Title>{name}</Title>
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {isGetAgentNetworkUsersLoading ? (
            <Skeleton variant="rounded" width={100} height={12} />
          ) : (
            <MembersCount>{agentNetworkUsers?.length} member</MembersCount>
          )}
          <IconButton
            aria-describedby={popperId}
            icontype="icon"
            icon={faEllipsis}
            style={{
              color: COLORS.mildGrey,
              fontSize: 18,
            }}
            onClick={handleClick}
          />
          <CustomPopover
            id={popperId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box>
              <DropdownOption onClick={handleEdit}>Edit</DropdownOption>
            </Box>
            <Box>
              <DropdownOption onClick={() => toggleDeleteDialog()}>
                Delete
              </DropdownOption>
            </Box>
          </CustomPopover>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => toggleDeleteDialog()}>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Typography>{`Delete ${name}?`}</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => handleDeleteWorkspace()}
              disabled={isMutating}
              loading={isMutating}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={() => toggleDeleteDialog()}
              disabled={isMutating}
            >
              No
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NetworkCard;
