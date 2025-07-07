import React from 'react'
import ContainerCategory from './NewContainerCategory'
import automotive from '@/assets/automotive.jpg'

const LatestNewsCategory = () => {
  return (
    <div className='flex flex-col gap-1'>
      <ContainerCategory title1="Latest For You" title2="In Entertaiment" title3="Sistem Pengemudian Otonom" date="Feb 27, 2025" img={automotive}/>
      <ContainerCategory title1="Latest For You" title2="In Entertaiment" title3="Sistem Pengemudian Otonom" date="Feb 27, 2025" img={automotive}/>
      <ContainerCategory title1="Latest For You" title2="In Entertaiment" title3="Sistem Pengemudian Otonom" date="Feb 27, 2025" img={automotive}/>
    </div>
  )
}

export default LatestNewsCategory
