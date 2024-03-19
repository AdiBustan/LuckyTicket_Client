import React , { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import { IUser, registrUser } from '../../services/User-service';
import { setAccessToken, setRefreshToken } from '../../services/token-service';
import AlertDialog from '../../services/AlertDialog';
import FileService from '../../services/File-service';
import {useNavigate } from 'react-router-dom';

const RegistrationPage = ({onLoggin} : any) => {
  const [currFile, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState("/images/profile_avatar.jpg");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const imageData = new FormData();
    imageData.append('image', currFile);
    
    const imgRes = await FileService.uploadImage(imageData);
    
    const user: IUser = {
        'username': data.get('username') as string,
        'email': data.get('email') as string,
        'password': data.get('password') as string,
        'phone': data.get('phone') as string,
        'imgName': imgRes.req.data

    }

    if (!user.username || !user.email || !user.password ||
        !user.phone || !selectedImage) {
      handleOpenDialog();
    } else {
      const res = await registrUser(user)
      onLoggin(res);

      if (res.accessToken) {
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
      }

      navigate('/')
    }

    
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
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

  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/event.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h3" style={{fontFamily: 'cursive', color:'#0D0125'}}>
              SIGN UP
            </Typography>
            
            <Box textAlign="center">
              <img src={selectedImage} alt="Selected" style={{width: '100px', height: '100px', borderRadius:'50%'}} />
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none'}}
                  id="image-upload"
                  name='image'
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ backgroundColor: '#0D0125', fontFamily: 'cursive', height:'25px',fontSize:'10px', width: '150px' }}
                  >
                    Profile Image
                  </Button>
                </label>
              </Box>

            </Box>

            {/* <Avatar sx={{ width: 100, height: 100 }} alt="Remy Sharp" src="/images/profile_avatar.jpg" /> */}
            <Box component="form" width={'450px'} noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Your Name"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Contact Info"
                type="phone"
                id="phone"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid textAlign={'right'}>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#0D0125', fontFamily: 'cursive' }}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <AlertDialog
                  open={open}
                  onClose={handleClose}
                />
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrationPage;