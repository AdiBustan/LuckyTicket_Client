import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router';
import { IUser, updateUser } from '../../services/User-service';
import FileService from '../../services/File-service';
import { useState } from 'react';


interface UserProps {
    user: IUser
}

function EditEvent({ user }: UserProps){
    const [currFile, setFile] = React.useState();
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>
                                              (user.imgName ? localStorage.getItem(user.imgName) : '/images/avatar.png');
    const navigate = useNavigate();
  
    const handleSubmit = async (newEvent: React.FormEvent<HTMLFormElement>) => {
      newEvent.preventDefault();
      let imgRes;
      
      const data = new FormData(newEvent.currentTarget);
      if (currFile) {
        const imageData = new FormData();
        imageData.append('image', currFile);
        imgRes = await FileService.uploadImage(imageData);
      }

      let username = user.username;
      let phone = user.phone;

      if (data.get('username')) {
        username = data.get('username') as string;
      }
      if  (data.get('phone')) {
        phone = data.get('phone') as string;
      }

      const userToUpdate: IUser = {
        '_id': user._id,
        'username':  username,
        'email': user.email,
        'password': user.password,
        'phone': phone,
        'imgName': imgRes ? imgRes.req.data : user.imgName,
        'accessToken': user.accessToken,
        'refreshToken': user.refreshToken
      }
        
      updateUser(userToUpdate)    
      navigate('/')
    };

    const handleImageChange = (event: any) => {
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
  
    return(
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container marginTop={'100px'} marginLeft={'20px'} >

                    <Grid container spacing={2} item xs={12} sm={6} direction="column" >
                      <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm={12}>
                          <TextField
                            name="username"
                            id="username"
                            label={"Your Name"}
                            defaultValue={user.username}
                            autoFocus
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <TextField fullWidth id="phone" label={'Contact Info'} defaultValue={user.phone} name="phone" />
                        </Grid>

                        <Box textAlign="center" marginTop={'5%'} marginLeft={'20px'}>
                          <img src={selectedImage as string} alt="Selected" style={{width: '100px', height: '100px', borderRadius:'50%'}} />
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
                                style={{ backgroundColor: '#0D0125', fontFamily: 'cursive', height:'25px',fontSize:'10px', width: '150px' }}
                              >
                                Profile Image
                              </Button>
                            </label>
                          </Box>

                        </Box>
                      </Grid>
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
                  </Grid>   
                </Box>
    )
}

export default EditEvent