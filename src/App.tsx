//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from './components/signInPage/SignIn';
import RegistrationPage from './components/signInPage/Registration';
import { useState } from 'react';
import NavBar from './components/navbar/NavBar';
import { Grid } from '@mui/material';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
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

            {/* Registration page route */}
            <Route
              path='registration'
              element={<RegistrationPage onLoggin={handleFormSubmit} />}
            />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default App