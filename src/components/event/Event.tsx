import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Event.css"

export interface EventData {
    date: string;
    hour: string;
    location: string;
    city: string;
    artist: string;
    image: string;
    _id: string
}

interface EventProps {
    event: EventData
}

function Event({ event }: EventProps) {
    return (
        <Card style={{ width: '14rem' }} className='eventCard'>
        <Card.Img variant="top" src='Tuna.jpg' height={'200erm'} />
        <Card.Body>
          <Card.Title>{event.artist}</Card.Title>
          <Card.Text>
            Location: {event.location} <br></br>
            Time: {event.hour} <br></br>
            Date: {event.date}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}

export default Event