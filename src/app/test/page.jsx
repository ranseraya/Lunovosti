import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
        <Image
        width={200}
        height={150}
        src={'https://media.cnn.com/api/v1/images/stellar/prod/ap25186599045085.jpg?c=16x9&q=w_800,c_fill'}
        />
    </div>
  )
}

export default page