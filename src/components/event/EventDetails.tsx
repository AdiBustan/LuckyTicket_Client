import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'; 
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { IEvent } from '../../services/Events-service';

interface EventProps {
    event: IEvent
}

const EventDetails = ({ event } : EventProps) => {
  return (
    <>
        <LocationOnOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.location} <br/>
        <QueryBuilderOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.hour} <br/>
        <CalendarMonthOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.date} <br/>
        <LocalPhoneOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }}/> {event.phone}
    </>
  );
};

export default EventDetails;
