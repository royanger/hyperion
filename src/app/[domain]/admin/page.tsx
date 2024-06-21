import { db } from "@/db"
import { postsTable } from "@/schema"
import { auth } from "@clerk/nextjs/server"

export default function Page() {
  async function createPost(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    const { userId, orgId } = auth()

    await db.insert(postsTable).values({
      title,
      content,
      orgId: orgId as string,
      userId: userId as string
    })
  }
  return (
    <div>
      <form action={createPost}>
        <input name="title" type="text" />
        <input name="content" type="text" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}