import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";


export const verify = async (token: string): Promise<boolean> => {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const outcome = (await fetch(url, {
		method: 'POST',
		body: `secret=${encodeURIComponent(import.meta.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}).then(res => res.json())) as TurnstileServerValidationResponse
  
  return outcome.success;
}