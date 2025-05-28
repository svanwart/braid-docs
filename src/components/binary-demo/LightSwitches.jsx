'use client'
import React, { useState } from 'react'
import LightSwitch from './LightSwitch'

export default function LightSwitches({
  values = [],
  label = null,
  center = false,
  switchWidth = 55,
  active = true,
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

  function renderSwitches() {
    return (
      <>
        {switchVals.length > 0 ? (
          switchVals.map((val, idx) => (
            <LightSwitch
              key={`${key}_${idx}`}
              value={val}
              idx={idx}
              calculateFn={cf}
              width={switchWidth}
              active={active}
            />
          ))
        ) : (
          <div className="flex text-center text-xs leading-tight">
            No
            <br />
            Switches
          </div>
        )}
        {label ? (
          <div className="ml-3 text-center text-3xl font-bold">{label}</div>
        ) : (
          ''
        )}
      </>
    )
  }

  return (
    <>
      <div
        className={
          'flex items-center gap-0' + (center ? ' justify-center' : '')
        }
      >
        {renderSwitches()}
      </div>
      {label ? '' : <div className="text-center text-3xl font-bold">{sum}</div>}
    </>
  )
}
