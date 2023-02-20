import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';

const Blogs = () => {
  const  { blogs, getBlogs } = useContext(AuthContext);
  useEffect(() => {
    getBlogs()
  },[])

  return (
    <div className='relative mt-8 flex flex-wrap gap-8 py-4 px-11 justify-center md:justify-start mb-44'>
        { blogs?.length > 0 ? (
          blogs?.map(blog => <BlogCard blog={blog}/>)
        ) : (
          <div>
            <h3 className='font-mono text-2xl md:text-3xl'>No Blogs Yet... <Link to='/create-new-blog' className='hover:text-blue-500 text-gray-500'>create one</Link></h3>
          </div>
        )
        }
    </div>
  )
}

export default Blogs