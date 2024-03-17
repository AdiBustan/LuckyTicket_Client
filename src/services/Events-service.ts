import apiClient, { CanceledError } from "./Api-client"

import { getRefreshToken, refreshAccessToken, setAccessToken } from "./token-service"

export interface IEvent {
    date: string;
    hour: string;
    location: string;
    city: string;
    artist: string;
    phone?: string;
    comments: string[];
    _id?: string;
    ownerId: string;
}

export { CanceledError }
const getAllEvents = () => {
    const abortController = new AbortController()
    const req = apiClient.get<IEvent[]>('event', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const getAllUserEvents = () => {
    const abortController = new AbortController()
    const req = apiClient.get<IEvent[]>('event/myEvents', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const getEventById = (eventId : string) => {
    const abortController = new AbortController()
    const req = apiClient.get<IEvent>('event/' + eventId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const updateEvent = (event : IEvent) => {
    const abortController = new AbortController()
    const req = apiClient.put('event/' + event._id, event, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const deleteEventById = (eventId : string) => {
    const abortController = new AbortController()
    const req = apiClient.delete('event/' + eventId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export const uploadEvent = (event: IEvent) => {
    const abortController = new AbortController()
    console.log(event)

    apiClient.post("/event/", event, { signal: abortController.signal }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })


    // const req = apiClient.post('event/', event, { signal: abortController.signal })
    // return { req, abort: () => abortController.abort() }
}

export default { 
    getAllEvents,
    getAllUserEvents, 
    getEventById,
    updateEvent,
    deleteEventById
 }