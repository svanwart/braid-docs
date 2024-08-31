'use client'

export default function Card({ title, children }) {
  function showTitleIfSet() {
    return title ? (
      <h3
        className="mt-4 font-display text-base text-slate-900 dark:text-white"
        id={title.toLowerCase().replaceAll(' ', '-')}
      >
        {title}
      </h3>
    ) : (
      ''
    )
  }
  function test() {
    alert('hi')
    console.log('hi')
  }
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        {showTitleIfSet()}
        {children}
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={test}
        >
          click me
        </button>
      </div>
    </div>
  )
}
