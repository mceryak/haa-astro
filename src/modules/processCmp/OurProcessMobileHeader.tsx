import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { ProcessStep } from './OurProcess.astro'
import { useStore } from '@nanostores/react'
import { activeStep } from './store'

type Props = {
  steps: ProcessStep[]
}

export default function OurProcessMobileHeader({ steps }: Props) {
  const $activeStep = useStore(activeStep);
  const step = steps.find(step => step.order === $activeStep) ?? steps.at(0);

  const adjustStep = (increment: 1 | -1) => {
    const newVal = $activeStep + increment;
    activeStep.set(newVal < 1 ? steps.length : newVal === steps.length + 1 ? 1 : newVal);
  }

  return (
    <div className="w-full px-5 flex justify-between lg:hidden items-center">
      <button 
        className="text-3xl  cursor-pointer" 
        onClick={() => adjustStep(-1)}
      >
        <FaChevronLeft />
      </button>
        <h2 className="text-xl">{step?.order}. {step?.label}</h2>
      <button 
        className="text-3xl cursor-pointer" 
        onClick={() => adjustStep(1)}
      >
        <FaChevronRight />
      </button>
    </div>
  )
}
