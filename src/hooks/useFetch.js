import { useEffect, useState } from "react"
import { makeRequest } from "../UtilitiesFunctions/Function"

const UseFetch = (url) =>{

    const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
    const getData = async() =>{
      try {
        setLoading(true)
        const {data} =await makeRequest.get(url)
        setData(data.data)
        setLoading(false)
        // console.log(data);
      
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
        } 
        getData()
  },[url])
  return {data,loading, error}
      } 

 export default UseFetch