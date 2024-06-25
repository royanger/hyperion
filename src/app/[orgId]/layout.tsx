
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
  params: { orgId: string };
  children: ReactNode;
}) {

  const [org] = await db.select()
    .from(orgsTable)
    .where(eq(orgsTable.id, params.orgId))

  if (!org)
    notFound()

  return (
    <div>
      {children}
    </div>
  )
}