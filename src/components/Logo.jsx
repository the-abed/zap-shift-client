import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
         <div className='flex items-center '>
         <img src={logo} alt="" />
         <h1 className='text-3xl font-bold relative right-3 top-2 hover:text-primary'>ZapShift</h1>
         </div>
        </Link>
    );
};

export default Logo;