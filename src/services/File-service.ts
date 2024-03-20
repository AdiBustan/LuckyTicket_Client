import axios from "axios";
import { CanceledError } from "./Api-client"


export { CanceledError }

const baseUrl = 'https://node34.cs.colman.ac.il:4000';

const getImage = async (imgName : string) => {
    const abortController = new AbortController()
    const req = await axios.get(baseUrl + '/file/' + imgName, {
        responseType: 'blob'
      });
    return { req, abort: () => abortController.abort() }
}

const uploadImage = async (formData: FormData) => {
    const abortController = new AbortController()
    const req = await axios.post(baseUrl + '/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return { req, abort: () => abortController.abort() }
}


export default { 
    getImage,
    uploadImage
 }