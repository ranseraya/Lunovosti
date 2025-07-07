import React from 'react'
import SelenaRodiguezImg from '@/assets/profileWomen.png'
import CardItemAuthor from './NewCardAuthor';
const bestAuthors = [
    {
      name: "Selena Rodigues",
      totalNews: "3",
      image: SelenaRodiguezImg,
    },
  ];
const BestAuthor = () => {
  return (
    <div className='mt-20 flex flex-col items-center'>
      <div className='w-full h-36 flex flex-col justify-between items-center'>
          <button className="bg-[#f8a778] font-bold text-orange-800 text-xl h-10 w-34 rounded-full shadow-md hover:brightness-110 transition">
          Best Author
        </button>
        <div className='text-3xl font-bold text-center'>Explore All Masterpieces<br />Written by People</div>
      </div>
      <div className='my-10 grid grid-cols-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 gap-y-6'>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        <CardItemAuthor name="Selena Rodiguez" totalNews="3" img={SelenaRodiguezImg} url="/"/>
        {/* const CardItemAuthor = ({name, totalNews, img, url}) => { */}
        {/* {
            newsItems.map((item, index) => (
                <CardItem key={index} title={item.title} date={item.date} tag={item.tag} img={item.image} url={item.url}/>
            ))
        } */}
      </div>
    </div>
  )
}

export default BestAuthor
