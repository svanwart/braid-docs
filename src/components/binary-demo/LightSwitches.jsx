'use client'
import React, { useState, useEffect } from 'react'
import LightSwitch from './LightSwitch'
export default function LightSwitches({ values = [] }) {
  const [switchVals, setSwitchVals] = useState(values.slice().reverse())
  const [sum, setSum] = useState(binaryToDecimal(values.slice().reverse()))
  const key = (Math.random() + 1).toString(36).substring(2)
  //   console.log(values)

  function binaryToDecimal(bits) {
    let sum = 0
    for (let i = 0; i < bits.length; i++) {
      sum += bits[i] * 2 ** (bits.length - 1 - i)
    }
    return sum
  }

  function cf(val, idx) {
    // idx = switchVals.length - 1 - idx
    switchVals[idx] = val
    let sum = binaryToDecimal(switchVals)
    setSwitchVals(switchVals)
    setSum(sum)
  }
  return (
    <>
      <div className="flex justify-center gap-0 md:gap-2">
        {switchVals.map((val, idx) => (
          <LightSwitch
            key={`${key}_${idx}`}
            value={val}
            idx={idx}
            calculateFn={cf}
          />
        ))}
      </div>
      <div className="text-center text-3xl font-bold">{sum}</div>
    </>
  )
}
