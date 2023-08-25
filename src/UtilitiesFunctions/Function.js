
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




export const makeRequest = axios.create(
  {
    baseURL: server,
    headers: {

      Authorization: `Bearer ${token}`
    }
  }
)


export const postData = async (url, data,  apitoken = token) => {

  try {
    const response = await axios.post(`${server}${url}`, data,
      {
        headers: {

          Authorization: `Bearer ${apitoken}`
        }
      })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }

}

  //