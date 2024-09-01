import Image from 'next/image'

export default function Card({
  img = 'https://picsum.photos/300/300.jpg?a=2',
  imgPosition = 'cover',
  title = 'Some Title',
  backgroundColor = "transparent",
  text = 'text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
}) {
  return (
    <div className="my-6 w-full lg:flex lg:max-w-full">
      <div
        className={`h-48 flex-none overflow-hidden bg-no-repeat bg-center rounded-r-none ${imgPosition === 'cover' ? 'bg-cover' : 'bg-contain'} text-center lg:h-auto lg:w-48 lg:rounded-l-lg lg:rounded-r-none`}
        style={{
          backgroundImage: `url('${img}')`,
          backgroundColor: backgroundColor
        }}
        title="Woman holding a mug"
      ></div>
      <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-slate-200 p-4 leading-normal lg:rounded-b-none lg:rounded-r-lg lg:border-l-0 lg:border-t lg:border-slate-200 dark:text-white">
        <div className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="text-base text-gray-700 dark:text-slate-300">{text}</p>
      </div>
    </div>
  )
}
