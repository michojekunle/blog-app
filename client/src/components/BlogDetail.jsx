import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LikeButton from './LikeButton';


const BlogDetail = () => {
  const { authProfile, handleUpdateBlog, handleDeleteBlog } = useContext(AuthContext);
  const [currblog, setCurrblog] = useState({})
  const { blog_id } = useParams();
  const date_created = new Date(`${currblog?.created_on}`);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 

  useEffect(() => {
    console.log(blog_id);
    axios.get(`http://localhost:3000/blog/${blog_id}`)
    .then((res) => {
      setCurrblog(res.data.blog);
      console.log(currblog);
    })
    .catch((err) => {
      if (err?.code === "ERR_NETWORK") {
        alert(err?.message)
      }
      console.log(err);
      alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
    })
  },[blog_id])

  return (
    
    <div className='py-8 px-11 mb-24'>
      <div className='main-heading flex flex-row items-center justify-between mb-8 gap-8'>
        <div className="flex gap-6 items-center ">
          <p className='bg-[#638122] text-[#fff] text-4xl translate-y-[-6px] rounded-full mt-3 w-20 h-20 flex items-center justify-center'>{currblog?.fullname?.slice(0, 1)}</p>
          <div>
            <p className='capitalize text-xl text-gray-600'>{currblog?.fullname?.toLowerCase()}</p>  
            <p className='text-lg text-gray-400'>{currblog?.email}</p>  
          </div>
        </div>
        <div className='date-created'>
          {/* Edit Delete Feature if It's User's Blog */}
          {
            currblog?.email === authProfile?.email ? (
              <div className='flex flex-row items-center gap-8'>
                <button onClick={handleUpdateBlog} className='group cursor-pointer relative flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-8 text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Update</button>
                <button onClick={() => {handleDeleteBlog(currblog?.blog_id);} } className='group cursor-pointer relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Delete</button>
              </div>
            ) : (
              ''
            )
          }
          <div>
              <p className='text-xl text-gray-500 mt-1 text-right italic'> {days[date_created.getDay()]}, {date_created.getDate()}th  {months[date_created.getMonth()]} {date_created.getFullYear()}.</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-center text-3xl md:text-5xl font-mono underline font-bold'>{currblog.title}</h1>
        <img src={currblog?.img} alt="No Image" className='w-full rounded-md my-16 h-[280px] bg-[#ddd] object-cover'/>
        <p className='text-gray-700 mt-8 text-lg leading-8 font-semibold '>{currblog?.content}</p>
      </div>

      {/* Likes */}
      <div className='flex w-full items-center justify-center gap-3 mt-8'>
        <LikeButton/>
      </div>

  
    </div>
  )
}

export default BlogDetail