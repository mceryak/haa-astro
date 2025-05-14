import { useEffect, useState } from "react";
import type { Testimonial } from "./types";
import { FaExternalLinkAlt, FaGoogle } from "react-icons/fa";

const snippets: Testimonial[] = [
  {
    name: "Fred M.",
    link: "https://maps.app.goo.gl/D3vHHsCHVGRzqXie9",
    description: "They are #1 in serving the people.",
  },
  {
    name: "Thomas S.",
    link: "https://maps.app.goo.gl/S7G8fRZsvU1Gjp3A8",
    description:
      "If your looking for a manufactured home these are the guys to go to",
  },
  {
    name: "Fred M.",
    link: "https://maps.app.goo.gl/D3vHHsCHVGRzqXie9",
    description:
      "These guys took us step by step because it was our first time buying a home. Very helpful and will keep you informed on everything. ",
  },
  {
    name: "Stephanie H.",
    link: "https://maps.app.goo.gl/auCbaiTzvqEB2Z8N8",
    description:
      "Great people to get a home from. They will try and help you anyway they can.",
  },

  {
    name: "Helen H.",
    link: "https://maps.app.goo.gl/WNvs18tyrDt5d9VX7",
    description: "They found us the home of our dreams",
  },
];

export default function TestimonialSnippets() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    console.log('in use effect');
    const id = setInterval(() => setIdx(pv => {
      const val = pv === snippets.length - 1 ? 0 : pv + 1;
      console.log('new idx', val);
      return val
  }), 5000);
    return () => clearInterval(id);
  })
  
  return <>
    <div className="w-full relative overflow-hidden py-2 lg:py-4 border-y-4 border-y-cyan-800">  
      <div className="absolute h-full top-0 left-0 w-full bg-slate-200 flex gap-2 px-3">
        <FaGoogle className="h-full w-10 text-gray-400/50"/>
        {/* <span className="h-full text-center flex items-center text-5xl">Reviews</span> */}
      </div>  
    {/* <h1 className="text-center">Google Reviews</h1> */}
      <ul 
        className="flex w-full transition-transform ease-in-out duration-500 h-full items-center"
        style={{ transform: `translateX(-${idx * 100 / snippets.length}%)`, width: `${snippets.length * 100}%`}}
      >
        {snippets.map((snippet, i) => (
          <li tabIndex={-1} key={i} className="h-full shrink-0 flex flex-col items-center justify-center px-15 text-center" style={{ width: `${100 / snippets.length}%` }}>
            <a 
              href={snippet.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex  gap-4 items-center"
              tabIndex={idx === i ? 0 : -1}
            >
              {/* <div className="flex flex-col gap-2 items-center"> */}
                <span className="italic">"{snippet.description}"</span>
                {/* <span className="italic">- {snippet.name}</span> */}
              {/* </div> */}

                <div className="flex gap-1 items-center mt-1">
              {/* <span className="text-zinc-500 text-sm"><FaGoogle /></span> */}
                <span className="text-zinc-500 text-sm"><FaExternalLinkAlt /></span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>;
}
