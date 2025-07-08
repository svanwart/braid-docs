import Link from 'next/link'
import Image from 'next/image'

export default function LinkCard({ title, description, imgUrl, url, index }) {
  return (
    <section className="relative flex rounded-lg border border-slate-200 bg-white sm:flex-col sm:border-0 sm:bg-transparent dark:border-slate-600 dark:bg-transparent dark:sm:bg-transparent">
      <div className="flex-0 group h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg rounded-r-none border-slate-200 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 sm:h-auto sm:w-full sm:rounded-r-lg md:rounded-lg">
        <Image
          alt={title}
          src={imgUrl}
          className="pointer-events-none h-[100px] w-auto object-cover object-center group-hover:opacity-75 sm:h-[220px] sm:w-full md:h-[280px]"
        />
        <Link href={url} className="focus:outline-hidden absolute inset-0">
          <span className="sr-only">View details for {title}</span>
        </Link>
      </div>
      <div className="px-4 sm:pl-0">
        <p className="pointer-events-none mt-2 block text-sm font-medium text-gray-900 dark:text-white">
          {index ? `${index + 1}. ` : ''} {title}
        </p>
        <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </div>
    </section>
  )
}
