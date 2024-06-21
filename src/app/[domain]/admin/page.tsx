// 'use client'

import { createPost } from "@/actions"
import { db } from "@/db"
import { orgsTable, postsTable } from "@/schema"
import { useAuth } from "@clerk/nextjs";
import { log } from "console";
import { eq } from "drizzle-orm";
// import { useEffect, useRef } from "react"
import { notFound, useRouter } from 'next/navigation'
import ClientC from "./client";


export default async function Page({
  params
}: {
  params: { domain: string };
}) {


  const [org] = await db.select()
    .from(orgsTable)
    .where(eq(orgsTable.slug, params.domain))

  console.log("org", org)

  if (!org) {
    log('404')
    notFound()
  }
  // const router = useRouter()
  // const { orgSlug } = useAuth()

  // const isInitialMount = useRef(true);
  // useEffect(() => {
  //   router.push(`/${orgSlug}/admin`)
  //   // if (isInitialMount.current) {
  //   //   isInitialMount.current = false;
  //   // } else {
  //   // }
  //   // router.push(`/${orgSlug}/admin`)
  // }, [orgSlug])

  return (
    <>
      <ClientC />
    </>
  )
}