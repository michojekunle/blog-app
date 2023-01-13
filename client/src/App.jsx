import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthContextProvider from './context/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
          </Routes> 
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App