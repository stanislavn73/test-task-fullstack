import { createFileRoute } from "@tanstack/react-router";
import { ViewRecording } from "../../components/view-recording";

export const Route = createFileRoute("/_pathlessLayout/view-recording")({
  component: ViewRecording,
});
