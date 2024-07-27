
import axios from "axios";
export const token = process.env.REACT_APP_SERVER_API;
export const server = process.env.REACT_APP_SERVER_URL
export const backend = process.env.REACT_APP_SERVER
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
    console.log(error)
    throw error
  }

}

export const postData = async (url, data,  apitoken = token) => {

  try {
    
    const response = await axios.post(`${server}${url}`, data,
      {
        headers: {

          Authorization: `Bearer ${apitoken}`
        }
      })
    return response.data
  } catch (error) {
    console.log(error)
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
    console.log(error)
    throw error
  }

}

  //