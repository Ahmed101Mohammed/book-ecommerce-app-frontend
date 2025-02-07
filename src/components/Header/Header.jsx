import React from 'react';
import UserAvatar from '../UserAvatar.jsx';
import LoginButton from './LoginButton.jsx';
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-teal-600 text-white shadow-md z-30">
      <div className="container mx-auto flex items-center justify-between p-3">
        <nav className="flex space-x-4">
          <Link className='text-gray-200 hover:text-white' to="/">Home</Link>
          <Link className='text-gray-200 hover:text-white' to="/about">About</Link>
          <Link className='text-gray-200 hover:text-white'to="/contact">Contact</Link>
        </nav>
        <div className="flex items-center">
          <span className="text-xl font-bold">Book<span className="text-red-200">er</span></span>
        </div>
        <UserAvatar tailWidth='w-10' tailHeight='h-10'/>
        <LoginButton/>
      </div>
    </header>
  );
};

export default Header;

