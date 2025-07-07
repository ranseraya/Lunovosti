import CardItem from '@/components/NewCardItem';
import React from 'react'
import automotiveNew from '@/assets/automotive.jpg'
import Ads from '@/components/Ads';

const CategoryNews = [
    {
        title: "Sistem Pengemudian Otonom",
        date: "Feb 27, 2025",
        tag: "Automotive",
        image: automotiveNew,
    },
]

export default async function CategoryPage({params}){
    const { category } = await params;
  return (
    <div className='my-15'>
        <div className='flex flex-row items-center justify-center'>
            <div className='font-bold text-5xl text-black text-center'>Explore Our<br/>{category} News</div>
        </div>
        <div className='grid grid-cols-3 gap-5 my-15'>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
            <CardItem title="Sistem Pengemudian Otonom" date="Feb 27, 2025" tag="Automotive" img={automotiveNew} url="#"/>
        </div>
        <Ads />
    </div>
  )
}