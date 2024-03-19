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
     baseURL: 'https://10.10.248.194:443',
     headers: {
          'authorization': `Bearer ${getAccessToken()}`
     }
});

export default apiClient;