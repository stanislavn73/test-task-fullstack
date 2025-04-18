import { FC, ReactNode } from "react";
import classNames from "classnames";
import { Link } from "@tanstack/react-router";
import styles from "./page-wrapper.module.css";
import ProfileImage from "../../assets/profile.png";

type Props = {
  children: ReactNode;
};

export const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Link to={"/"} className={classNames(styles.link, styles.logoTitle)}>
          VoiceShare
        </Link>
        <Link to={"/"}>
          <img src={ProfileImage} alt="Profile avatar" />
        </Link>
      </div>
      {children}
    </div>
  );
};
