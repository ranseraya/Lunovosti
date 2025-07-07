import React from 'react'
import Hero from '@/components/Hero'
import LatestNews from '@/components/LatestNews'
import BestAuthor from '@/components/BestAuthor'
import Ads from '@/components/Ads'
import LatestNewsCategory from '@/components/LatestNewsCategory'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <LatestNews />
      <BestAuthor />
      <Ads />
      <LatestNewsCategory />
    </div>
  )
}