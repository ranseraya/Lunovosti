import Image from 'next/image'
import React from 'react'
import mail from '@/assets/icons/mail.png'
import instagram from '@/assets/icons/instagram.png'

const Contact = () => {
  return (
    <div className='px-8 flex flex-col gap-1 my-10'>
      <div className='text-black font-bold text-3xl my-5'>Our Contact</div>
      <div className='flex flex-row gap-2'>
        <Image src={mail} alt="email" className='w-6'/>
        <p className='text-black font-bold text-md'>winnicodegarudaofficial@gmail.com</p>
        </div>
      <div className='flex flex-row gap-2'>
        <Image src={instagram} alt="email" className='w-6'/>
        <p className='text-black font-bold text-md'>@winnicodeofficial</p>
        </div>
      <div className='text-black font-bold text-md'>Alamat (Pusat) : Bandung - Jl.Asia Afrika No.158, Kb. Pusang, Kec.Sumur Bandung, Kota Bandung, Jawa Barat 40261</div>
      <div className='text-black font-bold text-md'>Alamat (Cabang) : Bantul, Yogyakarta</div>
    </div>
  )
}

export default Contact
