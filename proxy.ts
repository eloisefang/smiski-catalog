/**
 * Next.js 16+ discovers this file at the project root as the request proxy (edge middleware).
 * It cannot live under `src/`; session logic stays in `src/lib/supabase/proxy.ts`.
 */
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
