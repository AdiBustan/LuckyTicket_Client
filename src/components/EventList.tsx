import { useEffect, useState } from 'react'
import Event, { EventData } from './event/Event'
import EventService, { CanceledError } from "../services/Events-service"
import axios, { all } from 'axios'

function EventList() {
    // const [events, setEvents] = useState<EventData[]>([])
    // const [error, setError] = useState()
    // useEffect(() => {
    //     const { req, abort } = EventService.getAllEvents()
    //     req.then((res) => {
    //         setEvents(res.data)
    //     }).catch((err) => {
    //         console.log(err)
    //         if (err instanceof CanceledError) return
    //         setError(err.message)
    //     })
    //     return () => {
    //         abort()
    //     }
    // }, [])

    // const [events, setEvents] = useState<EventData[]>([])

    // useEffect(() => {
    //     console.log("use effect")
    //     axios.get<EventData[]>("http://localhost:3000/event", { headers: {"Authorization" : `Bearer fbb866cf21c7d5b59f4598a9157171af6f9769806d4e0590ade0da2d5ee76c41e0abbd92082248c573f088f3647f4707c4389526adf1a07e14b9e684aad6423b`} }).then((response) => {
    //         console.log(response.data)
    //         setEvents(response.data)
    //     })
    //     return () => {
    //         console.log("clean up")
    //     }
    // }, [])

    // return (
    //     <>
    //     {events.map((item, index) =>
    //         <div className="p-4" key={index}>
    //             <Event event={item}/>
    //         </div>
    //     )}
    //     </>
    // )

    const event = EventService.getAllEvents()

    return (
        <>
            <div>
                <Event event={event.req}/>
            </div>
        </>
    )
}

export default EventList