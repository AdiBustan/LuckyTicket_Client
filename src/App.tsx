//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from './components/signInPage/SignIn';
import RegistrationPage from './components/signInPage/Registration';
import { useState } from 'react';
import Cookies from 'js-cookie';
import NavBar from './components/navbar/NavBar';
import { Grid } from '@mui/material';
import EventList from './components/homepage/EventList';
import EventPage from './components/event/EventPage';
import UploadEvent from './components/UploadEvent/UploadEvent';
import ProfilePage from './components/profilePage/ProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user_id"));
  
  const handleFormSubmit = (data : any) => {
    console.log('Submitted data:', data);
    localStorage.setItem("user_id", data.userId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('User Logout');
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsLoggedIn(false);
    window.location.href = '/';
  }

  return (

    <BrowserRouter>
      <Grid container spacing={12}>
        {/* Navbar section */}
        {isLoggedIn && (
          <Grid item xs={2}>
            <NavBar />
          </Grid>
        )}

        {/* Main content section */}
        <Grid item xs={isLoggedIn ? 10 : 12} marginTop={isLoggedIn ? '30px' : '0px'}>
          <Routes>
            {/* Home page route */}
            <Route
              path='/'
              element={
                isLoggedIn ? <EventList /> : <SignInPage onLoggin={handleFormSubmit} />
              }
            />

            {/* Upload event page route */}
            <Route
              path='/uploadEvent'
              element={
                isLoggedIn ? <UploadEvent /> : <SignInPage onLoggin={handleFormSubmit} />
              }
            />

            {/* Event page route */}
            <Route
              path='event/:id'
              element={
                isLoggedIn ? <EventPage /> : <SignInPage onLoggin={handleFormSubmit} />
              }
            />

            {/* Profile page route */}
            <Route
              path='profile'
              element={
                isLoggedIn ? <ProfilePage onLogout={handleLogout} /> : <SignInPage onLoggin={handleFormSubmit} />
              }
            />

            {/* Registration page route */}
            <Route
              path='registration'
              element={  <RegistrationPage onLoggin={handleFormSubmit} />}
            />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default App