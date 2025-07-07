import Image from 'next/image';
import Link from 'next/link';

const CardItemLong = ({title, date, img, url}) => {

  return (
    // <Link className=' cursor-pointer' to={`/`}>
    <div className='flex cursor-pointer border-2 bg-white border-gray-200 w-full h-28 p-2.5 rounded-sm'>
        <div className='overflow-hidden rounded-md'>
            <div 
            className='bg-cover bg-center hover:scale-110 transition ease-in-out w-39 h-21.5 p-2 rounded-md'
            style={{ backgroundImage: `url(${img.src})` }}
            ></div>
        </div>
        <div className='flex flex-col items-start px-5 justify-center'>
            <p className='pt-3 font-bold text-lg'>{title}</p>
            <p className='text-xs text-gray-500 font-medium'>{date}</p>
        </div>
        </div>
    //    </Link>
  )
}

export default CardItemLong;