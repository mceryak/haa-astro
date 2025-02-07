import type { APIContext } from "astro";

export async function GET({ locals, params, request }: APIContext) {
  const { "haa-astro-HAA_KV": KV } = locals.runtime.env;
  const value = KV.get('test');
  return new Response(
    JSON.stringify({
      name: 'Astro',
      url: 'https://astro.build/',
      value
    })
  )
}