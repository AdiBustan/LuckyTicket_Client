import apiClient, { CanceledError } from "./Api-client"

import { EventData } from "../components/event/Event"
import { getRefreshToken, refreshAccessToken, setAccessToken } from "./token-service"

export { CanceledError }
const getAllEvents = () => {
    // try {
    const abortController = new AbortController()
    const req = apiClient.get<EventData[]>('event', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
    // } catch (error : any) {
    //     if (error.response.status === 401) { // Unauthorized
    //         const refreshToken = getRefreshToken();
    //         if (refreshToken) {
    //             const newAccessToken = await refreshAccessToken(refreshToken);
    //             setAccessToken(newAccessToken);
    //             return getAllEvents;
    //         } else {
    //         console.error('Refresh token unavailable or failed. User needs to log in again.');
    //         }
    //     }
    // throw error;
    // }

    // const req = <EventData>
    //     {date: '17-01-2023', hour: '22:00', location: 'Barbi', city: 'Tel-aviv', artist: 'Tuna', image: '', _id: '1'};

    // return { req, abort: () => abortController.abort() }

}

export default { getAllEvents }