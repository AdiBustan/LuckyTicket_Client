import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import EventsService , { IEvent }  from '../../services/Events-service';
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import AlertDialog from '../../services/AlertDialog';
import { useNavigate } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


interface EventProps {
    event: IEvent
}

function EditEvent({ event }: EventProps){

    const [options, setOptions] = React.useState([{ label: "Tel Aviv, Israel" }]);
    const [selectedImage, setSelectedImage] = React.useState(localStorage.getItem(event.artist));
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);  
    const handleClose = () => { setOpen(false) };
    
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

    const handleSubmit = (newEvent: React.FormEvent<HTMLFormElement>) => {
      newEvent.preventDefault();
    
      const data = new FormData(newEvent.currentTarget);
      console.log(data)
      
      let date = event.date;
      let hour = event.hour;
      let city = event.city;

      if (data.get('date')) {
        date = data.get('date') as string;
      }
      if (data.get('time')) {
        hour = data.get('time') as string;
      }
      if  (data.get('city')) {
        city = data.get('city') as string;
      }

      const eventToUpload: IEvent = {
        '_id': event._id,
        'date':  date,
        'hour': hour,
        'location': data.get('location') as string,
        'city': city,
        'artist': data.get('artist') as string,
        'comments': event.comments,
        'ownerId': event.ownerId
      }
        
      EventsService.updateEvent(eventToUpload)    
        
      navigate('/')

      
    };

    function deleteEvent() {
        EventsService.deleteEventById(event._id as string);
        navigate('/')
    }

    return(
            

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container marginTop={'70px'} marginLeft={'20px'} >
          
          <Grid container spacing={2} item xs={12} sm direction="column" >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={11}>
                <TextField
                  name="artist"
                  id="artist"
                  label="Artist"
                  defaultValue={event.artist}
                  autoFocus
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="date" label={event.date} defaultValue={event.date} format={event.date} />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker name="time" label={event.hour} defaultValue={event.hour} format={event.hour} ampm={false} />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={11}>
                <TextField fullWidth id="location" label='Location' defaultValue={event.location} name="location" />
              </Grid>

              <Grid item xs={12} sm={11}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  renderInput={(params) => <TextField {...params} id="city" name="city" label={event.city} defaultValue={event.city} />}
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
                          Submit changes
                    </Button>
                    <Button
                        onClick={() => {deleteEvent()}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: 'red', fontFamily: 'cursive' , marginLeft: '5px'}}
                        >
                          delete event
                    </Button>
                    <AlertDialog
                      open={open}
                      onClose={handleClose}
                    />
                  </Grid>
                        
                </Box>
    )
}

export default EditEvent