"use client";

// Import libraries
import { Divider, useTheme, useMediaQuery } from "@mui/material";

import Grid from "@mui/material/Grid";
import { useState } from "react";

// Import components
import {
  Title,
  BilledText,
  SaveUpToText,
  PlanName,
  Price,
  PerMonthText,
  CustomPricing,
  PlanTitle,
  FeatureText,
  MostPopular,
} from "./plans.styles";
import Button from "@/components/button/button";
import SwitchButton from "@/components/switch-button/switch-button";

const DummyPricingData = [
  {
    id: "1",
    planName: "Starter",
    price: 0,
    title: "For those ... This is dummy copy x2 This is dummy copy",
    buttonText: "You are on Starter",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
    ],
  },
  {
    id: "2",
    planName: "Core",
    price: 19,
    title: "For those ... This is dummy copy x2 This is dummy copy",
    buttonText: "Upgrade to Core",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
    ],
  },
  {
    id: "3",
    planName: "Growth",
    price: 29,
    title: "For those ... This is dummy copy x2 This is dummy copy",
    buttonText: "Upgrade to Growth",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
      "Lorem ipsum dolor sit amet",
    ],
  },
  {
    id: "4",
    planName: "Enterprise",
    price: "Custom pricing",
    title: "For those ... This is dummy copy x2 This is dummy copy",
    buttonText: "Contact us",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
      "Tempor incididunt ut labore et dolore magna",
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit, sed do eiusmod",
    ],
  },
];

const Plans = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  const [isYearly, setIsYearly] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsYearly(event.target.checked);
  };

  const getButton = (plan: any) => {
    if (plan.planName === "Starter") {
      return (
        <Button
          variant="outlined"
          style={{
            color: theme.palette.common.black,
            borderColor: theme.palette.common.black,
            width: !isMobile ? 200 : "100%",
          }}
        >
          {plan.buttonText}
        </Button>
      );
    } else if (plan.planName === "Enterprise") {
      return (
        <Button
          variant="contained"
          style={{
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black,
            width: !isMobile ? 200 : "100%",
          }}
        >
          {plan.buttonText}
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{
            width: !isMobile ? 200 : "100%",
          }}
        >
          {plan.buttonText}
        </Button>
      );
    }
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex" }}>
          <Title>Workspace plans</Title>
        </div>
        {isMobile && (
          <div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <BilledText>Billed monthly</BilledText>
              <SwitchButton checked={isYearly} onChange={handleChange} />
              <BilledText>Billed yearly</BilledText>
            </div>
            <SaveUpToText>Save up to 32% with yearly billing</SaveUpToText>
          </div>
        )}
      </div>
      <Grid container spacing={isMobile ? 2 : 4} style={{}}>
        {DummyPricingData.map((plan, index) => (
          <Grid
            item
            xs={12}
            md={3}
            style={{ width: "100%", maxWidth: isMobile ? 264 : "" }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 20,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 12,
              }}
            >
              {plan.planName === "Core" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: -10,
                  }}
                >
                  <MostPopular>Most popular</MostPopular>
                </div>
              )}

              <PlanName>{plan.planName}</PlanName>

              {plan.price === "Custom pricing" ? (
                <CustomPricing>Custom pricing</CustomPricing>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}
                >
                  <Price>€{plan.price}</Price>
                  <PerMonthText> / mo</PerMonthText>
                </div>
              )}

              <PlanTitle>{plan.title}</PlanTitle>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {getButton(plan)}
              </div>

              <div style={{ marginTop: 20 }}>
                {plan.features.map((feature, index) => (
                  <FeatureText key={`feature-text-${index}`}>
                    {feature}
                  </FeatureText>
                ))}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      {!isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Divider
              sx={{
                marginTop: 3,
                marginBottom: 2,
                marginLeft: -8.5,
                marginRight: -8.5,
              }}
            />
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <BilledText>Billed monthly</BilledText>
              <SwitchButton checked={isYearly} onChange={handleChange} />
              <BilledText>Billed yearly</BilledText>
            </div>
            <SaveUpToText style={{ textAlign: "center" }}>
              Save up to 32% with yearly billing
            </SaveUpToText>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
