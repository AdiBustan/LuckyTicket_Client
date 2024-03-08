import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DemoContainer} from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

function UploadEvent() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  function handleImageChange() {

  }

  return (
      <Container component="main">
        <Typography fontFamily={'cursive'} variant="h3">
                Upload New Event
          </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3} item xs={6}>
              <Grid item xs={12}>
                <TextField
                  name="Artist"
                  fullWidth
                  id="artist"
                  label="Artist"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} mt={-1} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Date" format="DD/MM/YYYY"/>
                    </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} mt={-1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Time" format='hh:mm' />
                    </DemoContainer>
                </LocalizationProvider>       
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth
                  id="location"
                  label="Location"
                  name="Location"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="City"
                  label="City"
                  id="city"
                />
              </Grid>
            </Grid>
            <Grid marginTop={'-290px'} marginLeft={'700px'}>
                <input accept="image/*" style={{ display: 'none' }}
                        id="image-upload" type="file" onChange={handleImageChange}/>
                    <label htmlFor="image-upload">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#0D0125", fontFamily: "cursive" }} 
                            component="span">
                            Upload Image
                        </Button>
                        </label>
            </Grid>
            <Grid marginTop={'300px'} marginLeft={'900px'}>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                style={{ backgroundColor: "#0D0125", fontFamily: "cursive" }}
                >
                Upload Event
                </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default UploadEvent