import { useState } from "react";
import Link from "@mui/material/Link";
import classNames from "classnames";

import styles from "./recording.module.css";
import { getFormattedTime } from "../../utils";

const ActionButtonLink = ({ children, ...restProps }: any) => (
  <Link
    component="button"
    variant="body2"
    underline="none"
    color="error"
    classes={{
      button: classNames(styles.actionButton, restProps?.className),
    }}
    {...restProps}
  >
    {children}
  </Link>
);

export const Recording = () => {
  const [isStartedDeleting, setIsStartedDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const seconds = 65;

  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  if (isDeleted)
    return (
      <div className={styles.deleted}>
        <span className={styles.title}>Recording1</span>{" "}
        <span>has been deleted.</span>
      </div>
    );

  return (
    <div className={styles.recording}>
      <div className={styles.row}>
        <span className={styles.title}>Recording1</span>{" "}
        <span>{getFormattedTime(seconds)}</span>
      </div>
      <div className={styles.row}>
        <div className={styles.description}>Description of the recording</div>
        <div className={styles.actionButtons}>
          <ActionButtonLink
            onClick={handleCopyToClipboard}
            disabled={isCopied}
            className={classNames(isStartedDeleting && styles.actionLink)}
          >
            {isCopied ? "Copied!" : "Copy URL"}
          </ActionButtonLink>
          <ActionButtonLink>Edit</ActionButtonLink>
          <ActionButtonLink
            className={classNames(isStartedDeleting && styles.disabled)}
            onClick={() => {
              setIsStartedDeleting(true);
              setTimeout(() => {
                setIsDeleted(true);
              }, 500);
            }}
          >
            {isStartedDeleting ? "Deleting..." : "Delete"}
          </ActionButtonLink>
        </div>
      </div>
    </div>
  );
};
