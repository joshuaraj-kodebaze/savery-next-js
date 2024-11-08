"use client";

// Import libraries
import { useTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { styled, type BoxProps } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Import context
import Auth from "./Auth";

// Import components
import Toast from "@/components/toast/toast";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// Import features
import TopBar from "@/features/top-bar/top-bar";
import SideBar from "@/features/side-bar/side-bar";

// Import redux
import { toggleSideBar } from "@/redux/user/userSlice";

// Import utils
import { ROUTES } from "@/utils/constants";

type LayoutContainerProps = {
  isOpen: boolean;
} & BoxProps;

export const LayoutContainer = styled("div")<LayoutContainerProps>(
  ({ theme, isOpen }) => ({
    height: "calc(100vh - 50px)",
    marginTop: 50,
    marginLeft: isOpen ? 208 : 0,
    padding: "24px 24px 24px 40px",
    transition: "all 200ms",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "16px",
    },
  })
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const location = usePathname();
  const navigate = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    navigate.push(`${ROUTES.user.LOGIN}`);
  }

  const { isSidebarOpen } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (
      !isMobile &&
      isSidebarOpen &&
      location.includes(ROUTES.session.SESSION)
    ) {
      dispatch(toggleSideBar());
    }
    if (
      !isMobile &&
      !isSidebarOpen &&
      !location.includes(ROUTES.session.SESSION)
    ) {
      dispatch(toggleSideBar());
    }
  }, [location, dispatch]);

  const handleClick = () => dispatch(toggleSideBar());

  return (
    <Auth>
      <TopBar isOpen={isSidebarOpen} onClick={handleClick} />
      {isMobile ? (
        <SideBar isOpen={!isSidebarOpen} handleClose={() => handleClick()} />
      ) : (
        <SideBar isOpen={isSidebarOpen} />
      )}

      <LayoutContainer isOpen={isSidebarOpen}>
        {children}
        <Toast />
      </LayoutContainer>
    </Auth>
  );
};

export default MainLayout;
