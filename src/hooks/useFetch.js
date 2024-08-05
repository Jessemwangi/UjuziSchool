/**
 * Custom hooks for fetching data and retrieving user information.
 *
 * @param {string} url - The URL to fetch data from when calling the useFetch hook.
 * @param {string} functionName - The name of the function to use when calling the useGetUserInfo hook. Should be either 'user' or 'jwt'.
 */

import { useEffect, useState } from "react"
import { get_Data } from "../UtilitiesFunctions/Function"
import { getJWTAndID, getSecureUserUid } from "../UtilitiesFunctions/secureUserData"

const useFetch =  (url) =>{
    const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
  
  if (url){

    const getData = async () =>{
      const userInfo = await getJWTAndID()
   
      try {
        setLoading(true)
        const {data} =await get_Data(url,userInfo.jwt)
        setData(data)
        setLoading(false)
       
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
        } 
        getData()
  }
  },[url])

  return {data,loading, error}
      }

      
      const useGetUserInfo = (functionName) =>
      {
        const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
  if(functionName){
        const getData = async () =>{
      let data ;
      try {
        setLoading(true)
        if (functionName ==='user'){
        data  =await getSecureUserUid();

        }
        else{
          data =await getJWTAndID()
        }
        setData(data)
        setLoading(false)
        // console.log(data);
      
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
        } 
        getData()
  }
  },[functionName])
  return {data,loading, error}
      }

 export  {useFetch, useGetUserInfo}