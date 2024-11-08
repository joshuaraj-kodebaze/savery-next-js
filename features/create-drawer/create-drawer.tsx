"use client";

// Import libraries
import { Typography, Box, Divider, Drawer, Grid } from "@mui/material";
import Image from "next/image";

// Import assets
import NetworkIcon from "@/assets/icons/network-icon.svg";
import ProjectIcon from "@/assets/icons/project-icon.svg";

// Import components
import { TableHeader, TableCell } from "./create-drawer.styles";
import TextInput from "@/components/text-input/text-input";
import Checkbox from "@/components/checkbox/checkbox";
import Button from "@/components/button/button";

// Import utils
import { COLORS } from "@/utils/colors";

export interface TCreateDrawer {
  id?: number;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  name: string;
  setName: (name: string) => void;
  itemList: string[];
  handleCreate: () => void;
  createType?: string;
  isError?: boolean;
  isLoading?: boolean;
}

const CreateDrawer = ({
  id,
  isDrawerOpen,
  toggleDrawer,
  name,
  setName,
  itemList,
  handleCreate,
  createType,
  isError,
  isLoading,
}: TCreateDrawer) => {
  return (
    <Drawer open={isDrawerOpen} onClose={toggleDrawer} anchor={"right"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "416px",
          padding: "5rem 1.5rem",
          gap: "2rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image
            src={createType === "project" ? ProjectIcon : NetworkIcon}
            style={{ width: 40 }}
            alt="Project Icon"
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: COLORS.darkBlue,
              cursor: "pointer",
            }}
            onClick={toggleDrawer}
          >
            Cancel
          </Typography>
        </Box>
        <Typography sx={{}}>
          Name your {createType === "project" ? "new project" : "Agent Network"}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <TextInput
            value={name}
            label={"Name"}
            placeholder={
              createType === "project" ? "Project Y" : "Agent Network 1"
            }
            autoFocus
            onChange={(e) => setName(e.target.value)}
            error={isError}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: COLORS.darkBlue,
          }}
        >
          {createType === "project"
            ? "Add members to project"
            : "Add agent network"}
        </Typography>
        <Divider sx={{ marginTop: "-1rem" }} />
        <Grid item xs={12}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 24px",
            }}
          >
            <Box
              component={"div"}
              sx={{
                width: "90%",
              }}
            >
              <TableHeader>
                {createType === "project" ? "User Name" : "Networks"}
              </TableHeader>
            </Box>
            <Box
              component={"div"}
              sx={{
                width: "10%",
              }}
            >
              <TableHeader>Add</TableHeader>
            </Box>
          </Box>
          {itemList.map((member: any, index: number) => (
            <Box
              key={`member-${index}`}
              component={"div"}
              sx={{
                display: "flex",
                padding: "8px 24px",
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                }}
              >
                <TableCell>{member}</TableCell>
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "10%",
                }}
              >
                <Checkbox disabled />
              </Box>
            </Box>
          ))}
        </Grid>
        <Divider sx={{ marginTop: "-1rem" }} />

        {createType === "project" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: COLORS.lightGray,
              }}
            >
              Copy shareable link
            </Typography>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={isLoading}
              loading={isLoading}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={isLoading}
              loading={isLoading}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CreateDrawer;
