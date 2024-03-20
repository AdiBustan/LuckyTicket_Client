import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router";


const drawerWidth = 230;

export default function NavBar() {
  const navigate = useNavigate();


  const drawer = (
    <div>
      <img src='/home/st111/LuckyTicket_Client/images/w_clover_icon.png' width={'80px'} style={{display:'flex', margin:'auto', marginTop:'30px'}}/>
      <h3  style={{color: '#FFFFFF', fontFamily: 'cursive', display:'flex', justifyContent:'center', marginTop:'10px'}}>
          LUCKY TICKET
      </h3>
      <Toolbar/>
      <List >
        <ListItem key="All Events" disablePadding onClick={() => navigate('/')}>
          <ListItemButton>
            <ListItemIcon style={{color: '#FFFFFF'}}>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary={"All Events"} style={{color: '#FFFFFF'}} />
          </ListItemButton>
        </ListItem>
        <ListItem key="Upload New Event" disablePadding onClick={() => navigate('uploadEvent')}>
          <ListItemButton>
            <ListItemIcon style={{color: '#FFFFFF'}}>
              <UploadIcon />
            </ListItemIcon>
            <ListItemText primary={"Upload New Event"} style={{color: '#FFFFFF'}} />
          </ListItemButton>
        </ListItem>
        <ListItem key="Profile" disablePadding onClick={() => navigate('profile')}>
          <ListItemButton>
            <ListItemIcon style={{color: '#FFFFFF'}}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} style={{color: '#FFFFFF'}} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  
  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >        
        <Drawer
          variant="permanent" 
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth , backgroundColor: "#0D0125"},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
     </Box>
    </Box>
  );
}