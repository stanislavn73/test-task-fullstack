import { ReactNode } from "react";
import Button, { ButtonClasses } from "@mui/material/Button";
import styles from "./circle-button.module.css";

type Props = {
  icon: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  color?:
    | "error"
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
  classes?: Partial<ButtonClasses>;
};

export const CircleButton = ({
  icon,
  onClick,
  isLoading,
  color,
  size,
  classes,
}: Props) => {
  return (
    <Button
      variant="contained"
      sx={{ borderRadius: "50%", minWidth: 56, width: 56, height: 56 }}
      classes={{ startIcon: styles.icon, ...classes }}
      startIcon={icon}
      onClick={onClick}
      loading={isLoading}
      color={color || "error"}
      size={size}
    />
  );
};
