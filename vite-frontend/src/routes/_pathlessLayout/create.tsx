import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_pathlessLayout/create"!</div>;
}
