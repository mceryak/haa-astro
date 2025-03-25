import { Turnstile } from '@marsidev/react-turnstile';

export default function TurnstileCmp({ onSuccess }: { onSuccess: (token: string) => void }) {
  return (
    <Turnstile
      siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
      options={{ theme: 'light' }}
      onSuccess={(token) => { onSuccess(token) }}
    />
  )
}
