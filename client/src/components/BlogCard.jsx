import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {
  const { blog_id, title, content, email, img, fullname } = blog;
  console.log(img)
  let img_link = String(img)
  console.log(img_link)
  let summary = content.split('');
  return (
    <Link to={`/blog/${blog_id}`} className='relative py-3 px-6 pb-11 rounded-xl bg-[#D2E7A5] min-w-[200px] max-w-[320px]'>
        <div className="header flex gap-3 items-center ">
          <p className='bg-[#fff] text-[#638122] translate-y-[-6px] rounded-full mt-3 w-10 h-10 flex items-center justify-center'>{fullname?.slice(0, 1)}</p>
          <div>
            <p className='capitalize text-sm text-gray-600'>{fullname?.toLowerCase()}</p>  
            <p className='text-xs text-gray-400'>{email}</p>  
          </div>
        </div>
        <h3 className='text-lg md:text-xl font-mono mt-4'>{title}</h3>
        <img src={img} alt="empty" className='w-full h-32 rounded-md'/>
        <p className='mt-4 '>{summary.splice(0, 120)}.</p>
        <p className='mb-3 mr-5 text-md text-gray-500 text-right absolute bottom-0 right-0 '>Read more...</p>
    </Link>
  )
}

export default BlogCard