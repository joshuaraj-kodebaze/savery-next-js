// Import libraries
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { type ButtonProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-regular-svg-icons";
import Image from "next/image";

// Import styled component
import { StyledIconButton } from "./icon-button.styles";

export type IconButtonProps = {
  icontype?: string;
  icon?: IconProp;
  image?: string;
} & ButtonProps;

const IconButton = (props: IconButtonProps) => {
  const { icontype, icon, image } = props;

  const renderIcon = () => {
    if (!icontype) return;

    switch (icontype) {
      case "icon":
        return <FontAwesomeIcon icon={icon ?? faUser} />;
      case "image":
        return image && <Image src={image} alt="Icon" />;
      default:
        return <FontAwesomeIcon icon={faUser} />;
    }
  };

  return (
    <StyledIconButton
      disableFocusRipple
      disableRipple
      disableTouchRipple
      {...props}
    >
      {renderIcon()}
    </StyledIconButton>
  );
};

export default IconButton;
