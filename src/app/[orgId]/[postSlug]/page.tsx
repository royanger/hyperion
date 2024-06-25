import { db } from "@/db";
import { postsTable, usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: { domain: string; postSlug: string };
}) {

  const [post] = await db.select()
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(postsTable.slug, params.postSlug))
  console.log("post", post)

  return (
    <div>
      <p>Domain: {params.domain} </p>
      <p>Slug: {params.postSlug}</p>
      <p>Title: {post.posts_table.title}</p>
      <p>Content: {post.posts_table.content}</p>
      <p>Author: {post.users_table?.firstName} {post.users_table?.lastName}</p>
    </div>
  )
}