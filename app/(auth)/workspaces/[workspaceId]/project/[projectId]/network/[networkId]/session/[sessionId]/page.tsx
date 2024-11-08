"use client";

// Import libraries
import { useState, useEffect } from "react";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/pro-regular-svg-icons";

// Import hooks
import { useAppSelector } from "@/hooks/useAppSelector";

// Import styled components
import {
  SectionContainer,
  ChatContainer,
  SectionInnerContainer,
  Title,
} from "./session.styles";
import PromptChat from "@/components/prompt-chat/prompt-chat";
import PromptField from "@/features/prompt-field/prompt-field";
import TaskBar from "@/features/task-bar/task-bar";
import Button from "@/components/button/button";

const Agent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isTaskBarOpen, setIsTaskBarOpen] = useState(false);
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false);

  const { isSidebarOpen } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isMobile && hasSubmittedPrompt) return setIsTaskBarOpen(true);
    else return setIsTaskBarOpen(false);
  }, [isMobile, hasSubmittedPrompt]);

  const handlePromptSubmit = () => {
    setIsTaskBarOpen(true);
    setHasSubmittedPrompt(true);
  };

  return (
    <SectionContainer taskBar={isTaskBarOpen} sideBar={isSidebarOpen}>
      <SectionInnerContainer>
        <ChatContainer taskBar={isTaskBarOpen}>
          <PromptChat
            username="Agent P."
            text="Hey, I'm Agent. P. I will be your Project Manager on Project X"
            backgroundColor="#E9EEFF"
            position="left"
          />
          <PromptChat
            username="Agent R."
            text="Hey, I'm Agent R. I will be your researcher on Project X"
            backgroundColor="#FFEED0"
            position="right"
          />
          <PromptChat
            username="Agent E."
            text="Hey, I'm Agent. E. I will be your Engineer on Project X"
            backgroundColor="#E7FFB4"
            position="left"
            isPreviewHtml
            isPreviewCss
            isPreviewJs
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
            isPreviewHtml
            isPreviewCss
            isPreviewJs
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
            hasTaskList={true}
          />
          <PromptChat
            username="Agent T."
            text="Hey, I'm DR T. I will be your Tester on Project X"
            backgroundColor="#FFE3E3"
            position="right"
          />
          <PromptChat
            username="Agent P."
            text="Looking forward to seeing what we can help you with..."
            backgroundColor="#E9EEFF"
            position="left"
          />
        </ChatContainer>
        {!isTaskBarOpen && !hasSubmittedPrompt ? (
          <PromptField onButtonClick={handlePromptSubmit} />
        ) : null}
        {hasSubmittedPrompt && isMobile ? (
          <>
            <Divider
              sx={{
                marginLeft: -2,
                marginRight: -2,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                }}
                onClick={() => setIsTaskBarOpen(true)}
              >
                <Title>Tasks</Title>
                <FontAwesomeIcon
                  icon={faChevronUp}
                  style={{ fontSize: 12, strokeWidth: 1.5 }}
                />
              </Box>
              <Button
                variant="contained"
                style={{
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.common.black,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                Cancel project
              </Button>
            </Box>
          </>
        ) : null}
      </SectionInnerContainer>
      <TaskBar open={isTaskBarOpen} onClose={() => setIsTaskBarOpen(false)} />
    </SectionContainer>
  );
};

export default Agent;
