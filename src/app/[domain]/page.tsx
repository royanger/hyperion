import { db } from "@/db";
import { orgsTable, postsTable, usersTable } from "@/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: { domain: string };
}) {

  const posts = await db.select()
    .from(postsTable)
    .leftJoin(orgsTable, eq(postsTable.orgId, orgsTable.id))
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(orgsTable.slug, params.domain))

  return (
    <div>
      <ul>
        {posts.map(post => {
          return <li>{post.posts_table.title} by {post.users_table?.firstName}</li>
        })}
      </ul>
    </div>
  )
}