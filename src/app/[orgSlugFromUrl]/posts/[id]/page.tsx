import { db } from "@/db";
import { postsTable, usersTable } from "@/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlugFromUrl: string; id: number };
}) {
  // if the URL does not match the active Org, redirect the user
  const { orgSlug } = auth();

  if (orgSlug !== params.orgSlugFromUrl) {
    console.log(
      "The old org will be showing for the query as the URL is still the old one.",
    );

    // WARNING: This is probably a bad idea. Also this the query for this page doesn't confirm
    // that the post is related to the currently active org.
    return redirect(`/${orgSlug}/posts/${params.id}`);
  }

  const [post] = await db
    .select()
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(postsTable.id, params.id));

  console.log("post", post);

  return (
    <div>
      <p>Domain: {params.orgSlugFromUrl}</p>
      <p>Slug: {params.id}</p>
      <p>Title: {post.posts_table.title}</p>
      <p>Content: {post.posts_table.content}</p>
      <p>
        Author: {post.users_table?.firstName} {post.users_table?.lastName}
      </p>
    </div>
  );
}
