'use client'

import { createPost } from "@/actions"
import { db } from "@/db"
import { postsTable } from "@/schema"
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react"
import { useRouter } from 'next/navigation'


export default function Page() {
  const router = useRouter()
  const { orgSlug } = useAuth()


  // useEffect(() => {
  // console.log('orgSlug changed')
  //   router.push(`/${orgSlug}/admin`)
  // }, [orgSlug])

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