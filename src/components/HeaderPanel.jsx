import React from 'react'
export default function HeaderPanel({ title, children, chapter = 1 }) {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 px-6 py-20 lg:px-8 dark:bg-slate-900 dark:bg-none">
      <div className="m-auto max-w-5xl px-6 py-12 lg:px-8">
        <p className="mb-4 text-center font-display text-xl font-bold text-sky-600">
          Chapter {chapter}
        </p>
        <h2 className="mt-2 text-center text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-8 text-pretty text-center text-lg text-gray-800 sm:text-xl/8 dark:text-gray-300">
          {children}
        </p>
      </div>
    </div>
  )
}
