'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "./db"
import { postsTable } from "./schema"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  const { userId, orgId } = auth()

  await db.insert(postsTable).values({
    title: title,
    slug: title.toLocaleLowerCase().replace(' ', '-'),
    content,
    orgId: orgId as string,
    userId: userId as string
  })
}