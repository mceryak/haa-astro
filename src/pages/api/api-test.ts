import type { APIContext } from "astro";

export const prerender = false;

export async function GET({ locals, params, request }: APIContext) {
  const { HAA_KV } = locals.runtime.env;
  const value = await HAA_KV.get('test');
  return new Response(
    JSON.stringify({
      name: 'Astro',
      url: 'https://astro.build/',
      value
    })
  )
}