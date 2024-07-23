"use client";

// Import libraries
import { Typography, Box } from "@mui/material";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// Import components
import Button from "@/components/button/button";

// Import utils
import { ROUTES } from "@/utils/constants";

const Recent = () => {
  const navigate = useRouter();

  return (
    <Box component={"section"}>
      <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
        Recent Projects
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 95px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            marginTop: "-100px",
          }}
        >
          <Typography variant="body1">You have no recent projects</Typography>
          <Button
            variant="contained"
            startIcon={
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
            }
            onClick={() =>
              navigate.push(ROUTES.projects.ALL_PROJECTS, {
                // query: { isCreate: true },
              })
            }
          >
            Create Project
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Recent;
