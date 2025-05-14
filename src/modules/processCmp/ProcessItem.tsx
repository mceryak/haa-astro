import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import type { ProcessStep } from "./OurProcess.astro"
import { useState } from "react";

type Props = {
  steps: ProcessStep[]
}
export default function ProcessItem({ steps }: Props) {
  const [idx, setIdx] = useState(0);

  const step = steps[idx];
  return (
    <div>
      <div className="w-screen">
             <button className="text-slate-500"><FaChevronLeft /></button>
           <div className="flex flex-col gap-3">
             <h1>{step.order}. {step.label}</h1>
             <p>{step.description}</p>
           </div>
           <button className="text-slate-500"><FaChevronRight /></button>    
      </div>
    </div>
    // <div className="relative overflow-hidden  w-screen">
    // <div className="flex w-screen  overflow-hidden transition-transform ease-in-out duration-500" style={{ transform: `translateX(0vw)`}}>
    //   {steps.map(step => (
    //     <div className="w-[100vw] flex gap-1">
    //       <button className="text-slate-500"><FaChevronLeft /></button>
    //       <div className="flex flex-col gap-3">
    //         <h1>{step.order}. {step.label}</h1>
    //         <p>{step.description}</p>
    //       </div>
    //       <button className="text-slate-500"><FaChevronRight /></button>
    //     </div>
    //   ))}
    // </div>
    // </div>
  )
}
