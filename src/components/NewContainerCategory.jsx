import React from 'react'
import CardItemLong from './NewCardItemLong'
import musikJazz from '@/assets/entertaiment.jpg'
const ContainerCategory = ({title1, title2, title3, date, img}) => {
  return (
    <div className='my-10 flex flex-col px-8'>
        <div className='w-full flex justify-between items-end my-5'>
            <div className='text-3xl font-bold'>{title1}<br />{title2}</div>
            <div className='font-bold text-xl cursor-pointer'>Explore All</div>
        </div>
      <div className='flex justify-between'>
        <div 
            className='relative w-[465px] h-[300px] bg-cover bg-center flex flex-col justify-end items-start p-6 text-white'
            style={{ backgroundImage: `url(${img.src})` }}
            >
            <div className='font-bold text-2xl text-white'>{title3}</div>
            <p className='text-gray-300 font-normal text-xs'>{date}</p>
        </div>
        <div className='flex flex-col overflow-auto no-scrollbar scroll-smooth w-[545px] h-[300px] gap-5'>
            <CardItemLong title="Musik Jazz Trend Tahun Ini" date="Feb 27, 2025" img={musikJazz} />
            <CardItemLong title="Musik Jazz Trend Tahun Ini" date="Feb 27, 2025" img={musikJazz} />
            <CardItemLong title="Musik Jazz Trend Tahun Ini" date="Feb 27, 2025" img={musikJazz} />
            {/* {title, date, img, url} */}
        </div>
      </div>
    </div>
  )
}

export default ContainerCategory
