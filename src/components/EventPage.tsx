import { Grid, IconButton, TextField } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import EventsService, { CanceledError } from "../services/Events-service";
import { EventData } from './event/Event'
import CommentList from "./comments/CommentList";

function EventPage() {
    const param = useParams();
    const [event, setEvent] = useState<EventData>([])
    const [error, setError] = useState()
    const [isHidden, setIsHidden] = useState(false)
    const [message, setMessage] = useState('');

    const handleChange = change => {
      setMessage(change.target.value);
    };

    const onAddComment = () => setIsHidden(true);
    const finishAddComment = () => setIsHidden(false);

    const eventId = param.id as string;
    const navigate = useNavigate();

    useEffect(() => {
        const { req, abort } = EventsService.getEventById(eventId)
        req.then((res) => {
            setEvent(res.data)
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


    function addComment(event: EventData) {
        const newEvent :EventData = event;
        const newComment = message as string;
    
        newEvent.comments.push(newComment);
        console.log("new event: " + newEvent.comments);
    
        const { req, abort } = EventsService.updateEvent(newEvent)
            req.then((res) => {
                console.log(res.data)
                setIsHidden(false);
            }).catch((err) => {
                console.log(err)
            })
            return () => {
                abort()
            }
    }
    
    return(
        <div>
            <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIosNewOutlinedIcon/>
            </IconButton>
            <Grid container item xs={10} spacing={4} marginLeft={'10px'}>
                <Grid item xs={12} marginTop={'40px'}>
                    <h1>{event.artist}</h1>
                </Grid>
                <Grid item xs={3} style={{fontSize: 20}}>
                    <CalendarMonthOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1, fontSize: 40 }}/>{event.date}
                </Grid>
                <Grid item xs={7} style={{fontSize: 20}}>
                    <QueryBuilderOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1, fontSize: 40 }}/> {event.hour}
                </Grid>
                <Grid item xs={3} style={{fontSize: 20}}>
                    <LocalPhoneOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1, fontSize: 40 }}/> 054-2685794
                </Grid>
                <Grid item xs={7} style={{fontSize: 20}}>
                    <LocationOnOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1, fontSize: 40 }}/> {event.location}
                </Grid>
                <Grid item xs={3} marginTop={'10px'}>
                    <h2>Comments
                        <IconButton onClick={onAddComment}>
                            <AddCircleOutlineOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 0.8, fontSize: 40 }}/>
                        </IconButton>
                    </h2>
                </Grid>
                {isHidden && 
                    <Grid item xs={3} marginTop={'10px'}>
                        <TextField id="comment" label="Insert comment" variant="outlined" onChange={handleChange} value={message}/>
                        <IconButton onClick={() => {
                            addComment(event);
                            finishAddComment;
                            }}>
                            <SendIcon sx={{ stroke: "#ffffff", strokeWidth: 1, fontSize: 25, color:"black" }}/>
                        </IconButton>
                    </Grid>
                }
                <Grid item xs={10}>
                    <CommentList comments={event.comments}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventPage