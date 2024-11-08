"use client";

// Import libraries
import { Box, DialogContent, Typography, Skeleton } from "@mui/material";
import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import components
import { Card, Title } from "../project-card/project-card.styles";
import IconButton from "@/components/icon-button/icon-button";
import CustomPopover from "@/components/custom-popover/custom-popover";
import {
  IconCard,
  MembersCount,
  Status,
  DropdownOption,
} from "./workspace-card.styles";
import Dialog from "@/components/dialog/dialog";
import Button from "@/components/button/button";

// Import hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import redux
import { showToast } from "@/redux/toast/toastSlice";

// Import queries
import useGetWorkspaceUsers from "@/queries/workspaces/useGetWorkspaceUsers";
import useDeleteWorkspace from "@/queries/workspaces/useDeleteWorkspace";

// Import utils
import { COLORS } from "@/utils/colors";
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

export interface TWorkspaceCard {
  id: string;
  name: string;
  refetch: () => void;
}

const WorkspaceCard = ({ id, name, refetch }: TWorkspaceCard) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popover" : undefined;

  const { workspaceUsers, isLoading: isGetWorkspaceUserLoading } =
    useGetWorkspaceUsers(USER_ACCOUNT_ID, id);
  const { deleteWorkspace, isMutating } = useDeleteWorkspace(
    USER_ACCOUNT_ID,
    id
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

  const handleDeleteWorkspace = () => {
    deleteWorkspace()
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Deleted workspace",
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

  const handleEdit = () => {
    navigate.push(`${ROUTES.workspaces.ALL_WORKSPACES}/${id}/edit`);
  };

  return (
    <Card>
      <IconCard>
        <span>{name.charAt(0)}</span>
      </IconCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Link
          href={`${ROUTES.workspaces.ALL_WORKSPACES}/${id}`}
          style={{ textDecoration: "none" }}
        >
          <Title>{name}</Title>
        </Link>
        {isGetWorkspaceUserLoading ? (
          <Skeleton variant="rounded" width={100} height={12} />
        ) : (
          <MembersCount>{workspaceUsers?.length} member</MembersCount>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Status>Free</Status>
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
              <DropdownOption onClick={() => handleEdit()}>Edit</DropdownOption>
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
              onClick={() => {
                toggleDeleteDialog();
                handleClose();
              }}
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

export default WorkspaceCard;
