import React from 'react'

const plan = () => {
  return (
    <div className='flex rounded-lg p-6 m-4 mt-20 mb-20'>
       <div className=' bg-blue-50 flex-col m-5 p-5  shadow-2xl'>
        <h1 className="text-xl font-serif-display font-bold mb-2 ml-24 ">Browse and Book</h1>
        <p className="text-gray-700  ml-10  " >"Browse and book top-rated billboards, digital screens, and transit ads in real-time."</p>
        </div>
        <div className=' shadow-2xl bg-blue-50 m-5 p-5 '>
        <h1 className="text-xl font-bold mb-2 font-serif-display ml-16">Create and Manage</h1>
        <p className="text-gray-700 ml-10">"Create and manage impactful ad campaigns with our user-friendly platform."</p>
        </div>
        <div className=' shadow-2xl bg-blue-50  m-5 p-5'>
    <h1 className="text-xl font-serif-display font-bold mb-2 ml-16 ">Track and Optimize</h1>
        <p className="text-gray-700 ml-10 ">"Track performance metrics and optimize your outdoor advertising efforts seamlessly."</p>
        </div>
    </div>
  )
}

export default plan