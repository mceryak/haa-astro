import { HOME_CARD_CLASS } from '@/ClientOnlyTailwindClasses'
import type { Home } from '@/content.config'
import { getR2Url } from '@/utils/config'

type Props = {
  home: Home
}

export default function HomeCard({ home }: Props) {
  return (
    <li key={home.modelNumber} className={HOME_CARD_CLASS}>
      <a
        href={`/home/${home.modelNumber}`}
      >
        <img src={getR2Url(home.thumbnailR2)} />
        <div className="p-3">
          <h3 className="font-bold text-2xl pb-2">{home.modelNumber}</h3>
          <div className="flex gap-2">
            <p className="border-r-1 pr-2">{home.beds} beds</p>
            <p className="border-r-1 pr-2">{home.baths} baths</p>
            <p>{home.sqft} sq. ft.</p>
          </div>
        </div>
      </a>
    </li>
  )
}
