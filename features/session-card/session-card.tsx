"use client";

// Import libraries
import { Box } from "@mui/material";
import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Import assets
import NetworkIcon from "@/assets/icons/network-icon.svg";

// Import components
import { Title } from "../project-card/project-card.styles";
import IconButton from "@/components/icon-button/icon-button";
import CustomPopover from "@/components/custom-popover/custom-popover";
import { Card, Label } from "./session-card.styles";

// Import utils
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/constants";

export interface TSessionCard {
  id?: number;
  name: string;
  owner: string;
  lastUsed: string;
}

const SessionCard = ({ id, name, owner, lastUsed }: TSessionCard) => {
  const location = usePathname();

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
    <Link
      href={`${location}${ROUTES.session.SESSION}/${id}`}
      style={{ textDecoration: "none" }}
    >
      <Card>
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Image src={NetworkIcon} style={{ width: 40 }} alt="Network Icon" />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Label>Name</Label>
            <Title>{name}</Title>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Label>Owner</Label>
          <Title>{owner}</Title>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Label>Last used</Label>
            <Title>{lastUsed}</Title>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              right: 0,
              zIndex: 999,
            }}
          >
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
              <Box>Edit</Box>
              <Box>Delete session</Box>
            </CustomPopover>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default SessionCard;
