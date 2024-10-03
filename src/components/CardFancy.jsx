import Image from 'next/image'

export default function Card({ children, subtitle, title = 'Some Title' }) {
  return (
    <div className="my-6 w-full lg:flex lg:max-w-full">
      <div
        className={`flex h-48 flex-col justify-center rounded-r-none border border-slate-200 bg-slate-50 p-8 text-center lg:h-auto lg:w-56 lg:rounded-l-lg lg:rounded-r-none lg:border`}
      >
        <h3 className="my-0">{title}</h3>
      </div>
      <div className="flex w-full flex-col items-center justify-center rounded-b border-b border-l border-r border-slate-200 bg-white p-4 py-8 leading-normal lg:rounded-b-none lg:rounded-r-lg lg:border-l-0 lg:border-t lg:border-slate-200 dark:text-white">
        {children}
        {subtitle ? <p className="my-0 mt-2">{subtitle}</p> : ''}
      </div>
    </div>
  )
}
