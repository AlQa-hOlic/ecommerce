import { FC } from "react";
import classes from "./placeholder.module.css";

export interface PlaceholderProps {}

const Placeholder: FC<PlaceholderProps> = () => {
  return <div className={classes.loading}></div>;
};

export default Placeholder;
