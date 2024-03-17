import { useEffect, useState } from 'react'
import Event from './event/Event'
import EventService, { CanceledError, IEvent } from "../services/Events-service"
import FileService from '../services/File-service'
import { Link } from 'react-router-dom'

function EventList() {
    const [events, setEvents] = useState<IEvent[]>([])
    const [error, setError] = useState()

    
    useEffect(() => {
        const { req, abort } = EventService.getAllEvents()
        req.then((res) => {
            const currEvents: IEvent[] = res.data;

            currEvents.forEach(async event => {
                const response = await FileService.getImage(event.imgName);
                const imageSrc = URL.createObjectURL(response.req.data);
                localStorage.setItem(event.imgName , imageSrc);  
            });

            setEvents(currEvents)

        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }
    }, [])
    

    return (
        <div className="container">
            <div className="row">
                {events.map((item, index) =>
                    <div className="col-md-3 mb-4" key={index}>
                        <Link to={'/event/' + item._id} style={{textDecoration: 'none'}}>
                        <Event event={item}/>
                        </Link>
                    </div>
                )} </div>
                </div>
    )


}

export default EventList