import Image from 'next/image'

export default function Card() {
  return (
    <div className="my-6 w-full max-w-sm lg:flex lg:max-w-full">
      <div
        className="h-48 flex-none overflow-hidden rounded-t-lg bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l-lg lg:rounded-r-none lg:rounded-t-lg"
        style={{
          backgroundImage:
            "url('https://v1.tailwindcss.com/img/card-left.jpg')",
        }}
        title="Woman holding a mug"
      ></div>
      <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-slate-200 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r-lg lg:border-l-0 lg:border-t lg:border-slate-200">
        <div className="mb-8">
          <p className="flex items-center text-sm text-gray-600">
            <svg
              className="mr-2 h-3 w-3 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="mb-2 text-xl font-bold text-gray-900">
            Can coffee make you a better developer?
          </div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </div>
  )
}
