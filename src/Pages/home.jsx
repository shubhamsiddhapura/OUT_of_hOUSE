import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import About from './About'
import Plan from './plan'
import Footer from '../Component/Comman/Footer'

const home = () => {
  return (
    <div class='bg flex-col'>
        <h1 className=' text-7xl mx-auto space-x-1 text-left mt-52 mr-28 ml-28 tracking-wider font-serif-display text-white font-bold'>
        "Maximize Your Reach: Book Premium Ad Spaces Instantly"</h1>
        <div className=' mt-5'>
        <Link to="/signup" className='ml-28 font-bold p-3 rounded-md text-2xl font-serif bg-white'>
        Get Started
        </Link>
        </div>
        <Plan/>
        <About/>
        <Footer />
    </div>
  )
}

export default home