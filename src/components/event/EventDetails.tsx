import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { EventData } from './Event';

interface EventProps {
    event: EventData
}

const EventDetails = ({ event } : EventProps) => {
  return (
    <>
        <LocationOnOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.location} <br/>
        <QueryBuilderOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.hour} <br/>
        <CalendarMonthOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.date}
    </>
  );
};

export default EventDetails;
