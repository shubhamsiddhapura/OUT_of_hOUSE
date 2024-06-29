import React from 'react'
import { useSelector } from 'react-redux'

import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({title, description1, description2, formType }) => {
  const {loading} = useSelector((state) => state.auth)
  return (
    <div className=''>
        {loading ? (<div className='spinner'></div>) : (
        <div className=' bg-blue-200 h-[100vh] pt-20' >
        <div className='mx-auto w-11/12 max-w-[440px]'>
        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">{description1}</span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-700">{description2}</span>
          </p>
          {formType === "signup" ? <SignupForm/> : <LoginForm/>}
        </div>
      
        </div>
        )}
    </div>
  )
}

export default Template