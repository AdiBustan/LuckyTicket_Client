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
import UploadEvent from './components/UploadEvent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id") != null);

  const handleFormSubmit = (data : any) => {
    console.log('Submitted data:', data);
    setIsLoggedIn(true);
  };

  return (
      <BrowserRouter>
        <Grid container spacing={12}>
        {isLoggedIn && <Grid item xs={2}>
            <NavBar/>
          </Grid>}
          <Grid item xs={10} marginTop={'20px'}>
            <Routes>
              <Route path='/' element={isLoggedIn ? <EventList/> : <SignInPage onLoggin={handleFormSubmit}/>}/>
              <Route path='uploadEvent' element={isLoggedIn ? <UploadEvent/> : <SignInPage onLoggin={handleFormSubmit}/>}/>
              <Route path="event/:id" element={isLoggedIn ? <EventPage/> : <SignInPage onLoggin={handleFormSubmit}/>}/>
              <Route path="registration" element={<RegistrationPage onLoggin={handleFormSubmit}/>} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
  )
}

export default App