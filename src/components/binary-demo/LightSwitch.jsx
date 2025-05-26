'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LightSwitch({
  value,
  idx = null,
  calculateFn = null,
  width = 55,
}) {
  const srcOn = 'switch-on.png'
  const srcOff = 'switch-off.png'
  const rootURL = '/images/switches/'
  const [label, setLabel] = useState(value === 0 ? 0 : 1)
  const [src, setSrc] = useState(rootURL + (value === 0 ? srcOff : srcOn))

  function toggle() {
    const newVal = label === 0 ? 1 : 0
    setLabel(newVal)
    setSrc(rootURL + (src.includes('on.png') ? srcOff : srcOn))
    if (calculateFn) {
      calculateFn(newVal, idx)
    }
  }
  return (
    <div className="flex flex-col items-center" onClick={toggle}>
      <Image
        width={width}
        height={width * 1.4}
        className={`m-0 w-[${width}px]`}
        src={src}
        alt={'Picture of a light switch that is set to "' + label + '"'}
      />
      <span className="m-0 w-full text-center text-xs font-bold">{label}</span>
    </div>
  )
}
