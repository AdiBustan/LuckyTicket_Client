//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SignInPage from './components/signInPage/SignIn';
import RegistrationPage from './components/signInPage/Registration';
import { useState } from 'react';
import EventPage from './components/EventPage';
import NavBar from './components/navbar/NavBar';
import { Grid } from '@mui/material';
import EventList from './components/EventList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") != null);

  const handleFormSubmit = (data : any) => {
    console.log('Submitted data:', data);
    setIsLoggedIn(true);
  };

  return (
      <BrowserRouter>
        {/* <Routes> */}
          {/* <Route path="/" element={isLoggedIn ? <HomePage/> : <SignInPage onLoggin={handleFormSubmit}/>}> */}
            {/* <Route path="/" element={<HomePage/>}>
            <Route path="registration" element={<RegistrationPage onLoggin={handleFormSubmit}/>} />
            <Route path="/event/:id" element={<EventPage/>}/>
          </Route> */}


        <Grid container spacing={12}>
          <Grid item xs={2}>
            <NavBar/>
          </Grid>
          <Grid item xs={10} marginTop={'20px'}>
            <Routes>
              <Route path='/' element={<EventList/>}/>
              <Route path="event/:id" element={<EventPage/>}/>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
  )
}

export default App
