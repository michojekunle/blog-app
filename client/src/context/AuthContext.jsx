import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [authProfile, setAuthProfile] = useState({});
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [isLoading, setIsLoading ] = useState(false);
    const [blogs, setBlogs] = useState([]);

    
    const handleSignIn = (userProfile) => {
      const { email, password } = userProfile;
      setIsLoading(true);
      axios.post('http://localhost:3000/signin', {
        email,
        password,
      })
      .then(function (res) {
        setIsLoading(false);
        console.log(res);
        if (res.status === 200){
          setAuthProfile(res.data.user);
          localStorage.setItem('user_id', res.data.user.user_id);
          navigate('/');
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        if (err?.code === "ERR_NETWORK") {
          alert(err?.message)
        }
        console.log(err);
        err?.response ? (
          alert(err?.response?.status + ", " + err?.response?.statusText + " " + err?.response?.data?.message)
        ) : ""
      })
}
    const handleSignOut = () => {
      axios.post('http://localhost:3000/signout')
      .then(async function (res) {
        console.log(res);
        if (res.status === 200){
          await localStorage.setItem('user_id', 'null');
          setAuthProfile(res.data.user);
          navigate('/signin');
        }
      })
      .catch(function (err) {
        if (err?.code === "ERR_NETWORK") {
          alert(err?.message)
        }
        setIsLoading(false);
        console.log(err);
        alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
      });
    }

    const handleCreateBlog = ({ title, file, content }) => {
      setIsLoading(true);
      axios.post('http://localhost:3000/createblog', {
        email: authProfile?.email,
        fullname: authProfile?.fullname,
        title,
        img: file,
        content,
        likes: 0,
        created_on: new Date()
      })
      .then(res => {
        if(res.status = 200){
          setBlogs(res.data.blogs);
          setIsLoading(false);
          navigate('/');
        }
      }).catch(err => {
        if (err?.code === "ERR_NETWORK") {
          alert(err?.message)
        }
        console.log(err);
        alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
        setIsLoading(false);
      })
    }

    const handleSignUp = (userProfile) => {
        const { fullname, email, password } = userProfile;
        setIsLoading(true);

        axios.post('http://localhost:3000/signup', {
            fullname,
            email,
            password,
          })
          .then(function (res) {
            setIsLoading(false);
            console.log(res);
            if (res.status === 200){
              setAuthProfile(res.data.user);
              localStorage.setItem('user_id', res.data.user.user_id);
              navigate('/');
            }
            if (res.status >= 500) {
              setIsLoading(false);
              alert("Internal Server Error");
            }
            if (res.status >= 400) {
              setIsLoading(false);
              alert(res.data.message);
            }
          })
          .catch(function (err) {
            setIsLoading(false);
            if (err?.code === "ERR_NETWORK") {
              alert(err?.message)
            }
            console.log(err);
            alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
          });
    }

    const getBlogs = () => {
      axios.get('http://localhost:3000/getblogs')
      .then(res => {
        if(res.status === 200){
          setBlogs(res.data.blogs);
          console.log(blogs);
        }
      })
      .catch(err => {
        console.log(err);
        alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
      })
    }

    const handleUpdateBlog = (id) => {

    }

    const handleDeleteBlog = (id) => {
      if (window.confirm("Do you really want to delete this blog post!!")){
        axios.delete(`http://localhost:3000/blog/${id}`)
        .then(res => {
          alert(res.data.message);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
          alert(err?.response?.status + ", " + err?.response?.statusText + " " + err?.response?.data.message);
        })
      }
    }

    useEffect(() => {
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      if (user_id !== 'null' || user_id !== NaN || user_id !== 'NaN') {
        setIsLoggedIn(true);
        axios.get(`http://localhost:3000/user/${user_id}`)
        .then((res) => {
          console.log(res);
          if (res.status = 200){
            setAuthProfile(res?.data?.user);
          }
        })
      } else {
        setIsLoggedIn(false);
        navigate('/signin');
      }
    }, [localStorage.getItem("user_id")]);

    useEffect( () => {

      getBlogs();
      console.log(blogs);
    }, []);

    return (
        <AuthContext.Provider value={{isLoading, handleSignIn, handleSignOut, handleSignUp, handleCreateBlog, getBlogs, authProfile, isLoggedIn, handleUpdateBlog, handleDeleteBlog, blogs}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
