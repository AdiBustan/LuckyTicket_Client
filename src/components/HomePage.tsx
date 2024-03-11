import { Grid } from "@mui/material"
import NavBar from "./navbar/NavBar"
import EventList from "./EventList"
import UploadEvent from "./UploadEvent"

function HomePage() {
    return (
        <>
          <Grid container spacing={12}>
            <Grid item xs={2}>
              <NavBar/>
            </Grid>
            <Grid item xs={10} marginTop={'120px'}>
              <UploadEvent/>
            </Grid>
          </Grid>
        </>
      )
}

export default HomePage