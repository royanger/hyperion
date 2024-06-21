import { revalidatePath } from "next/cache"
import { db } from '@/db';
import { postsTable } from '@/schema';
import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default function Page() {

  const { orgId, orgSlug } = auth()

  if (!orgId) {
    return (
      <div>
        <OrganizationList hidePersonal />
      </div>
    )
  } else {
    redirect(`/${orgSlug}/admin`)
  }
}