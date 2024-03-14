import { Avatar, Grid, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { IUser, getUserById } from "../services/User-service"
import { useNavigate, useParams } from "react-router";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CanceledError } from "axios";


function ProfilePage() {
    const [user, setUser] = useState<IUser>();
    const [error, setError] = useState()

    const param = useParams();
    const currUserId = param.id as string;
    const navigate = useNavigate();

    useEffect(() => {
        const { req, abort } = getUserById(currUserId)
        req.then((res) => {
            setUser(res.data)
            console.log(event)
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }
    }, [])

    return(
        <>
             <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIosNewOutlinedIcon/>
            </IconButton>
            <Grid container item xs={10} marginTop={'40px'} marginLeft={'20px'}>
                <Grid item xs={3}>
                    <Avatar
                        alt={user?.name}
                        src={user?.imgUrl ? user.imgUrl : "../../images/avatar.png"}
                        sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid item xs={5}>
                    <div>
                        <h1>{user?.name}</h1>
                        <h5>{user?.email}</h5>
                        <h5>{user?.phone}</h5>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfilePage