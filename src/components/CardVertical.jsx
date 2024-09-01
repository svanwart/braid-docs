import Image from 'next/image'

export default function Card() {
  return (
    <div className="overflow-hidden rounded rounded-xl border border-slate-200 shadow-lg">
      <Image
        className="m-0 w-full"
        src="https://v1.tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
        width={100}
        height={100}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold dark:text-white">
          The Coldest Sunset
        </div>
        <p className="text-base text-gray-700 dark:text-slate-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #photography
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div>
    </div>
  )
}
