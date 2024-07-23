"use client";

// Import libraries
import { Box, Divider, Typography } from "@mui/material";
import {
  faArrowUpRight,
  faRightFromBracket,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Import components
import {
  SideBarContainer,
  SectionTitle,
  NavLink,
  SideBarInnerContainer,
} from "./side-bar.styles";

// Import utils
import { SIDEBAR_NAV_ITEMS, SIDEBAR_SECTIONS } from "./side-bar.utils";

type SideBarProps = {
  isOpen: boolean;
  handleClose?: () => void;
};

const SideBar = ({ isOpen, handleClose }: SideBarProps) => {
  const location = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(location);
  }, [location]);

  return (
    <SideBarContainer variant="persistent" open={isOpen}>
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
                <Divider />
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
                      isactivelink={activeLink === item.path ? 1 : 0}
                      onClick={handleClose}
                    >
                      {item.title}
                    </NavLink>
                  ))}
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
            onClick={() => console.log("Logout")}
          >
            <Typography sx={{ fontSize: "14px" }}>Logout</Typography>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ fontSize: 10 }}
            />
          </Box>
        </Box>
      </SideBarInnerContainer>
    </SideBarContainer>
  );
};

export default SideBar;
