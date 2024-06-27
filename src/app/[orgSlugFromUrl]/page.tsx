import { db } from "@/db";
import { orgsTable, postsTable, usersTable } from "@/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { orgSlugFromUrl: string };
}) {
  // if the URL does not match the active Org, redirect the user
  const { orgSlug } = auth();

  if (orgSlug !== params.orgSlugFromUrl) {
    console.log(
      "The old org will be showing for the query as the URL is still the old one.",
    );
    return redirect(`/${orgSlug}`);
  }

  const posts = await db
    .select()
    .from(postsTable)
    .leftJoin(orgsTable, eq(postsTable.orgId, orgsTable.id))
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .where(eq(orgsTable.slug, params.orgSlugFromUrl));

  console.log("POSTS", params.orgSlugFromUrl, posts);

  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (
            <li>
              <Link
                href={`/${params.orgSlugFromUrl}/posts/${post.posts_table.id}`}
              >
                {post.posts_table.title} by {post.users_table?.firstName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
