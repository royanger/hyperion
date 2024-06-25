import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from './db';
import { orgsTable } from './schema';
import { eq } from 'drizzle-orm';
import { log } from 'console';

const isProtectedRoute = createRouteMatcher([
  '/blog(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  // return NextResponse.next()

  const url = req.nextUrl
  const pathname = url.pathname
  const hostname = req.headers.get("host")

  console.log(pathname);
  console.log(hostname);

  let currentHost
  currentHost = hostname?.replace(`.localhost:3000`, "");

  console.log("currentHost", currentHost);

  if (!currentHost) {
    return NextResponse.next()
  }

  const [org] = await db.select()
    .from(orgsTable)
    .where(eq(orgsTable.slug, currentHost))

  // const orgId = org.id
  const u = new URL(`/org_2iCalMPDAde0W4Y0L9YdAZ9T6tv`, req.url)
  console.log("u", u.toString())

  return NextResponse.rewrite(u);


  return NextResponse.next()

})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}