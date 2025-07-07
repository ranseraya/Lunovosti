import Image from "next/image"
import adsIcon from '@/assets/icons/ads.png'

const CardItemAds = ({title1, title2, titleButton, image}) => {
    return (
        <div className="w-10/12 bg-white flex flex-col p-2.5 rounded-md">
            <div 
            className='flex justify-between items-center bg-cover bg-center w-full h-28 px-6 rounded-md '
            style={{ backgroundImage: `url(${image.src})` }}
            > 
                <div className='text-xl font-bold text-white'>{title1}<br />{title2}</div>
                <button className="bg-orange-700 font-bold text-white text-xl h-10 w-32 rounded-full shadow-md hover:brightness-110 transition">
                    {titleButton}
                    </button>
            </div>
            <div className="flex gap-3 items-center">
                <p className="text-gray-500 font-bold text-xs">
                    Our Advertisement 
                </p>
                <Image src={adsIcon} alt="adsIcon" className='w-8'/>
            </div>
        </div>
    )
}

export default CardItemAds