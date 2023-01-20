import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import BlogCard from './BlogCard';

const Blogs = () => {
  const  { blogs, getBlogs } = useContext(AuthContext);
  useEffect(() => {
    getBlogs()
  },[])

  return (
    <div className='relative mt-8 flex flex-wrap gap-8 py-4 px-11 justify-center sm:justify-start mb-44'>
        {
          blogs?.map(blog => <BlogCard blog={blog}/>)
        }
    </div>
  )
}

export default Blogs