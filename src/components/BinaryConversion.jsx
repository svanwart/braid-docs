'use client'
import React, { useState } from 'react'

const variantStyles = {
  textbox:
    'block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  label: 'inline-block w-full py-2 text-center font-bold',
  formula: 'inline-block py-2 text-center font-bold width-full',
  button:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
  row: 'my-6',
}
export default function BinaryConversion({ num = 53 }) {
  const [hint1, setHint1] = useState(false)
  const [hint2, setHint2] = useState(false)
  const [hint3, setHint3] = useState(false)
  const redix = 2
  const binaryNumber = num.toString(redix).padStart(8, '0')
  const binaryNumberArr = binaryNumber.split('')

  function showButtons() {
    return (
      <div className={variantStyles.row + 'my-5 flex gap-2'}>
        <button
          className={variantStyles.button}
          onClick={() => {
            setHint1(!hint1)
          }}
        >
          {!hint1 ? 'Show' : 'Hide'} Hint 1
        </button>
        <button
          className={variantStyles.button}
          onClick={() => {
            setHint2(!hint2)
          }}
        >
          {!hint2 ? 'Show' : 'Hide'} Hint 2
        </button>
        <button
          className={variantStyles.button}
          onClick={() => {
            setHint3(!hint3)
          }}
        >
          {!hint3 ? 'Show' : 'Hide'} Hint 3
        </button>
      </div>
    )
  }

  function showProblem() {
    const id = 'answer'
    return (
      <div className={variantStyles.row}>
        <p>
          What is the decimal representation of the following binary number:{' '}
          {binaryNumber}
        </p>
        <input
          id={id}
          name={id}
          type="text"
          autoComplete={id}
          className={variantStyles.textbox}
        />
      </div>
    )
  }

  function showHint1() {
    return (
      <div className={variantStyles.row + ' columns-8'}>
        {binaryNumberArr.map((val, idx) => {
          const id = `digit-${idx + 1}`
          return (
            <div key={id}>
              <input
                id={id}
                name={id}
                type="text"
                autoComplete={id}
                className={variantStyles.textbox}
                defaultValue={val}
              />
              {hint1 ? (
                <label for={id} className={variantStyles.label}>
                  2<sup>{7 - idx}</sup>
                </label>
              ) : (
                ''
              )}
            </div>
          )
        })}
      </div>
    )
  }

  function showHint2() {
    return hint2 ? (
      <div
        className={variantStyles.row + ' flex'}
        style={{ 'justify-content': 'space-around' }}
      >
        {binaryNumberArr.map((val, idx) => {
          const labelId = `math-${idx + 1}`
          return (
            <>
              <span className={variantStyles.formula}>
                {val}*2<sup>{7 - idx}</sup>
              </span>
              {idx < 7 ? <span className={variantStyles.formula}>+</span> : ''}
            </>
          )
        })}
      </div>
    ) : (
      ''
    )
  }
  function showHint3() {
    return hint3 ? (
      <div
        className={variantStyles.row + ' flex'}
        style={{ 'justify-content': 'space-around' }}
      >
        {binaryNumberArr.map((val, idx) => {
          return (
            <>
              <span className={variantStyles.formula}>
                {parseInt(val) * Math.pow(2, 7 - idx)}
              </span>
              {idx < 7 ? <span className={variantStyles.formula}>+</span> : ''}
            </>
          )
        })}
      </div>
    ) : (
      ''
    )
  }
  return (
    <>
      {showButtons()}
      {showProblem()}
      {showHint1()}
      {showHint2()}
      {showHint3()}
    </>
  )
}
