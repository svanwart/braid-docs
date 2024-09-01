'use client'
const variantStyles = {
  primary:
    'rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
}
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
        <button className={variantStyles.primary} onClick={test}>
          click me
        </button>
      </div>
    </div>
  )
}
