'use client'
import React, { useState } from 'react'
import LightSwitch from './LightSwitch'

export default function LightSwitches({
  values = [],
  label = null,
  center = false,
}) {
  const [switchVals, setSwitchVals] = useState(values.slice().reverse())
  const [sum, setSum] = useState(binaryToDecimal(values.slice().reverse()))
  const key = (Math.random() + 1).toString(36).substring(2)

  function binaryToDecimal(bits) {
    let sum = 0
    for (let i = 0; i < bits.length; i++) {
      sum += bits[i] * 2 ** (bits.length - 1 - i)
    }
    return sum
  }

  function cf(val, idx) {
    switchVals[idx] = val
    let sum = binaryToDecimal(switchVals)
    setSwitchVals(switchVals)
    setSum(sum)
  }

  return (
    <>
      <div
        className={
          'flex items-center gap-0 md:gap-2' + (center ? ' justify-center' : '')
        }
      >
        {switchVals.map((val, idx) => (
          <LightSwitch
            key={`${key}_${idx}`}
            value={val}
            idx={idx}
            calculateFn={cf}
          />
        ))}
        {label ? (
          <div className="text-center text-3xl font-bold">{label}</div>
        ) : (
          ''
        )}
      </div>
      {label ? '' : <div className="text-center text-3xl font-bold">{sum}</div>}
    </>
  )
}
