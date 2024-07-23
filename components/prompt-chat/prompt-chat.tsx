"use-client";

// Import libraries
import { Box, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/pro-regular-svg-icons";
import { useState } from "react";

// Import components
import Button from "@/components/button/button";
import PromptHtml from "@/components/prompt-html/prompt-html";

import {
  TextContainer,
  PromptContainer,
  Username,
  PromptList,
  PromptListItem,
  PromptListItemContainer,
} from "./prompt-chat.styles";

type PromptChatProps = {
  username: string;
  text: string;
  backgroundColor: string;
  position?: string;
  isPreviewHtml?: boolean;
  isPreviewCss?: boolean;
  isPreviewJs?: boolean;
  hasTaskList?: boolean;
};

const dummyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <div id="face-recognition">
            <button id="face-recognition-btn">Login with Face</button>
            <video id="video" width="300" height="200" autoplay></video>
        </div>
        <div id="fallback-login">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button id="login-btn">Login</button>
        </div>
        <div id="error-message" class="hidden">Invalid login attempt. Please try again.</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;

const PromptButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <Button
      variant="contained"
      style={{
        height: 20,
        fontSize: 10,
        fontWeight: 400,
        marginRight: 8,
        padding: "0px 8px",
        textTransform: "none",
      }}
    >
      {buttonText}
    </Button>
  );
};

const PromptChat = (props: PromptChatProps) => {
  const theme = useTheme();
  const {
    username,
    text,
    backgroundColor,
    position = "left",
    isPreviewHtml = false,
    isPreviewCss = false,
    isPreviewJs = false,
    hasTaskList = false,
  } = props;

  const [displayHtml, setDisplayHtml] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "10px",
          alignItems: position === "left" ? "flex-start" : "flex-end",
        }}
      >
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <FontAwesomeIcon
              icon={faRobot}
              style={{
                fontSize: 12,
                backgroundColor: backgroundColor,
                padding: 4,
                borderRadius: "100px",
              }}
            />
            <Username>{username}</Username>
          </Box>
          <PromptContainer style={{ backgroundColor: backgroundColor }}>
            <TextContainer>{text}</TextContainer>
            {isPreviewHtml && (
              <Button
                variant="contained"
                style={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 400,
                  marginRight: 8,
                  padding: "0px 8px",
                  textTransform: "none",
                }}
                onClick={() => setDisplayHtml((prevState) => !prevState)}
              >
                Preview HTML
              </Button>
            )}
            {isPreviewCss && (
              <PromptButton buttonText={"Preview CSS (styles.css)"} />
            )}
            {isPreviewJs && (
              <PromptButton buttonText={"Preview JavaScript (script.js)"} />
            )}
          </PromptContainer>
          {hasTaskList ? (
            <PromptList>
              <PromptListItem>
                <PromptListItemContainer>
                  <span style={{ color: theme.palette.text.secondary }}>
                    1.
                  </span>
                  <span>This is dummy copy</span>
                </PromptListItemContainer>
              </PromptListItem>
              <PromptListItem>
                <PromptListItemContainer>
                  <span style={{ color: theme.palette.text.secondary }}>
                    2.
                  </span>
                  <span>This is dummy copy x2 This is dummy copy</span>
                </PromptListItemContainer>
              </PromptListItem>
              <PromptListItem>
                <PromptListItemContainer>
                  <span style={{ color: theme.palette.text.secondary }}>
                    3.
                  </span>
                  <span style={{ color: theme.palette.text.disabled }}>
                    Awaiting reply...
                  </span>
                </PromptListItemContainer>
              </PromptListItem>
            </PromptList>
          ) : null}
        </div>
        {displayHtml ? <PromptHtml content={dummyHtml} /> : null}
      </Box>
    </div>
  );
};

export default PromptChat;
