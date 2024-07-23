"use client";

// Import libraries
import { useState, useRef, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

// Import components
import {
  PromptInputContainer,
  PromptTextAresField,
} from "./prompt-field.styles";
import Button from "@/components/button/button";

// Import assets
import SaveryIcon from "@/assets/icons/savery-icon.svg";

// Import hooks
import { useAutosizeTextArea } from "@/hooks/useAutosizeTextArea";

type PromptFieldProps = {
  containerStyles?: React.CSSProperties;
  onButtonClick: (data: string) => void;
};

const PromptField = ({
  containerStyles,
  onButtonClick = () => {},
}: PromptFieldProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [width, setWidth] = useState(isMobile ? 25 : 50);
  const [description, setDescription] = useState<string>("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [initialWidth, setInitialWidth] = useState(0);

  useAutosizeTextArea(textAreaRef.current, description);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWidth(e.target.value.length);
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (!textAreaRef.current?.offsetWidth) return;
    const val = width * (isMobile ? 7 : 6.5);

    if (isMultiLine && val < initialWidth) {
      setIsMultiLine(false);
      return;
    }

    if (val >= textAreaRef.current?.offsetWidth) {
      setInitialWidth(textAreaRef.current?.offsetWidth);
      setIsMultiLine(true);
    }
  }, [width, textAreaRef, isMultiLine, initialWidth, isMobile]);

  return (
    <PromptInputContainer
      style={{ ...containerStyles }}
      isMultiLine={isMultiLine}
    >
      <PromptTextAresField
        ref={textAreaRef}
        placeholder="Type your prompt Item here..."
        value={description}
        onChange={changeHandler}
        rows={1}
        isMultiLine={isMultiLine}
      />
      <Button
        variant="contained"
        startIcon={<img src={SaveryIcon} alt="Button Icon" />}
        style={{ minWidth: 120, maxWidth: 120 }}
        onClick={() => onButtonClick(description)}
      >
        Save my day
      </Button>
    </PromptInputContainer>
  );
};

export default PromptField;
