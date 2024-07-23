// Import libraries
import { styled } from "@mui/material";

// Import features
import TopBar from "@/features/top-bar/top-bar";

export const LayoutContainer = styled("div")(({ theme }) => ({
  height: "calc(100vh - 50px)",
  marginTop: 50,
  marginLeft: 0,
  padding: "24px 24px 24px 40px",
  [theme.breakpoints.down("md")]: {
    padding: "16px",
  },
}));

const MinimalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopBar />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
};

export default MinimalLayout;
