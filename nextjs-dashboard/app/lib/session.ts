// app/lib/session.ts
import { auth } from '@/auth'; // Assuming you’re using the new NextAuth `auth()` helper

export async function getCurrentUser() {
  const session = await auth();
  return session?.user; // user: { name, email, image, ... }
}
