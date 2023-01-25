import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Upload } from 'upload-js';

const CreateBlog = () => {
  const { isLoggedIn, handleCreateBlog, isLoading } = useContext(AuthContext);
  const [content,setContent] = useState('');
  const [title, setTitle] = useState('');
  const [file,setFile] = useState();
  const [ progress, setProgress ] = useState(0);
  const upload = Upload({ apiKey: "public_kW15b39D4vwzxV65fgcmuk9xBArZ"});  // Your real API key.

  const navigate = useNavigate();

  const onFileSelected = async (event) => {
    const [ file ]    = event.target.files;
    const { fileUrl } = await upload.uploadFile(file, { onProgress });
    setFile(fileUrl);
    // alert(`File uploaded: ${fileUrl}`);
  }
  
  const onProgress = ({ progress }) => {
    setProgress(progress);
    console.log(`File uploading: ${progress}% complete.`);

  }
 
  return (
    <div className='flex items-center justify-center mb-11'>

      { !isLoggedIn ? (
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
            <div className='w-11/12 max-w-[700px]'>
                <h1 className='text-center text-3xl md:text-5xl mt-11 font-mono text-gray-600'>Create New Blog</h1> 
                <form className="mt-8 space-y-6" onSubmit={e => { e.preventDefault(); handleCreateBlog({title, file, content})}}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="blog-title" className="sr-only">
                        Blog-Title
                      </label>
                      <input
                        id="blog-title"
                        name="blog-title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        autoComplete="text"
                        required
                        className="relative block mb-8 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Blog Title"
                      />
                    </div>
                    <div className='relative h-56 overflow-hidden'>
                      <label htmlFor="blog-image" className="sr-only">
                        Blog-Image
                      </label>
                      <input
                        id="blog-image"
                        name="blog-image"
                        onChange={onFileSelected}
                        type="file"
                        required
                        className="relative block w-full h-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      {progress === 0 || progress >=100 ? <div> </div> : <div className='absolute bg-[#fff]  border border-gray-300 flex items-center justify-center text-lg font-mono top-0 h-full w-full rounded-md z-10 '>Uploading {progress}% complete</div>  }
                      {file ? <img src={file} alt="Image Error" className='absolute bg-[#d9d9d9] top-0 h-full w-full rounded-md z-20'/>: '' }
                    </div>
                    <div>
                      <label htmlFor="blog-content" className="sr-only">
                        Blog-Content
                      </label>
                      <textarea
                        id="blog-content"
                        name="blog-content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        type="text"
                        autoComplete="text"
                        required
                        className="relative block w-full mt-8 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 text-sm placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 md:text-md min-h-[350px]"
                        placeholder="Blog Content"
                      />
                    </div>                    
                  </div>

                  <div className='flex flex-row items-center justify-between'>
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="group cursor-pointer relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-8 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="group cursor-pointer relative flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-8 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      {
                        isLoading ? 'Publishing ...' : 'Publish'
                      }
                    </button>
                  </div>
                </form>
            </div>
        )
      }
    </div>
  )
}

export default CreateBlog;