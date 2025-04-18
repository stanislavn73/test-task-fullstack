import { produce } from "immer";
import { create } from "zustand";

type Recording = {
  id: number;
  name: string;
  duration: number;
  description: string;
};

export type RecordingStore = {
  recordings: Recording[];
  currentAudio: {
    url: string | null;
    duration: number;
    name: string;
    description: string;
  };
  setCurrentAudioURL: (newURL: string) => void;
  setCurrentAudioDuration: (duration: number) => void;
  setCurrentAudioName: (name: string) => void;
  setCurrentAudioDescription: (decription: string) => void;
  addRecording: (recording: Recording) => void;
};

export const useRecordsStore = create<RecordingStore>()((set) => ({
  recordings: [],
  currentAudio: {
    url: null,
    duration: 0,
    name: "",
    description: "",
  },
  setCurrentAudioURL: (newURL: string) =>
    set(
      produce((state: RecordingStore) => {
        state.currentAudio.url = newURL;
      }),
    ),
  setCurrentAudioDuration: (duration: number) =>
    set(
      produce((state: RecordingStore) => {
        state.currentAudio.duration = duration;
      }),
    ),
  setCurrentAudioName: (name: string) =>
    set(
      produce((state: RecordingStore) => {
        state.currentAudio.name = name;
      }),
    ),
  setCurrentAudioDescription: (description: string) =>
    set(
      produce((state: RecordingStore) => {
        state.currentAudio.description = description;
      }),
    ),
  addRecording: (recording) =>
    set((state) => ({ recordings: [...state.recordings, recording] })),
}));
