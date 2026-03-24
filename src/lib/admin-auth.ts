import { cookies } from "next/headers";
import { createHmac } from "crypto";

function generateToken(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHmac("sha256", password).update("mainline_admin").digest("hex").slice(0, 32);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("mainline_admin")?.value;
  if (!token) return false;
  return token === generateToken();
}

export function getAdminToken(): string {
  return generateToken();
}
