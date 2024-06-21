import { revalidatePath } from "next/cache"
import { db } from '@/db';
import { postsTable } from '@/schema';
import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { redirect } from "next/navigation";


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

    revalidatePath("/post")
  }


  const { orgId, orgSlug } = auth()

  if (!orgId) {
    return (
      <div>
        <OrganizationList hidePersonal />
      </div>
    )
  } else {
    redirect(`/${orgSlug}/admin`)
  }
  // return (
  //   <div>
  //     <form action={createPost}>
  //       <input name="title" type="text" />
  //       <input name="content" type="text" />
  //       <button type="submit">Create</button>
  //     </form>
  //   </div>
  // )
}