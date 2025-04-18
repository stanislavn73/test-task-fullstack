import { Fragment } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "@tanstack/react-router";
import styles from "./recordings.module.css";
import { Recording } from "../recording/recording.tsx";

export const Recordings = () => {
  const router = useRouter();
  const recordings = [
    <Recording />,
    <Recording />,
    <Recording />,
    <Recording />,
    <Recording />,
    <Recording />,
  ];

  return (
    <div className={styles.recordingsSection}>
      <div className={styles.container}>
        <span className={styles.title}>My Recordings</span>
        <Button
          variant="contained"
          color="error"
          startIcon={<AddIcon />}
          classes={{ root: styles.buttonRoot }}
          onClick={() => {
            router.navigate({ to: "new-recording" });
          }}
        >
          New
        </Button>
      </div>
      {!recordings.length && (
        <div className={styles.noRecordings}>
          No recordings yet. Press “New” to create one.
        </div>
      )}
      {!!recordings.length &&
        recordings.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
    </div>
  );
};
