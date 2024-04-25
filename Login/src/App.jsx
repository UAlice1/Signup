import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './assets/pages/Signin'
import Signup from './assets/pages/Signup'
import ForgotPass from './assets/pages/Forgotpass'
import Resetpass from './assets/pages/Resetpass'


const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/forget' element={<ForgotPass/>}/>
        <Route path='/reset' element={<Resetpass/>}/>
       </Routes>
    </BrowserRouter>
     
  )
}

export default App