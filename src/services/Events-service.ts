import apiClient, { CanceledError } from "./Api-client"

import { EventData } from "../components/event/Event"
import { getRefreshToken, refreshAccessToken, setAccessToken } from "./token-service"

export interface IEvent {
    date: string;
    hour: string;
    location: string;
    city: string;
    artist: string;
    image: string;
    _id?: string,
}

export { CanceledError }
const getAllEvents = () => {
    const abortController = new AbortController()
    const req = apiClient.get<EventData[]>('event', { signal: abortController.signal })
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

export default { getAllEvents }