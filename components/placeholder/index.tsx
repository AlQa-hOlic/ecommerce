import { FC, HTMLAttributes } from "react";
import classes from "./placeholder.module.css";

export interface PlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Placeholder: FC<PlaceholderProps> = ({
  height = "auto",
  width = "100%",
  className,
}) => {
  return (
    <div
      className={`${classes.loading}${className ? ` ${className}` : ""}`}
      style={{ height, width }}
    ></div>
  );
};

export default Placeholder;
