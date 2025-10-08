'use client'
import { useState } from 'react'

export default function Module({
  title = 'Module',
  description = 'Module description',
  isOpen = false,
  imgSrc,
  detailModule,
}) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="m-auto w-full max-w-5xl">
      <h3 className="mb-4 mt-0 text-lg font-bold text-blue-950 dark:text-slate-100">
        {title}
      </h3>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title}
          className="mb-4 w-full max-w-xl dark:invert"
        />
      )}
      <p className="mb-4">{description}</p>
      {isOpen && detailModule && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mb-4 flex items-center justify-center rounded border border-black px-5 py-2 font-bold text-gray-900 dark:border-white dark:!text-white"
        >
          {showMore ? 'Less' : 'Learn More'}
        </button>
      )}
      {isOpen && showMore && detailModule}
    </div>
  )
}
