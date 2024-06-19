import { CreateOrganization, OrganizationList } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default function Page() {

  const { orgId } = auth()
  if (!orgId) {
    return (
      <div className="flex justify-center p-5">
        <OrganizationList />
      </div>
    )
  }

  // return <p>You belong to publication {orgId}</p>
}