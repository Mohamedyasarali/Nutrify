import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Notfound from './Components/Notfound'
import Track from './Components/Track'
import Private from './Components/Private'
import { useState } from 'react'
import {AuthContext} from './Context/AuthContext'
import Diet from './Components/Diet'


function App() {

  const [userLoggedIn,setUserLoggedIn]=useState(JSON.parse(localStorage.getItem("nutrify-token")));
  
  // console.log(userLoggedIn);
  
  
  return (
    <>

    <AuthContext.Provider value={{userLoggedIn,setUserLoggedIn}}>

      <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/track' element={<Private component={Track}/>}/>
        <Route path='/diet' element={<Private component={Diet}/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </BrowserRouter>

    </AuthContext.Provider>

  
  
    </>
  )
}

export default App
