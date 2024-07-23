// Import libraries
import { Box, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/pro-regular-svg-icons";
import Image from "next/image";

// Import components
import {
  HtmlContainer,
  IconContainer,
  CopyCodeContainer,
  Username,
} from "./prompt-html.styles";

// Import assets
import SaveryIcon from "@/assets/icons/savery-icon.svg";

type PromptHtmlProps = {
  content: string;
  backgroundColor?: string;
  position?: string;
};

const PromptHtml = (props: PromptHtmlProps) => {
  const theme = useTheme();

  const {
    content,
    backgroundColor = theme.palette.text.primary,
    position = "left",
  } = props;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          marginBottom: "10px",
          justifyContent: position === "left" ? "flex-start" : "flex-end",
        }}
      >
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",

              marginBottom: "8px",
            }}
          >
            <IconContainer>
              <Image src={SaveryIcon} alt="Savery Icon" width={12} height={8} />
            </IconContainer>

            <Username>HTML</Username>
          </Box>
          <HtmlContainer style={{ backgroundColor: backgroundColor }}>
            {content}
          </HtmlContainer>
          <CopyCodeContainer
            style={{ backgroundColor: backgroundColor }}
            onClick={() => {
              navigator.clipboard.writeText(content);
            }}
          >
            <FontAwesomeIcon
              icon={faCopy}
              style={{
                fontSize: 12,
                padding: 4,
                fontWeight: 300,
                marginRight: 3,
              }}
            />
            Copy code
          </CopyCodeContainer>
        </div>
      </Box>
    </div>
  );
};

export default PromptHtml;
