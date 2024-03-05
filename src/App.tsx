import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SignInPage from './components/signInPage/SignIn';
import RegistrationPage from './components/signInPage/Registration';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") != null);

  const handleFormSubmit = (data : any) => {
    console.log('Submitted data:', data);
    setIsLoggedIn(true);
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage/> : <SignInPage onLoggin={handleFormSubmit}/>}>
            <Route path="registration" element={<RegistrationPage onLoggin={handleFormSubmit}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
