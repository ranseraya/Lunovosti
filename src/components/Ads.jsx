import React from 'react'
import CardItemAds from './NewCardAds'
import adsFamily from '@/assets/family.jpg'

const AdsList = [
    {
      title: "Pilihan Asuransi Terbaik",
      titleLast: "Untuk Pekerja Tetap",
      titleButton: "Get Started",
      image: adsFamily,
    },
  ];
const Ads = () => {
  return (
    <div className='flex flex-col items-center'>
      <CardItemAds title1="Pilihan Asuransi Terbaik" title2="Untuk Pekerja Tetap" titleButton="Get Started" image={AdsList[0].image}/>
    </div>
  )
}

export default Ads
