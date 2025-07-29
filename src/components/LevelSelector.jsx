'use client'

import { useEffect } from 'react'
import clsx from 'clsx'

const levels = [
  {
    id: 1,
    name: 'Overview',
  },
  {
    id: 2,
    name: 'Technical Explainer',
  },
  {
    id: 3,
    name: 'Applications & Use Cases',
  },
]

// function LevelSelector({ onLevelChange, initialLevel = 1, onClose }) {
//   // Update localStorage when initialLevel changes
//   useEffect(() => {
//     localStorage.setItem('userLevel', initialLevel.toString())
//   }, [initialLevel])

//   const handleLevelChange = (levelId) => {
//     onLevelChange(levelId)
//     if (onClose) {
//       onClose()
//     }
//   }

//   return (
//     <div className="mx-auto w-full max-w-2xl p-4">
//       <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
//         Select Your Expertise Level
//       </h2>
//       <div className="grid gap-4">
//         {levels.map((level) => (
//           <button
//             key={level.id}
//             onClick={() => handleLevelChange(level.id)}
//             className={clsx(
//               'w-full rounded-lg border-2 p-4 text-left transition-all duration-200',
//               'hover:border-sky-500 hover:shadow-md',
//               initialLevel === level.id
//                 ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
//                 : 'border-slate-200 dark:border-slate-700',
//             )}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-medium text-slate-900 dark:text-white">
//                   {level.name}
//                 </h3>
//                 <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                   {level.description}
//                 </p>
//               </div>
//               <div
//                 className={clsx(
//                   'w-4 items-center justify-center rounded-full border-2',
//                   initialLevel === level.id
//                     ? 'border-sky-500 bg-sky-500'
//                     : 'border-slate-300 dark:border-slate-600',
//                 )}
//               >
//                 {initialLevel === level.id ? (
//                   <div className="h-3 w-3 rounded-full bg-white" />
//                 ) : (
//                   <div className="h-3 w-3 rounded-full" />
//                 )}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

export { levels } //, LevelSelector }
