import Image from 'next/image';
import Link from 'next/link';

const CardItem = ({title, date, tag, img, url}) => {

  return (
    // <Link className=' cursor-pointer' to={`/`}>
    <div className='cursor-pointer border-2 bg-white border-gray-400 w-86 p-3 rounded-sm'>
        <div className='overflow-hidden rounded-md'>
            <div 
            className='bg-cover bg-center hover:scale-110 transition ease-in-out w-84 h-48 p-2'
            style={{ backgroundImage: `url(${img.src})` }}
            ><div className='w-28 text-center font-bold text-sm bg-gray-200 rounded-xl'>{tag}</div></div>
        </div>
        <p className='pt-3 pb-1 font-bold text-sm'>{title}</p>
        <p className='text-xs text-gray-500 font-medium'>{date}</p>
        </div>
    //    </Link>
  )
}

export default CardItem;