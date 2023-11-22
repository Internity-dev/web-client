import React from 'react'

const LoginBanner = ({header, text}) => {
  return (
    <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center'>
        <img src='images/logo-internity.png' alt='' width='200' />
        <h1 className='text-main text-3xl mb-3 font-bold'>{header}</h1>
        <p className='text-main text-2xl'>{text}</p>
    </div>
  )
}

export default LoginBanner