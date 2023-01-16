import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Blogs from './Blogs';


const Home = () => {
  const { authProfile } = useContext(AuthContext);
  useEffect(() => {
    console.log(authProfile);
  }, [authProfile])
  return (
    <div className='relative h-full '>
      { authProfile?.id ? (
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <p className='text-3xl mt-[100px] text-center md:text-5xl' style={{fontFamily: "cursive"}}>Welcome to <span>Blog P</span></p>
          <p className='font-mono text-sm mt-3 '>Sign Up to get Started</p>
          <p className='font-serif mt-1 font-bold' style={{fontFamily: "cursive"}}>OR</p>
          <p className='font-mono text-sm mt-1 '>Sign In to get right back In.</p>
          <div className='m-11'>
            <Link to='/signin' className="rounded-full border border-transparent bg-yellow-600 py-2 px-8 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">Sign in</Link>
            <Link to='/signup' className="rounded-full ml-8 border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-yellow-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">Sign up</Link>
          </div>
        </div>
        ) : (
          <div className='relative top-[80px]'>
            <h1 className=' text-2xl text-gray-300'>Hello {authProfile.fullname} 👋</h1>
            <Blogs/>
          </div>
        )
      }
        
    </div>
  )
}

export default Home