'use client'

import Carousel from '@/components/carousel/Carousel'

const MyPage = ({
  loop = true,
  align = 'start',
  slideWidth = '100%',
  slidesToScroll = 1,
}) => {
  const slideClass =
    'flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 text-3xl font-bold'

  return (
    <div className="mx-auto mt-10 h-[400px] w-[800px]">
      <Carousel
        loop={loop}
        align={align}
        slideWidth={slideWidth}
        slidesToScroll={slidesToScroll}
      >
        <div className={slideClass}>1</div>
        <div className={slideClass}>2</div>
        <div className={slideClass}>3</div>
        <div className={slideClass}>4</div>
        <div className={slideClass}>5</div>
        <div className={slideClass}>6</div>
      </Carousel>
    </div>
  )
}

export default MyPage
