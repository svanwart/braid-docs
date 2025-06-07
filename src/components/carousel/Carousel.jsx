'use client'
// https://www.embla-carousel.com/api/options/

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  PrevButton,
  NextButton,
  DotButton,
  useDotButton,
  usePrevNextButtons,
} from './CarouselButtons'
import CarouselSlide from './CarouselSlide'
import './Carousel.css'

function EmblaCarousel({
  children,
  loop = true,
  align = 'start',
  slideWidth = '100%',
  slidesToScroll = 1,
  slideHeight = '100%',
}) {
  const options = {
    loop,
    align,
    slidesToScroll,
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    const emblaElement = document.querySelector('.embla')
    if (emblaElement) {
      emblaElement.style.setProperty('--slide-size', slideWidth)
      emblaElement.style.setProperty('--slide-height', slideHeight)
    }
  }, [slideWidth, slideHeight])

  return (
    <section className="embla rounded-3xl border-2 border-gray-200 p-4 dark:border-slate-700">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.map(children, (child) => {
            console.log(child, child.type)
            // Check if the child is a CarouselSlide instance
            const isCarouselSlide =
              React.isValidElement(child) && child.type === CarouselSlide

            // If it's already a CarouselSlide, return it as is, otherwise wrap it
            return isCarouselSlide ? (
              child
            ) : (
              <CarouselSlide>{child}</CarouselSlide>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            index={index}
            onClick={() => onDotButtonClick(index)}
            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  )
}

export default EmblaCarousel
