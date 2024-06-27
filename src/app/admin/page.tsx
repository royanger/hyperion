import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Page() {
  const { orgId, orgSlug } = auth();

  if (!orgId) {
    return (
      <div>
        <OrganizationList hidePersonal />
      </div>
    );
  } else {
    redirect(`/${orgId}/admin`);
  }
}
