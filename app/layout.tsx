import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Import context
import StoreProvider from "./StoreProvider";
import AuthContext from "./AuthContext";

// Import utils
import theme from "@/utils/theme";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Savery",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContext>
              <StoreProvider>{children}</StoreProvider>
            </AuthContext>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
