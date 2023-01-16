import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [authProfile, setAuthProfile] = useState({});
    const [isLoading, setIsLoading ] = useState(false);

    
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
          navigate('/');
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
        alert("Oops!, There was An error Logging in to your Account, Please Try Again.")
      });
    }

    const handleSignOut = () => {
      axios.post('http://localhost:3000/signout')
      .then(function (res) {
        console.log(res);
        if (res.status === 200){
          setAuthProfile(res.data.user);
          navigate('/');
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
        alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
      });
      navigate('/signin');
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
            console.log(err);
            alert(err.response.status + ", " + err.response.statusText + " " + err.response.data.message);
          });
    }

    return (
        <AuthContext.Provider value={{isLoading, handleSignIn, handleSignOut, handleSignUp, authProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
