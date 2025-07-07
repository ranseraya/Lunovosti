
const CardItemAuthor = ({name, totalNews, img, url}) => {

  return (
    // <Link className=' cursor-pointer' to={`/`}>
    <div className='cursor-pointer border-2 bg-white border-gray-200 w-34 p-3 rounded-md flex flex-col justify-center items-center'>
        <div className=''>
            <div 
            className='bg-cover bg-center hover:scale-110 rounded-full transition ease-in-out w-16 h-16'
            style={{ backgroundImage: `url(${img.src})` }}
            ></div>
        </div>
        <p className='pt-3 pb-1 font-bold text-xs'>{name}</p>
        <p className='text-xs text-gray-500 font-medium'>{totalNews} News</p>
        </div>
    //    </Link>
  )
}

export default CardItemAuthor;