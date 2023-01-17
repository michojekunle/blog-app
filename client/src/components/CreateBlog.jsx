import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [fname,setFName] = useState("");
  const [file,setFile] = useState("");

  const history = useNavigate();

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

      const res = await axios.post("/register",formData,config);
     
      if(res.data.status == 201){
          history("/")
      }else{
          console.log("error")
      }
  }
  
  return (
    <div>
      <h1 className='text-center text-3xl md:text-5xl mt-11 font-mono text-gray-600'>Create New Blog</h1> 

      <form>
        
      </form>
    </div>
  )
}

export default CreateBlog;