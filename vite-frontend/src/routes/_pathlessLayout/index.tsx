import { createFileRoute } from "@tanstack/react-router";
import { Recordings } from "../../components/recordings";

export const Route = createFileRoute("/_pathlessLayout/")({
  component: Recordings,
});
