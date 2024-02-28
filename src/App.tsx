import { useState } from 'react'
import './App.css'
import EventList from './components/EventList'
import NavBar from './components/navbar/NavBar'
import { Grid } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={2}>
          <NavBar/>
        </Grid>
        <Grid item xs={10} marginTop={'120px'}>
          <EventList/>
        </Grid>
      </Grid>
    </>
  )
}

export default App
