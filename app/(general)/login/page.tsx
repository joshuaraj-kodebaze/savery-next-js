"use client";

import MicrosoftIcon from "@/assets/icons/microsoft-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import GithubIcon from "@/assets/icons/github-icon.svg";
import Divider from "@mui/material/Divider";
import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense } from "react";

// Import components
import {
  ButtonContainer,
  ButtonText,
  Container,
  TermsTextContainer,
  ContinueText,
  SamlButtonContainer,
} from "./login.styles";

import { ROUTES } from "@/utils/constants";

interface LoginButtonProps {
  icon: string;
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const LoginButton = ({ icon, text, onClick, isDisabled }: LoginButtonProps) => {
  return (
    <ButtonContainer onClick={onClick} isDisabled={isDisabled}>
      <Image src={icon} style={{ height: 16, width: 16 }} alt="Icon" />
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

const Login = () => {
  const theme = useTheme();
  const navigate = useRouter();

  const searchParams = useSearchParams(); // Get query parameters from the URL.
  const callbackUrl =
    searchParams.get("callbackUrl") || `${ROUTES.workspaces.ALL_WORKSPACES}`;

  return (
    <Suspense>
      <Container>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          Create your free account
        </Typography>
        <LoginButton
          icon={MicrosoftIcon}
          text="Sign in with Microsoft"
          isDisabled={true}
        />
        <LoginButton
          icon={GoogleIcon}
          text="Sign in with Google"
          onClick={() => signIn("google", { callbackUrl })}
        />
        <LoginButton
          icon={GithubIcon}
          text="Sign in with GitHub"
          isDisabled={true}
        />

        <TermsTextContainer>
          By clicking continue, you agree to our
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            {" "}
            Terms of Service{" "}
          </Link>
          and
          <Link
            href="/policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            {" "}
            Privacy Policy{" "}
          </Link>
        </TermsTextContainer>

        <ContinueText>
          <Divider> or continue with</Divider>
        </ContinueText>

        <SamlButtonContainer
          onClick={() => {
            navigate.push("/saml");
          }}
          isDisabled={true}
        >
          SAML SSO
        </SamlButtonContainer>
      </Container>
    </Suspense>
  );
};

export default Login;
