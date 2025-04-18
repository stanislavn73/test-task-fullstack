import { useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CircleButton } from "../circle-button";

import { getFormattedTime } from "../../utils";
import { useRecordsStore } from "../../store.ts";

import styles from "./new-recording.module.css";

export const NewRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const intervalId = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const setCurrentAudioURL = useRecordsStore(
    ({ setCurrentAudioURL }) => setCurrentAudioURL,
  );
  const setCurrentAudioDuration = useRecordsStore(
    ({ setCurrentAudioDuration }) => setCurrentAudioDuration,
  );

  const router = useRouter();

  const requestStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setCurrentAudioURL(url);
      audioChunks.current = [];
      setIsRecording(false);
      stream.getTracks().forEach((track) => track.stop());
      router.navigate({ to: "/view-recording" });
    };

    mediaRecorderRef.current.start();
    handleStart();
  };

  const handleStart = () => {
    setIsRecording(true);
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000) as unknown as number;
    intervalId.current = id;
  };

  const handleStop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    mediaRecorderRef.current!.stop();
    setCurrentAudioDuration(time);
    setIsRecording(false);
  };

  const handleReset = () => {
    setTime(0);
    requestStart();
  };

  return (
    <div className={styles.newRecordingSection}>
      <span>{getFormattedTime(time)}</span>
      {!isRecording && (
        <CircleButton icon={<MicNoneOutlinedIcon />} onClick={requestStart} />
      )}
      {isRecording && (
        <div className={styles.buttonsContainer}>
          <CircleButton icon={<StopIcon />} onClick={handleStop} />
          <CircleButton icon={<RestartAltIcon />} onClick={handleReset} />
        </div>
      )}
    </div>
  );
};
