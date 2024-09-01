'use client'

const variantStyles = {
  container:
    'group relative rounded-xl border border-slate-200 dark:border-slate-800',
}

export default function Card({ title, children, extraClasses = '' }) {
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

  return (
    <div className={variantStyles.container + ' ' + extraClasses}>
      <div className="relative overflow-hidden rounded-xl p-6">
        {showTitleIfSet()}
        {children}
      </div>
    </div>
  )
}
