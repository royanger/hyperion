import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db';
import { orgsTable, usersTable } from '@/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }


  const { type, data } = evt
  try {
    switch (type) {
      case "organization.created":
        await db.insert(orgsTable)
          .values({
            id: data.id,
            slug: data.slug
          })
        break
      case "organization.updated":
        await db.update(orgsTable)
          .set({ slug: data.slug })
          .where(eq(orgsTable.id, data.id as string));
        break
      case "organization.deleted":
        await db.delete(orgsTable)
          .where(eq(orgsTable.id, data.id as string))
        break
      case "user.created":
        await db.insert(usersTable)
          .values({
            id: data.id,
            firstName: data.first_name as string,
            lastName: data.last_name as string,
            imgUrl: data.image_url
          })
        break
      case "user.updated":
        await db.update(usersTable)
          .set({
            firstName: data.first_name as string,
            lastName: data.last_name as string,
            imgUrl: data.image_url
          })
          .where(eq(usersTable.id, data.id as string));
        break
      case "user.deleted":
        await db.delete(usersTable)
          .where(eq(usersTable.id, data.id as string))
        break
      default:
        return new Response('', { status: 501 })
    }
    return new Response('', { status: 200 })
  } catch (e) {
    return new Response('', { status: 500 })
  }

}