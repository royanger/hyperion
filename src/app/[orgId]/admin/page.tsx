'use client'

import { createPost } from "@/actions"
import { db } from "@/db"
import { postsTable } from "@/schema"
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react"
import { useParams, useRouter } from 'next/navigation'


export default function Page() {
  const router = useRouter()
  // const { setActive, isLoaded } = useOrganizationList()
  const { orgId } = useAuth()
  // const { orgId: urlOrgId } = useParams() as { orgId: string }

  useEffect(() => {
    router.push(`/${orgId}/admin`)
  }, [orgId])

  // useEffect(() => {
  //   if (!isLoaded) return
  //   if (orgId !== urlOrgId) {
  //     void setActive({ organization: urlOrgId })
  //   }
  // }, [urlOrgId, isLoaded])

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