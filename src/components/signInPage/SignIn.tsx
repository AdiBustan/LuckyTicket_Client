import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CredentialResponse, GoogleLogin} from '@react-oauth/google'
import { googleSignin, IUser, logInUser } from '../../services/User-service';
import { setAccessToken, setRefreshToken } from '../../services/token-service';
import { color } from '@mui/system';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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
    onLoggin(res);

    if (res.accessToken) {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
    }
    console.log(user)
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse)
    try {
        const res = await googleSignin(credentialResponse)
        console.log(res)
        onLoggin(res);
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
            backgroundImage: 'url(/images/event.jpg)',
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
          <img src='/images/clover_icon.png' width={'130px'} style={{display:'flex', margin:'auto'}}/>
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