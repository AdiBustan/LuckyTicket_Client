import axios, { CanceledError } from "axios";
import { getAccessToken } from "./token-service";

export { CanceledError }

// axios.interceptors.request.use((config) => {
//      const accessToken = getAccessToken();
//      if (accessToken) {
//        config.headers.Authorization = `Bearer ${accessToken}`;
//      }
//      return config;
// });  

const apiClient = axios.create({
     baseURL: 'https://node34.cs.colman.ac.il:4000',
     headers: {
          'authorization': `Bearer ${getAccessToken()}`
     }
});

export default apiClient;