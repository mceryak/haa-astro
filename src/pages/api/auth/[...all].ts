import { auth } from "@/lib/auth";
import type { APIRoute } from "astro";
 
export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
  console.log('--- begin api/auth')
	const res = auth.handler(ctx.request);
  console.log('--- end api/auth')
  return res;
};