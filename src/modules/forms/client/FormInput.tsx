import FormSelect from "./FormSelect"
import type { FormItem } from "../types"

export default function FormInput({ item, defaultValue, error }: { item: FormItem, defaultValue: string | null | undefined, error: string}) {
  const { name, label, cols=1, options=[], required=false, type="text" } = item;

  const defaultCss = `p-2 rounded-lg bg-slate-100 border-red-500 ${error ? 'border-2' : ''}`;

  return <div className={`col-span-full ${cols === 1 ? 'md:col-span-1' : cols === 2 ? 'md:col-span-2' : 'md:col-span-3'}  flex flex-col gap-1`}>
    <label htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</label>
    {type === 'textarea' ? (
      <textarea name={name} id={name} className={defaultCss}  defaultValue={defaultValue ?? ''}></textarea>
    ) : type === 'select' ? (
      <FormSelect name={name} label={label} cols={cols} required={required} defaultCss={defaultCss} defaultValue={defaultValue ?? ''} error={error} options={options}/>
    ) : (
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ''} className={defaultCss}/>
    )}
    <p className="text-red-700 h-6" >{error?.startsWith('Expected') ? 'This field is required' : error}</p>
  </div>;
}
