// Import libraries
import { styled } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
  flexDirection: "column",
  gap: 12,
}));

type TButtonContainer = {
  isDisabled?: boolean;
};

export const ButtonContainer = styled("div")<TButtonContainer>(
  ({ theme, isDisabled }) => ({
    display: "flex",
    borderRadius: "100px",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: isDisabled
      ? theme.palette.text.disabled
      : theme.palette.common.white,
    padding: "9.5px, 24px, 9.5px, 24px",
    width: 327,
    height: 40,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    cursor: isDisabled ? "default" : "pointer",
    pointerEvents: isDisabled ? "none" : "initial",
    color: isDisabled ? theme.palette.common.white : theme.palette.text.primary,
  })
);

export const ButtonText = styled("div")(() => ({
  fontWeight: 600,
  fontSize: 14,
  // color: "#152023",
  marginLeft: 8,
}));

export const TermsTextContainer = styled("div")(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  width: 327,
  marginTop: 10,
  marginBottom: 10,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "18px",
  color: theme.palette.text.secondary,
  textAlign: "center",
}));

export const ContinueText = styled("div")(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: 10,
  width: 327,
  fontWeight: 400,
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

type TSamlButtonContainer = {
  isDisabled?: boolean;
};

export const SamlButtonContainer = styled("div")<TSamlButtonContainer>(
  ({ theme, isDisabled }) => ({
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    gap: 10,
    width: 327,
    marginTop: 15,
    height: 40,
    backgroundColor: isDisabled
      ? theme.palette.text.disabled
      : theme.palette.common.black,
    borderRadius: 100,
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.common.white,
    cursor: isDisabled ? "default" : "pointer",
    pointerEvents: isDisabled ? "none" : "initial",
  })
);
