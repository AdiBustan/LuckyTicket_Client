import { Avatar, Grid, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { IUser, getUserByEmail } from "../../services/User-service"
import { useNavigate } from "react-router";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CanceledError } from "axios";
import UserEventList from "./UserEventList";
import FileService from "../../services/File-service";
import EditProfile from "./EditProfile";
import React from "react";


function ProfilePage({onLogout} : any) {
    const [user, setUser] = useState<IUser>();
    // const [error, setError] = useState()
    const [isEditMode, setIsEditMode] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        const { req, abort } = getUserByEmail()
        req.then(async (res) => {
            if (res.data.imgName) {
                const response = await FileService.getImage(res.data.imgName);
                const imageSrc = URL.createObjectURL(response.req.data);
                if (!localStorage.getItem(res.data.imgName)) {
                    localStorage.setItem(res.data.imgName , imageSrc); 
                } 
            }

            setUser(res.data)
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            // setError(err.message)
        })
        return () => {
            abort()
        }
    }, [])

    return(
        <>
            <IconButton style={{marginLeft:'85%'}} onClick={() => setIsEditMode(true)}>
                <EditOutlinedIcon/>
            </IconButton>
            <IconButton onClick={onLogout}>
                <LogoutOutlinedIcon/>
            </IconButton>
            {isEditMode ? <EditProfile user={user}/> :
            <Grid container item xs={10} marginTop={'40px'} marginLeft={'20px'}>
                <Grid item xs={3} >
                    <Avatar
                        alt={user?.username}
                        src={user?.imgName ? localStorage.getItem(user.imgName) as string : undefined}
                        sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid item xs={8} marginTop={'40px'}>
                    <div>
                        <h1 style={{fontFamily: 'cursive'}}>{user?.username}</h1>
                        <h5 style={{marginTop: '20px', fontFamily: 'cursive'}}>{user?.phone}</h5>
                    </div>
                </Grid>
                <Grid item xs={12} marginTop={'8%'}>
                    <h2 style={{fontFamily: 'cursive', marginLeft:'2%'}}>Uploaded Events:</h2>
                    <div style={{marginTop: '5%'}}>
                        <UserEventList/>
                    </div>
                </Grid>
            </Grid>    
            }
        </>
    )
}

export default ProfilePage