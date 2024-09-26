import React, { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect } from "react";
import SystemError from "../../../Component/modules/views/Error/SystemError";
import { Link } from "react-router-dom";

function PricingTable({
  title,
  id,
  delay,
  amount,
  duration,
  sm_text,
  item_off_1,
  item_off_2,
  list,
}) {
  return (
    <div
      className="col-lg-4"
      data-sal-delay={delay}
      //  data-sal="slide-up"
      data-sal-duration="800"
    >
      <div className="pricing-table">
        <div className="pricing-header">
          <h6 className="title">{title}</h6>
          <div className="price-wrap">
            <span className="amount">${amount}</span>
            <span className="duration">{duration}</span>
          </div>
          <p>{sm_text}</p>
        </div>

        <div className="pricing-body">
          <ul className="list-item">
            <li>
              <i className="icon-20"></i>Courses included: 1
            </li>
            <li>
              <i className="icon-20"></i>Individual Course
            </li>
            <li>
              <i className="icon-20"></i>Course learning checks
            </li>
            <li className={`${item_off_1 ? "item-off" : ""}`}>
              <i className="icon-20"></i>Course discussions
            </li>
            <li className={`${item_off_1 ? "item-off" : ""}`}>
              <i className="icon-20"></i>Offline learning
            </li>
          </ul>
        </div>

        <div className="pricing-btn">
          <Link className="edu-btn btn-border btn-medium" to={`/member/admin/package/${id}`}>
            Select plan<i className="icon-east"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

const PricingArea = () => {
  // console.log(packages)
  const [subscription, setSubscription] =useState()
  const [isLoading,setIsLoading] =useState(false)
  const [err, setErr] =useState()
  const [itemsPerPackage, setItemsPerPackage] = useState([]);
  const url ='/subscription-packages?populate[]=item_per_packages.subscription_package_items'
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
    if (!loading && !error && data) {
      setSubscription(data.data);
    }
  
  }, [data, error, loading]);

    if (err)  return <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}` }/>
    if (isLoading) return <h2>loading .....</h2>
  return (
    <div className="edu-section-gap">
      <div className="container">
        <div
          className="section-title section-center"
          data-sal="slide-up"
          data-sal-duration="400"
        >
          <span className="pre-title">View membership Plans</span>
          <h2 className="title">Great Membership Plan</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>
{console.log(subscription)}
        <div className="row g-5">
          {subscription &&
            subscription?.map(({attributes,id})=>
            <PricingTable
            key={id}
            id={id}
            delay="500"
            title={attributes?.packageName}
            amount={attributes?.charges?.data?.reduce((acc, item) => acc + item.attributes.amount, 0)}
            duration={attributes?.duration}
            item_off_1={true}
            sm_text={attributes?.descritpion}
            item_off_2={true}
            list ={attributes?.item_per_packages?.data?.flatMap(subItem =>
              subItem.attributes?.subscription_package_items.data
            )}
          />
      
            
            )
          }

        </div>
      </div>
    </div>
  );
};

export default PricingArea;
