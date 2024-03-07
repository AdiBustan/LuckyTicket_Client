import { Grid } from "@mui/material"
import NavBar from "./navbar/NavBar"
import EventList from "./EventList"

function HomePage() {
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

export default HomePage