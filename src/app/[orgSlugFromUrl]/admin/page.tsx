import { db } from "@/db";
import { orgsTable } from "@/schema";
import { notFound, redirect } from "next/navigation";
import { CreatePostForm } from "./_components";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export default async function Page({
  params,
}: {
  params: { orgSlugFromUrl: string };
}) {
  // if the URL does not match the active Org, redirect the user
  const { orgId, orgSlug } = auth();

  if (orgSlug !== params.orgSlugFromUrl) {
    console.log(
      "The old org will be showing for the query as the URL is still the old one.",
    );
    return redirect(`/${orgSlug}/admin`);
  }

  const [org] = await db
    .select()
    .from(orgsTable)
    .where(eq(orgsTable.slug, params.orgSlugFromUrl));

  console.log("ORG", org);

  if (!org) notFound();

  return (
    <div>
      <CreatePostForm />
    </div>
  );
}
