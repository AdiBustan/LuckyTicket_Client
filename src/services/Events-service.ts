import apiClient, { CanceledError } from "./Api-client"

import { EventData } from "../components/event/Event"
//import { getRefreshToken, refreshAccessToken, setAccessToken } from "./token-service"

export { CanceledError }
const getAllEvents = () => {
    const abortController = new AbortController()
    const req = apiClient.get<EventData[]>('event', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const getEventById = (eventId : string) => {
    const abortController = new AbortController()
    const req = apiClient.get<EventData>('event/' + eventId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const updateEvent = (event : EventData) => {
    const abortController = new AbortController()
    const req = apiClient.put('event/' + event._id, event, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { 
    getAllEvents, 
    getEventById,
    updateEvent
 }