import type { FormActionResult } from '@/modules/forms/types';
import { verify } from '@/modules/forms/utils/turnstileVerify';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const contactHtmlTemplate = (...args: { label: string, value?: string }[]): string => {
  return args.reduce((acc, arg) => acc + (arg.value?.length ? `<p><b>${arg.label}:</b> ${arg.value}</p>` : ''), '');
}

export const server = {
  sendEmail: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      name: z.string(),
      phone: z.string().regex(/^\(?\d{3}\)?\s?[-]?\d{3}\s?[-]?\d{4}$/, 'Invalid phone number.').optional(),
      homeType: z.string().optional(),
      beds: z.string().optional(),
      baths: z.string().optional(),
      message: z.string().max(1000,'1000 characters max.'),
      turnstileToken: z.string()
    }),
    handler: async ({ email, phone, name, homeType, beds, baths, message, turnstileToken }): Promise<FormActionResult> => {
      // return { success: true, errors: {} };
      // validate turnstile token
      const validated = await verify(turnstileToken);
      if (!validated) {
        throw new ActionError({ code: 'UNAUTHORIZED', message: 'Turnstile validation failed' });
      }
      
      // const { data, error } = await resend.emails.send({
      //   from: `${name} <example@test.michaelceryak.com>`,
      //   to: ['bigmike537@protonmail.com'],
      //   subject: 'Info Request',
      //   replyTo: email,
      //   html: contactHtmlTemplate(
      //     { label: 'Phone', value: phone },
      //     { label: 'Home Type', value: homeType },
      //     { label: 'Beds', value: beds },
      //     { label: 'Baths', value: baths },
      //     { label: 'Message', value: message }
      //   )
      // });

      // if (error) {
      //   throw new ActionError({
      //     code: 'BAD_REQUEST',
      //     message: error?.message,
      //   });
      // }

      return { success: true, fieldErrors: {} };
    }
  })
}