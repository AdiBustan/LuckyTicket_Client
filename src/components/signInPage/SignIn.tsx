import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CredentialResponse, GoogleLogin} from '@react-oauth/google'
import { googleSignin, IUser, logInUser } from '../../services/User-service';
import { setAccessToken, setRefreshToken } from '../../services/token-service';
import Logo from '../../../images/clover_icon.png';

const SignInPage = ({onLoggin} : any) => { 

  const handleLogginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user: IUser = {
        'email': data.get('email') as string,
        'password': data.get('password') as string,
        'phone': "0544444"
    }
    const res = await logInUser(user)

    if (res.accessToken) {
       setAccessToken(res.accessToken);
       setRefreshToken(res.refreshToken);
      console.log("Have all the tokens");
      onLoggin(res);
    }
    
    console.log(user)
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse)
    try {
        const res =  await googleSignin(credentialResponse)
        onLoggin(res);

        if (res.accessToken) {
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
        }
        console.log(res)
    } catch (e) {
        console.log(e)
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed")
  };

  return (
    <div>
      <Grid container component="main" sx={{height: '100vh'}}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/LuckyTicket_Client/images/event.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} md={5} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <img src={Logo} width={'130px'} style={{display:'flex', margin:'auto'}}/>
            <Typography component="h1" variant="h3"  style={{fontFamily: 'cursive', color:'#0D0125'}} >
              LUCKY TICKET
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogginSubmit} sx={{ mt: 1 }}>
              
              <Grid marginTop={'60px'}>
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
              </Grid>
              
              <Grid textAlign='right'>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#0D0125', fontFamily: 'cursive' }}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              
              <Grid container marginTop={'40px'}>
                <Grid width={'200px'} style={{display:'flex', margin:'auto'}}>
                  <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure}/>
                </Grid>
              </Grid>
              

              <Grid container marginTop={'20px'}>
                <Grid item style={{display:'flex', margin:'auto'}}>
                  <Link href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
              
            </Box>
          </Box>
        </Grid>
      </Grid>
      </div>
  );
};

export default SignInPage;