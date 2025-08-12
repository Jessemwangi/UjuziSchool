/**
 * Custom hooks for fetching data and retrieving user information.
 *
 * @param {string} url - The URL to fetch data from when calling the useFetch hook.
 * @param {string} functionName - The name of the function to use when calling the useGetUserInfo hook. Should be either 'user' or 'jwt'.
 */

import { useEffect, useState } from "react"
import { get_Data } from "../UtilitiesFunctions/Function"
import { getJWTAndID, getSecureUserUid } from "../UtilitiesFunctions/secureUserData"

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // start as true
  const [error, setError] = useState(null);     // store actual error

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const userInfo = await getJWTAndID();
        const token = userInfo.JWT;

        const result = await get_Data(url, token);
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err); // store error object
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false; 
    };
  }, [url]);

  return { data, loading, error };
};


      
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
            
      } catch (error) {
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