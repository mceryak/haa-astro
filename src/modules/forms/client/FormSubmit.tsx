import { useFormStatus } from 'react-dom';

export default function FormSubmit({ disabled=false }) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending || disabled}
      className={`w-full h-12 p-3 ${disabled || pending ? 'bg-slate-400' : 'bg-sky-800 hover:bg-sky-700 cursor-pointer'} text-zinc-100 rounded-sm uppercase  transition-colors`}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
