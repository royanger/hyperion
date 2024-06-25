import { db } from "@/db";
import { orgsTable, postsTable, usersTable } from "@/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { domain: string };
}) {

  const posts = await db.select()
    .from(postsTable)
    .leftJoin(orgsTable, eq(postsTable.orgId, orgsTable.id))
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(orgsTable.id, params.domain))

  return (
    <div>
      <ul>
        {posts.map(post => {
          return <li><Link href={`/${params.domain}/${post.posts_table.slug}`}>{post.posts_table.title} by {post.users_table?.firstName}</Link></li>
        })}
      </ul>
    </div>
  )
}