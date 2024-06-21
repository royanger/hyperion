
import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Choose org</h1>
      <OrganizationList />
    </>
  );
}
