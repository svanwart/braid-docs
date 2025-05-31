'use client'

import Carousel from '@/components/carousel/Carousel'

const MyPage = () => {
  const slideClass =
    'flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 text-3xl font-bold'
  const opts = { loop: true, align: 'start', slidesToScroll: 2 }

  return (
    <div className="mx-auto mt-10 h-[400px] w-[800px]">
      <Carousel options={opts}>
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
