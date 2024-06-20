import { notFound } from "next/navigation";

export default function Page({
  params,
}: {
  params: { domain: string };
}) {

  return (
    <div>
      <p>Domain: {params.domain} </p>
    </div>
  )
}