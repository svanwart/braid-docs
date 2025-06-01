'use client'

import React from 'react'

const CarouselSlide = ({ children, className = '' }) => {
  return <div className={`embla__slide ${className}`.trim()}>{children}</div>
}

export default CarouselSlide
