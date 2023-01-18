import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateBlog = () => {
  const { isLoggedIn, handleCreateBlog } = useContext(AuthContext);
  const [fname,setFName] = useState("");
  const [file,setFile] = useState("");

  const navigate = useNavigate();

  const setdata = (e)=>{
      setFName(e.target.value)
  }

  const setimgfile = (e)=>{
      setFile(e.target.files[0])
  }

  const addUserData = async(e)=>{
      e.preventDefault();

      var formData = new FormData();
      formData.append("photo",file)
      formData.append("fname",fname);

      const config = {
          headers:{
              "Content-Type":"multipart/form-data"
          }
      }

      const res = await axios.post("http://localhost:3000/createblog",formData,config);
     
      if(res.data.status == 201){
          navigate("/")
      }else{
          console.log("error")
      }
  }
  
  return (
    <div>

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
            <div>
                <h1 className='text-center text-3xl md:text-5xl mt-11 font-mono text-gray-600'>Create New Blog</h1> 
                <form className="mt-8 space-y-6" onSubmit={e => { e.preventDefault(); handleCreateBlog({email, password})}}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" aria-hidden="true" />
                      </span>
                      {
                        isLoading ? 'Signing in ...' : 'Sign In'
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