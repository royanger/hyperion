'use client'

import { createPost } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function ClientC() {


  const { orgSlug } = useAuth()
  const router = useRouter()

  useEffect(() => {
    router.push(`/${orgSlug}/admin`)
  }, [orgSlug])
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