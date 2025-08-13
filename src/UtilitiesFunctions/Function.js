
import axios from "axios";
import { getJWTAndID } from "./secureUserData";
  const userInfo = await getJWTAndID();
  export const token = userInfo?.JWT;
export const server = process.env.REACT_APP_SERVER_URL
export const backend = process.env.REACT_APP_SERVER
export const emailJs_service = process.env.REACT_APP_EMAILJS_SERVICE_ID
export const emailJs_template = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
export const emailJs_user = process.env.REACT_APP_EMAILJS_USER_ID

// video time functions 

export const formatHours = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00'
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  } else {
    return `${mm}:${ss}`
  }
};




export const makeRequest =(token,url)=> axios.create(
  
  {
    baseURL: `${server}${url}`,
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  }
)

export const get_Data = async (url, apitoken) => {
  try {
    const response = await axios.get(`${server}${url}`, 
      {
        headers: {

          Authorization: `Bearer ${apitoken}`
        }
      })
    return response.data
  } catch (error) {
    throw error
  }

}

export const postData = async (url, data, apitoken = token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${apitoken}`
      }
    };

    // Don't set Content-Type for FormData - let axios handle it
    if (!(data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    const response = await axios.post(`${server}${url}`, data, config);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNoToken = async (url, data) => {

  try {
    
    const response = await axios.post(`${server}${url}`, data,)
    return response.data
  } catch (error) {
   
    throw error
  }

}

export const putData = async (url, data,  apitoken = token) => {

  try {
    const response = await axios.put(`${server}${url}`, data,
      {
        headers: {

          Authorization: `Bearer ${apitoken}`
        }
      })
    return response.data
  } catch (error) {
  
    throw error
  }

}

  //