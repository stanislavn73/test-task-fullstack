import { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import { CircleButton } from "../circle-button";
import { getFormattedTime } from "../../utils";

import { useRecordsStore } from "../../store.ts";

import styles from "./view-recording.module.css";

export const ViewRecording = () => {
  const currentAudio = useRecordsStore(({ currentAudio }) => currentAudio);
  const setCurrentAudioName = useRecordsStore(
    ({ setCurrentAudioName }) => setCurrentAudioName,
  );
  const setCurrentAudioDescription = useRecordsStore(
    ({ setCurrentAudioDescription }) => setCurrentAudioDescription,
  );
  const [value, setValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(currentAudio?.duration || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const audioRef = useRef(new Audio(currentAudio?.url || ""));

  console.log("render", currentAudio, duration);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.addEventListener("timeupdate", () => {
      if (!audioRef.current || audioRef.current.duration === Infinity) return;
      setDuration(Math.floor(audioRef.current.duration));
    });
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsMounted(false);
    });
    audioRef.current.addEventListener("timeupdate", () => {
      setValue(Math.floor(audioRef.current.currentTime));
    });
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
    });
  }, []);

  const handleRewind = (newValue: number) => {
    setValue(newValue);
    audioRef.current!.currentTime = newValue;
  };

  const handlePlayPause = async () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioRef.current!.pause();
      return;
    }

    await audioRef.current!.play();
  };

  const handleRewind10 = () => {
    const rewindedTime = audioRef.current!.currentTime - 10;
    handleRewind(rewindedTime >= 0 ? rewindedTime : 0);
  };

  const handleFastForward10 = () => {
    const forwardedTime = audioRef.current!.currentTime + 10;
    handleRewind(forwardedTime <= duration ? forwardedTime : duration);
  };

  return (
    <div className={styles.viewRecordingContainer}>
      <h2 className={styles.title}>View Recording</h2>
      <div className={styles.sliderWrapper}>
        <div className={styles.timeLabels}>
          <span>{getFormattedTime(value)}</span>
          <span>{duration ? getFormattedTime(duration) : ":--:--:--"}</span>
        </div>
        <Slider
          value={value}
          onChange={(event: Event, newValue: number | number[]) =>
            handleRewind(newValue as number)
          }
          valueLabelDisplay="auto"
          color="error"
          classes={{
            rail: styles.sliderRail,
            track: styles.sliderTrack,
            thumb: styles.thumb,
          }}
          min={0}
          max={duration}
          disabled={isMounted}
        />
      </div>
      <div>
        <CircleButton
          onClick={handleRewind10}
          icon={<Replay10Icon />}
          isLoading={isMounted}
          size="small"
        />{" "}
        <CircleButton
          onClick={handlePlayPause}
          icon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          isLoading={isMounted}
        />{" "}
        <CircleButton
          onClick={handleFastForward10}
          icon={<Forward10Icon />}
          isLoading={isMounted}
          size="small"
        />
      </div>
    </div>
  );
};
