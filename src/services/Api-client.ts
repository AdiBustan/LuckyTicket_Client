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
     baseURL: 'http://127.0.0.1:3000',
     headers: {
          'authorization': `Bearer ${getAccessToken()}`
     }
});

// axios.interceptors.request.use(function (config) {
//      const accessToken = getAccessToken();
//      config.headers.authorization = accessToken;
 
//      return config;
//    });

// apiClient.interceptors.response.use(
//      response => response,
//      async error => {
//        const originalRequest = error.config;
//        if (error.response && error.response.status === 401 && !originalRequest._retry) {
//          originalRequest._retry = true;
//          try {
//            const refreshToken = getRefreshToken();
//            const newAccessToken = await refreshAccessToken(refreshToken);
//            setAccessToken(newAccessToken);
//            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
//            return apiClient(originalRequest);
//          } catch (refreshError) {
//            // Handle refresh error (e.g., redirect to login page)
//            console.log('Failed to refresh access token', refreshError);
//            // For example, redirect to login page
//           //  window.location.href = '/';
//          }
//        }
//        return Promise.reject(error);
//      }
//    );
export default apiClient;