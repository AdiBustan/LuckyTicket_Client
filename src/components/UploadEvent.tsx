import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IEvent, uploadEvent } from '../services/Events-service';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Autocomplete } from '@mui/material';



function UploadEvent() {

  const [options, setOptions] = React.useState([{ label: "Tel Aviv, Israel" }])
  const [selectedImage, setSelectedImage] = React.useState("");
  const navigate = useNavigate();


  const fetchLocations = async () => {
    try {
      await axios
        .get("https://countriesnow.space/api/v0.1/countries")
        .then((res) => {
          // console.log(res.data.data);
          const all: { label: string }[] = [];
          res.data.data.map((location: any) => {
            if (location.country == "Israel") {
              location.cities.map((city: any) => {
                const temp = { label: city };
                all.push(temp);
              })
            }
          });
          setOptions(all);
        }).catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error fetching locations: " + error);
    }
  };

  fetchLocations();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(options)
    if (file) {
      // Display the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        console.log(selectedImage)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data)
    const eventToUpload: IEvent = {
      'date': data.get('date') as string,
      'hour': data.get('time') as string,
      'location': data.get('location') as string,
      'city': data.get('city') as string,
      'artist': data.get('artist') as string,
      'image': "selectedImage as unknown as string",
      'comments': [] as string[]
    }

    localStorage.setItem(eventToUpload.artist, selectedImage)
    uploadEvent(eventToUpload)    

    navigate('/')
  };


  return (
    <Container component="main">
      <Typography fontFamily={'cursive'} variant="h3"  marginTop={"50px"}>
        Upload New Event
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container marginTop={'70px'} marginLeft={'20px'} >
          
          <Grid container spacing={2} item xs={12} sm direction="column" >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={11}>
                <TextField
                  name="artist"
                  id="artist"
                  label="Artist"
                  autoFocus
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="date" label="date" format="DD/MM/YYYY" />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker name="time" label="time" format="hh:mm" ampm={false} />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={11}>
                <TextField fullWidth id="location" label="Location" name="location" />
              </Grid>

              <Grid item xs={12} sm={11}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  renderInput={(params) => <TextField {...params} id="city" name="city" label="city" />}
                />
               </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box textAlign="left">
              
              {selectedImage && (
                <Box>
                  <img src={selectedImage} alt="Selected" style={{ width: '200px', height: 'auto' }} />
                </Box>
              )}

              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none'}}
                  id="image-upload"
                  name='image-upload'
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginTop: '10px', backgroundColor: '#0D0125', fontFamily: 'cursive', height:'25px',fontSize:'10px', width: '200px' }}
                  >
                    Upload Image
                  </Button>
                </label>
              </Box>

            </Box>
          </Grid>

        </Grid>

        <Grid marginTop={'50px'} textAlign={"left"}>
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#0D0125', fontFamily: 'cursive' }}
              >
                Upload Event
              </Button>
        </Grid>
      
      </Box>

    </Container>
  );
}

export default UploadEvent