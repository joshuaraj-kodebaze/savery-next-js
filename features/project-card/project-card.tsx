"use client";

// Import libraries
import { Box, Popover } from "@mui/material";
import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

// Import assets
import ProjectIcon from "@/assets/icons/project-icon.svg";

// Import components
import { Card, Title, MembersCount } from "./project-card.styles";
import IconButton from "@/components/icon-button/icon-button";
import CustomPopover from "@/components/custom-popover/custom-popover";

// Import utils
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/constants";

export interface TProjectCard {
  id?: number;
  name: string;
  membersCount: number;
}

const ProjectCard = ({ id, name, membersCount }: TProjectCard) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popperId = open ? "simple-popover" : undefined;

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
          href={`${ROUTES.projects.PROJECT}/${id}`}
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
          <MembersCount>{membersCount} member</MembersCount>
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
            <Box>Rename</Box>
            <Box>Delete Project</Box>
            <Box>Add members</Box>
          </CustomPopover>
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
