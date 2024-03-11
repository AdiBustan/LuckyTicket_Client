import { useEffect, useState } from 'react'
import Event, { EventData } from './event/Event'
import EventService, { CanceledError } from "../services/Events-service"

function EventList() {
    const [events, setEvents] = useState<EventData[]>([])
    const [error, setError] = useState()
    
    useEffect(() => {
        const { req, abort } = EventService.getAllEvents()
        req.then((res) => {
            setEvents(res.data)
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
        <>
        {events.map((item, index) =>
            <div className="p-4" key={index}>
                <Event event={item}/>
            </div>
        )}
        </>
    )


}

export default EventList