import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assests/Logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [slide, setSlide] = useState(false);

  const onClickLogin = () => {
    setLogin(true);
    navigate('/login');
  };

  const onClickSignUp = () => {
    setLogin(false);
    navigate('/signup');
  };

  const onClickAbout = () => {
    setSlide(true);
    navigate('/about');
  };

  return (
    <div className='flex items-center justify-between p-5  text-black'>
      <div className='flex items-center'>
        <img src={logo} alt='Logo' className='h-12 mr-4' />
        <div className=' ml-44 gap-3  font-bold text-xl'>
        <Link to='/' className='mr-4'>
          Home
        </Link>
        <button onClick={onClickAbout} className=' mr-4 focus:outline-none'>
          About
        </button>
        <Link to='/contact' className=' mr-4'>
          Contact
        </Link>
        <Link to='/ad-space' className=' mr-4'>
         Addcart
        </Link>
        </div>
      </div>
      <div className='flex items-center '>
        <button onClick={onClickLogin} className='mr-4 text-white bg-black rounded-lg px-4 py-2'>
          Login
        </button>
        <button onClick={onClickSignUp} className='text-white bg-black rounded-lg px-4 py-2'>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
