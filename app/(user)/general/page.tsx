"use client";

// Import libraries
import {
  Typography,
  Divider,
  FormGroup,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStars,
  faArrowUpFromBracket,
  faUserBountyHunter,
  faLockKeyhole,
  faEnvelope,
} from "@fortawesome/pro-regular-svg-icons";
import Grid from "@mui/material/Grid";
import TextInput from "@/components/text-input/text-input";
import Button from "@/components/button/button";
import CustomRadioButton from "@/components/custom-radio-button/custom-radio-button";

// Import components
import {
  CustomFormControlLabel,
  Title,
  UserAvatar,
  UploadButtonContainer,
} from "./general.styles";

const UserProps = {
  name: "Neal Drasback",
};

const General = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ paddingBottom: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <FontAwesomeIcon icon={faStars} style={{ fontSize: 14 }} />{" "}
          <Title>Workspace</Title>
        </div>
        {isMobile && <Button variant="contained">Save</Button>}
      </div>
      <Grid container spacing={4} style={{ maxWidth: 700 }}>
        <Grid item xs={12}>
          <TextInput
            label={"Workspace name"}
            placeholder={`Neal's Workspace`}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            You can upload images up to 256x256
          </Typography>
          <div style={{ display: "flex", gap: 10 }}>
            <UserAvatar>{UserProps.name.charAt(0)}</UserAvatar>
            <UploadButtonContainer>
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                style={{ fontSize: 12 }}
              />{" "}
              <Typography
                sx={{
                  fontSize: "12px",
                  marginLeft: "5px",
                  marginTop: "-2px",
                  fontWeight: 600,
                  color: theme.palette.common.white,
                }}
              >
                Upload
              </Typography>
            </UploadButtonContainer>
          </div>
        </Grid>

        {/* Account info */}
        <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon
              icon={faUserBountyHunter}
              style={{ fontSize: 14 }}
            />{" "}
            <Title>Account info</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"First name"} placeholder={"Neal"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Last name"} placeholder={"Drasbeck"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Email"} placeholder={"nealdrasbeck@gmail.com"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Phone"} placeholder={"-"} />
        </Grid>

        {/* Authentication info */}
        <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon icon={faLockKeyhole} style={{ fontSize: 14 }} />{" "}
            <Title>Authentication</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput
            label={"SAML Authentication"}
            placeholder={
              "SAML Authentication is currently enabled for this team"
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Microsoft Authentication"} placeholder={"-"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Google Authentication"} placeholder={"-"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInput label={"Github Authentication"} placeholder={"-"} />
        </Grid>

        {/* Email notifications */}
        <Grid item xs={12}>
          <Divider />
          <div style={{ display: "flex", marginTop: 30 }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 14 }} />{" "}
            <Title>Email notifications</Title>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup>
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Billing and account"
            />
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Announcements"
            />
            <CustomFormControlLabel
              control={<CustomRadioButton />}
              label="Newsletter"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!isMobile && <Button variant="contained">Save</Button>}
      </div>
    </div>
  );
};

export default General;
