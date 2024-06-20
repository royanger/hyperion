export default function Page({
  params,
}: {
  params: { domain: string; slug: string };
}) {

  return (
    <div>
      <p>Domain: {params.domain} </p>
      <p>Slug: {params.slug}</p>
    </div>
  )
}