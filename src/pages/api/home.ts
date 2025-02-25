import type { APIRoute } from "astro";

// the point of this is so that when user signs out, the React <form> can run middleware to reset the session locals
export const GET: APIRoute = async ({ redirect }) => {
  return redirect('/');
}