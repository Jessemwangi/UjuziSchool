/**
 * Custom hooks for fetching data and retrieving user information.
 *
 * @param {string} url - The URL to fetch data from when calling the useFetch hook.
 * @param {string} functionName - The name of the function to use when calling the useGetUserInfo hook. Should be either 'user' or 'jwt'.
 */

import { useEffect, useState } from "react"
import { makeRequest } from "../UtilitiesFunctions/Function"
import { getJWTAndID, getSecureUserUid } from "../UtilitiesFunctions/secureUserData"
const isUserSignedIn = sessionStorage.getItem("sessionKey") !== null;

const useFetch = (url) =>{

    const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
    const getData = async () =>{
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
  },[url,isUserSignedIn])
  return {data,loading, error}
      }
      
      const useGetUserInfo = (functionName) =>
      {
        const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
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
  },[functionName,isUserSignedIn])
  return {data,loading, error}
      }

 export  {useFetch, useGetUserInfo}