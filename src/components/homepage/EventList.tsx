import { useEffect, useState } from 'react'
import Event from '../event/Event'
import EventService, { CanceledError, IEvent } from "../../services/Events-service"
import { Link } from 'react-router-dom'

function EventList() {
    const [events, setEvents] = useState<IEvent[]>([])
    
    useEffect(() => {
        const { req, abort } = EventService.getAllEvents()
        req.then((res) => {
            setEvents(res.data)
        }).catch((err) => {
            console.log(err)
            if (err instanceof CanceledError) return
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