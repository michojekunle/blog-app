import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const [signedIn, setSignedIn ] = useState(false)
  return (
    <div className='relative top-[90px] h-full'>
      { !signedIn ? (
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <p className='text-5xl mt-[150px]' style={{fontFamily: "cursive"}}>Welcome to <span>Blog P</span></p>
          <p className='font-mono text-sm mt-3 '>Sign Up to get Started</p>
          <p className='font-serif mt-1 font-bold' style={{fontFamily: "cursive"}}>OR</p>
          <p className='font-mono text-sm mt-1 '>Sign In to get right back In.</p>
          <div className='mt-11'>
            <Link to='/signin' className="rounded-full border border-transparent bg-yellow-600 py-2 px-8 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">Sign in</Link>
            <Link to='/signup' className="rounded-full ml-8 border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-yellow-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">Sign up</Link>
          </div>
        </div>
        ) : (
          <div className='main-app'>
            
          </div>
        )
      }
        
    </div>
  )
}

export default Home