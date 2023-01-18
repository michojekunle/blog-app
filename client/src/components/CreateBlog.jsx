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
                <form onSubmit={handleCreateBlog}>
            
                </form>
            </div>
        )
      }
    </div>
  )
}

export default CreateBlog;