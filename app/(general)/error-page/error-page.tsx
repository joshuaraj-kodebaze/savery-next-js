// Import libraries
import { Box, Typography } from "@mui/material";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// Import components
import { ErrorPageContainer } from "./error-page.styles";
import Button from "@/components/button/button";

const ErrorPage = () => {
  const navigate = useRouter();

  return (
    <ErrorPageContainer>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontSize: "104px" }}>
          404
        </Typography>
        <Typography variant="body1">Page not found</Typography>
        <Button
          variant="contained"
          startIcon={
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 12 }} />
          }
          style={{ marginTop: 16 }}
          onClick={() => navigate.back()}
        >
          Go Back
        </Button>
      </Box>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
