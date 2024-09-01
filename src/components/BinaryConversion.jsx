'use client'
import React, { useState } from 'react'
import Card from './Card'

const variantStyles = {
  textbox:
    'block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  label: 'inline-block w-full py-2 text-center font-bold',
  formula: 'inline-block py-2 text-center font-bold width-full',
  button:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
  buttonActive:
    'rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  row: 'my-6',
}
export default function BinaryConversion({ num = 53 }) {
  const [currentNum, setCurrentNum] = useState(num)
  const [hint1, setHint1] = useState(false)
  const [hint2, setHint2] = useState(false)
  const [hint3, setHint3] = useState(false)
  const redix = 2
  const binaryNumber = currentNum.toString(redix).padStart(8, '0')
  const binaryNumberArr = binaryNumber.split('')

  function startOver() {
    setCurrentNum(25)
    setHint1(false)
    setHint2(false)
    setHint3(false)
    const elem = document.getElementById('bin-to-decimal-top')
    const y = elem.getBoundingClientRect().top + window.scrollY - 150
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  function showButtons() {
    return <div className={variantStyles.row + 'my-5 flex gap-2'}></div>
  }

  function showProblem() {
    const id = 'answer'
    return (
      <>
        <div id="bin-to-decimal-top" className={variantStyles.row}>
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
        {!hint1 ? (
          <div className={variantStyles.row + ' flex justify-center'}>
            <button
              className={variantStyles.button}
              onClick={() => {
                setHint1(!hint1)
              }}
            >
              {' '}
              Hint 1
            </button>
          </div>
        ) : (
          ''
        )}
      </>
    )
  }

  function showHint1() {
    return (
      <div className={variantStyles.row}>
        <Card
          extraClasses="bg-white"
          title="Hint #1: Label the base-2 digit placeholders"
        >
          <div className="columns-8">
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
                  <label for={id} className={variantStyles.label}>
                    2<sup>{7 - idx}</sup>
                  </label>
                </div>
              )
            })}
          </div>
        </Card>
        {!hint2 ? (
          <div className={variantStyles.row + ' flex justify-center'}>
            <button
              className={variantStyles.button}
              onClick={() => {
                setHint2(!hint2)
              }}
            >
              Hint 2
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  function showHint2() {
    return (
      <div className={variantStyles.row}>
        <Card
          extraClasses="bg-white"
          title="Hint #2: Add up the place values for each digit"
        >
          <div className="flex" style={{ 'justify-content': 'space-around' }}>
            <span className={variantStyles.formula}>Answer =</span>
            {binaryNumberArr.map((val, idx) => {
              return (
                <>
                  <span className={variantStyles.formula}>
                    {val}*2<sup>{7 - idx}</sup>
                  </span>
                  {idx < 7 ? (
                    <span className={variantStyles.formula}>+</span>
                  ) : (
                    ''
                  )}
                </>
              )
            })}
          </div>
        </Card>
        {!hint3 ? (
          <div className={variantStyles.row + ' flex justify-center'}>
            <button
              className={variantStyles.button}
              onClick={() => {
                setHint3(!hint3)
              }}
            >
              Show Hint 3
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
  function showHint3() {
    return (
      <div className={variantStyles.row}>
        <Card extraClasses="bg-white" title="Hint #3: Finish the calculation">
          <div className="flex" style={{ 'justify-content': 'space-around' }}>
            <span className={variantStyles.formula}>Answer</span>
            <span className={variantStyles.formula}>=</span>
            {binaryNumberArr.map((val, idx) => {
              return (
                <>
                  <span className={variantStyles.formula}>
                    {parseInt(val) * Math.pow(2, 7 - idx)}
                  </span>
                  {idx < 7 ? (
                    <span className={variantStyles.formula}>+</span>
                  ) : (
                    ''
                  )}
                </>
              )
            })}
            <span className={variantStyles.formula}>=</span>
            <span className={variantStyles.formula}>{currentNum}</span>
          </div>
        </Card>
        <div className={variantStyles.row + ' flex justify-center'}>
          <button className={variantStyles.button} onClick={startOver}>
            Try Again with Another Number
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-xl bg-sky-100 p-5">
      {showProblem()}
      {showButtons()}
      {hint1 ? showHint1() : ''}
      {hint2 ? showHint2() : ''}
      {hint3 ? showHint3() : ''}
    </div>
  )
}
