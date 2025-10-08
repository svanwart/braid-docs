export default function Module({
  title = 'Module',
  description = 'Module description',
  isOpen = false,
  imgSrc,
  children,
}) {
  return (
    <div className="w-full max-w-5xl">
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
      {isOpen && children}
    </div>
  )
}
