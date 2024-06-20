import { revalidatePath } from "next/cache"
import { db } from '@/db';
import { postsTable } from '@/schema';
import { auth } from "@clerk/nextjs/server";


export default function Page() {
  async function createPost(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    const { userId } = auth()

    await db.insert(postsTable).values({
      title,
      content,
      userId: userId as string
    })

    revalidatePath("/post")
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