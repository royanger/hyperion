
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {

  if (params.domain !== "bookercodes") {
    notFound()
  }

  return (
    <div>
      {children}
    </div>
  )
}