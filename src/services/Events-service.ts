import apiClient, { CanceledError } from "./Api-client"

import { EventData } from "../components/event/Event"

export { CanceledError }
const getAllEvents = () => {
    const abortController = new AbortController()
    // const req = apiClient.get<EventData[]>('event', { signal: abortController.signal })
    // return { req, abort: () => abortController.abort() }

    // const req = <EventData[]>[ 
    //     {date: '17-01-2023', hour: '22:00', location: 'Barbi', city: 'Tel-aviv', artist: 'Tuna', image: '', _id: '1'},
    //     {date: '23-04-2024', hour: '19:00', location: 'Zapa', city: 'Tel-aviv', artist: 'Ravid plotnik', image: '', _id: '2'}
    // ];

    const req = <EventData>
        {date: '17-01-2023', hour: '22:00', location: 'Barbi', city: 'Tel-aviv', artist: 'Tuna', image: '', _id: '1'};

    return { req, abort: () => abortController.abort() }

}

export default { getAllEvents }