import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {
  const { blog_id, title, content, email, img, fullname } = blog;
  console.log(img)
  let img_link = String(img)
  console.log(img_link)
  let summary = content.split('');
  return (
    <div className='relative py-3 px-6 pb-16 rounded-xl bg-blue-200 min-w-[200px] max-w-[320px]'>
        <div className="header flex gap-3 items-center ">
          <p className='bg-blue-100 text-blue-800 translate-y-[-6px] rounded-full mt-3 w-10 h-10 flex items-center justify-center'>{fullname?.slice(0, 1)}</p>
          <div>
            <p className='capitalize text-sm text-gray-600'>{fullname?.toLowerCase()}</p>  
            <p className='text-xs text-gray-400'>{email}</p>  
          </div>
        </div>
        <h3 className='text-3xl font-mono mt-4 mb-3 text-center'>{title}</h3>
        <img src={img} alt="empty" className='object-cover w-full h-32 rounded-md '/>
        <p className='mt-4 '>{summary.splice(0, 120)} . . . . .</p>
        <Link to={`/blog/${blog_id}`} className='mb-3 mr-5 text-md text-blue-500 text-right absolute bottom-0 right-0 py-2 px-3 bg-indigo-100 rounded-md'>read more...</Link>
    </div>
  )
}

export default BlogCard