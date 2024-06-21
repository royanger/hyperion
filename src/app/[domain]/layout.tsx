
import { db } from "@/db";
import { orgsTable } from "@/schema";
import { log } from "console";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {

  console.log("domain", `"${params.domain}"`)

  const [org] = await db.select()
    .from(orgsTable)
    .where(eq(orgsTable.slug, params.domain))

  console.log("org", org)

  if (!org) {
    log('404')
    notFound()
  } else {
    return (
      <div>
        {children}
      </div>
    )
  }
}