import Card from 'react-bootstrap/Card';
import "./Event.css"
import { Grid } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CommentList from '../comments/CommentList';
import { useState } from 'react';
import EventDetails from './EventDetails';
import { IEvent } from '../../services/Events-service';

interface EventProps {
    event: IEvent
}


function Event({ event }: EventProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);


    return (
        <Card style={{ width: '14rem' }} className='eventCard'>
        <Card.Img variant="top" src={localStorage.getItem(event.imgName)} height={'200erm'} />
        <Card.Body>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <h5>{event.artist}</h5>
            </Grid>
            <Grid item xs={4} style={{fontSize: 14}}>
              {event.comments.length}
              <ChatBubbleOutlineOutlinedIcon style={{width: 30}} sx={{ stroke: "#ffffff", strokeWidth: 1 }} 
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            </Grid>
          </Grid>
          <Card.Text style={{lineHeight: 1.7}}>
            {isHovered ? <CommentList comments={event.comments}/> : <EventDetails event={event}/>}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default Event


