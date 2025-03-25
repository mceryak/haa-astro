import { actions } from "astro:actions";
import Form from '@/modules/forms/client/Form';
import type { FormActionResult, FormItem } from "@/modules/forms/types";
import { SessionContext, SessionContextProvider } from "@/modules/betterAuth/ContextProviders/SessionContextProvider";
import { useContext } from "react";
import QueryParamsForm from "@/modules/forms/client/QueryParamsForm";


const formItems: FormItem[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', required: true, type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'homeType', label: 'Home Type', type: 'select', options: ['Manufactured', 'Modular', 'Park Model'] },
  { name: 'beds', label: 'Beds', type: 'select', options: ['1', '2', '3', '4+'] },
  { name: 'baths', label: 'Baths', type: 'select', options: ['1', '2', '3', '4+'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, cols: 2 },
]

export default function SessionContactForm() {
  return <SessionContextProvider>
    <ContactForm />
  </SessionContextProvider>;
}

function ContactForm() {
  const { user } = useContext(SessionContext);

  const action = async (formData: FormData): Promise<FormActionResult> => {
    const { data, error } = await actions.sendEmail(formData);
    if (data) { 
      return data;
    }
    console.log(error.message);
    return { 
      success: false, 
      fieldErrors: error.issues?.reduce((acc, iss) => ({ ...acc, [iss.path.at(0)]: iss.message}),{}) ?? {}, 
      error: error.issues?.length ? 'Fix all errors and try again.' : 'Unknown error. Please try again later.' 
    };
  }
  return (
    <QueryParamsForm formItems={formItems} defaultValues={{ name: user?.name ?? '', email: user?.email ?? '' }} action={action} />
  );
}
