

import { useState, useActionState } from "react";
import FormSubmit from "./FormSubmit";
import FormInput from "./FormInput";
import Turnstile from "./Turnstile";
import type { FormItem, FormState, FormActionResult } from "../types";


export type FormInput = {
  formItems: FormItem[], 
  defaultValues?: { [key: string]: string | null | undefined }, 
  action: (formData: FormData) => Promise<FormActionResult>
}

export default function Form({ formItems, defaultValues={}, action }: FormInput) {  
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (prevFormState, formData: FormData) => {
    // if validation fails at any point, return the currently entered values so user can try again
    const values = [...formData.keys()].reduce((acc, k) => ({ ...acc, [k]: formData.get(k) }), {}); // the [...keys] is for safari bug!

    // check required fields so we don't have to make unnecessary trip to server
    const emptyRequiredFields = formItems.filter(item => item.required && !formData.get(item.name)?.length);
    if (emptyRequiredFields.length) {
      return {
        error: 'Fix all errors and try again.',
        fieldErrors: emptyRequiredFields.reduce((acc, item) => ({ ...acc, [item.name]: 'This field is required.' }), {}),
        values
      };
    }

    formData.append('turnstileToken', token);
    const { success, fieldErrors, error } = await action(formData);

    setSuccess(success);
    if (success) {
      return { fieldErrors: {}, values: {} }; // empty the form on success
    }

    if (fieldErrors || error) {
      return { fieldErrors, values, error };
    }

    return defaultFormState;
  }

  const defaultFormState: FormState = { fieldErrors: {}, values: defaultValues };
  const [formState, formAction] = useActionState(handleSubmit, defaultFormState);
  
  return <div className="flex flex-col place-items-center p-5 gap-5">
    <form className="grid grid-cols-2 items-center gap-x-4 gap-y-2  w-[90vw] md:w-auto md:min-w-180 lg:min-w-200" action={formAction} >
      {formItems.map((item) => (
        <FormInput key={item.name} item={item} defaultValue={formState.values[item.name]} error={formState.fieldErrors[item.name] ?? ''} />
      ))}

      <div className="col-span-full flex flex-col md:flex-row gap-5 items-center">
        <Turnstile onSuccess={(token) => setToken(token)}  />
        <FormSubmit disabled={!token || success} />
      </div>
    </form>
    {success && <div className=" max-w-200 bg-green-200 border-2 border-green-700 rounded-md p-3 flex justify-center w-full text-center"><p>Thank you! We have received your request and will get back to you soon!</p></div>}
    {formState.error && <div className=" max-w-200 p-3 bg-red-200 border-2 border-red-700 rounded-md  flex justify-center w-full text-center"><p>{formState.error}</p></div>}
  </div>;
}
