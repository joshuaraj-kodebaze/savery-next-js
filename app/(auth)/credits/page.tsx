"use client";

// Import libraries
import { Typography, Grid, useTheme } from "@mui/material";

// Import components
import {
  ButtonContainer,
  SectionHeader,
  SectionText,
  RemainingCreditsContainer,
} from "./credits.styles";

import TextInput from "@/components/text-input/text-input";
import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";

const Credits = () => {
  const theme = useTheme();

  return (
    <div style={{ paddingBottom: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          // alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionHeader>Add funds manually</SectionHeader>
          <SectionText>
            Select the amount of EURO you want to add to your workspace
          </SectionText>
          <div style={{ display: "flex", gap: "12px" }}>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €250
              </Typography>
            </ButtonContainer>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €500
              </Typography>
            </ButtonContainer>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €1000
              </Typography>
            </ButtonContainer>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <TextInput
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`€1`}
              sx={{ marginTop: "5px", width: "200px" }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "12px", width: "100px" }}
            >
              Add funds
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Checkbox />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: theme.palette.text.secondary,
              }}
            >
              Get notified when balance hits €20
            </Typography>
          </div>
        </div>
        <RemainingCreditsContainer>
          <SectionHeader sx={{ marginBottom: "-10px" }}>
            Remaining credits
          </SectionHeader>
          <SectionText sx={{ marginBottom: "-10px" }}>
            Service available with a minimum of €20.
          </SectionText>
          <Typography
            sx={{
              fontSize: "42px",
              fontWeight: 400,
            }}
          >
            €129
          </Typography>
        </RemainingCreditsContainer>
      </div>
      <Grid container spacing={4} style={{ maxWidth: 700 }}>
        <Grid item xs={12} sx={{ marginTop: "30px" }}>
          <SectionHeader>Add funds automatically</SectionHeader>
          <SectionText>
            Set automatically refill credits when funds drop to €20
          </SectionText>
          <div style={{ display: "flex", gap: "12px" }}>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €250
              </Typography>
            </ButtonContainer>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €500
              </Typography>
            </ButtonContainer>
            <ButtonContainer>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                €1000
              </Typography>
            </ButtonContainer>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <TextInput
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`€1`}
              sx={{ marginTop: "5px", width: "200px" }}
            />
            <Button
              variant="contained"
              disabled
              sx={{ marginTop: "12px", width: "100px" }}
            >
              Add funds
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Checkbox />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: theme.palette.text.secondary,
              }}
            >
              Get notified when balance hits €20
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: "30px" }}>
          <SectionHeader>Get notified</SectionHeader>
          <SectionText>Alert when monthly spends pass:</SectionText>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <TextInput
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`€1`}
              sx={{ marginTop: "5px", width: "200px" }}
            />
            <Button
              variant="contained"
              disabled
              sx={{ marginTop: "12px", width: "100px" }}
            >
              Save
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "0px" }}>
          <SectionText>Set a monthly limit</SectionText>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <TextInput
              labelFontSize={14}
              labelFontWeight={600}
              placeholder={`€1`}
              sx={{ marginTop: "5px", width: "200px" }}
            />
            <Button
              variant="contained"
              disabled
              sx={{ marginTop: "12px", width: "100px" }}
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Credits;
