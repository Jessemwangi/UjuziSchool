import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import SystemError from '../../../../Component/modules/views/Error/SystemError';

const SinglePrice = () => {
    const {id} =useParams()
    const url =`/subscription-packages/${id}?populate[]=item_per_packages.subscription_package_items&populate=*`
    const [subscription, setSubscription] =useState()
    const [isLoading,setIsLoading] =useState(false)
    const [err, setErr] =useState()
  const { data, loading, error }  =useFetch(url)
  useEffect(() => {

    if (error) {
      setErr(error?.response?.data?.error?.message);
      setIsLoading(false); 
    }
    
    if (!error && loading) {
      setIsLoading(true);
    }
  
    if (!error && !loading) {
      setErr();
      setIsLoading(false);
    }
    if (data?.length > 0) {
      setSubscription(data);
    }
  
  }, [data, error, loading]);

    if (err)  return <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}` }/>
    if (isLoading) return <h2>loading .....</h2>
console.log(id)
    return (
        <div>

            <h1>{id}</h1>
            
        </div>
    );
};

export default SinglePrice;