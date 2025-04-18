import { createFileRoute } from "@tanstack/react-router";
import { NewRecording } from "../../components/new-recording/";

export const Route = createFileRoute("/_pathlessLayout/new-recording")({
  component: NewRecording,
});
