import { auth } from "@clerk/nextjs/server"

export default async function Page() {

  const { userId, orgId, orgSlug, sessionClaims } = auth()
  const username = sessionClaims?.username

  return (
    <div>
      <p>User: {userId} ({username})</p>
      <p>Org: {orgId} ({orgSlug})</p>
    </div>
  )
}