"use client";

import MicrosoftIcon from "@/assets/icons/microsoft-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import GithubIcon from "@/assets/icons/github-icon.svg";
import Divider from "@mui/material/Divider";
import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import components
import {
  ButtonContainer,
  ButtonText,
  Container,
  TermsTextContainer,
  ContinueText,
  SamlButtonContainer,
} from "./login.styles";

interface LoginButtonProps {
  icon: string;
  text: string;
}

const LoginButton = ({ icon, text }: LoginButtonProps) => {
  return (
    <ButtonContainer onClick={() => console.log(`${text} button clicked`)}>
      <Image src={icon} style={{ height: 16, width: 16 }} alt="Icon" />
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

const Login = () => {
  const theme = useTheme();
  const navigate = useRouter();

  return (
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
      <LoginButton icon={MicrosoftIcon} text="Sign in with Microsoft" />
      <LoginButton icon={GoogleIcon} text="Sign in with Google" />
      <LoginButton icon={GithubIcon} text="Sign in with GitHub" />

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
      >
        SAML SSO
      </SamlButtonContainer>
    </Container>
  );
};

export default Login;
