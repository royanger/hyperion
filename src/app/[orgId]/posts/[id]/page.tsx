import { db } from "@/db";
import { postsTable, usersTable } from "@/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: { orgId: string; id: number };
}) {

  const [post] = await db.select()
    .from(postsTable)
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(postsTable.id, params.id))
  console.log("post", post)

  return (
    <div>
      <p>Domain: {params.orgId} </p>
      <p>Slug: {params.id}</p>
      <p>Title: {post.posts_table.title}</p>
      <p>Content: {post.posts_table.content}</p>
      <p>Author: {post.users_table?.firstName} {post.users_table?.lastName}</p>
    </div>
  )
}