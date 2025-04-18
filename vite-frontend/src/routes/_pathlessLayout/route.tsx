import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageWrapper } from "../../components/page-wrapper";

export const Route = createFileRoute("/_pathlessLayout")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
