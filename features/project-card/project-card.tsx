"use client";

// Import libraries
import { Box, DialogContent, Typography, Skeleton } from "@mui/material";
import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useParams } from "next/navigation";

// Import assets
import ProjectIcon from "@/assets/icons/project-icon.svg";

// Import components
import { Card, Title, MembersCount } from "./project-card.styles";
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
import useGetProjectUsers from "@/queries/projects/useGetProjectUsers";
import useDeleteProject from "@/queries/projects/useDeleteProject";

// Import utils
import { COLORS } from "@/utils/colors";
import { ROUTES, USER_ACCOUNT_ID } from "@/utils/constants";

export interface TProjectCard {
  id: number;
  name: string;
  refetch?: () => void;
  workspace_id?: string;
}

const ProjectCard = ({ id, name, refetch, workspace_id }: TProjectCard) => {
  const dispatch = useAppDispatch();
  const location = usePathname();
  const navigate = useRouter();
  const { workspaceId } = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popover" : undefined;

  const { projectUsers, isLoading: isGetProjectUsersLoading } =
    useGetProjectUsers(
      USER_ACCOUNT_ID,
      (workspaceId as string) ?? workspace_id,
      id.toString()
    );
  const { deleteProject, isMutating } = useDeleteProject(
    USER_ACCOUNT_ID,
    (workspaceId as string) ?? workspace_id,
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
      `${ROUTES.workspaces.ALL_WORKSPACES}/${
        workspaceId ?? workspace_id
      }/project/${id}/edit`
    );
  };

  const handleDeleteProject = () => {
    deleteProject()
      .then((res) => {
        if (res) {
          dispatch(
            showToast({
              message: "Deleted project",
            })
          );
          refetch && refetch();
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
      <Image src={ProjectIcon} style={{ width: 40 }} alt="Project Icon" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Link
          href={`${location}${ROUTES.projects.PROJECT}/${id}`}
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
          {isGetProjectUsersLoading ? (
            <Skeleton variant="rounded" width={100} height={12} />
          ) : (
            <MembersCount>{projectUsers?.length} member</MembersCount>
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
              onClick={() => handleDeleteProject()}
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

export default ProjectCard;
