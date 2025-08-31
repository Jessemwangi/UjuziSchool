import React from 'react';
import { Link } from 'react-router-dom';

const PricingTable = ({
  title,
  id,
  delay,
  amount,
  duration,
  sm_text,
  item_off_1,
  item_off_2,
  list,
}) => {
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
                  {/* <li className={`${item_off_1 ? "item-off" : ""}`}>
                    <i className="icon-20"></i>Offline learning
                  </li> */}
                </ul>
              </div>
      
              <div className="pricing-btn">
                <Link
                  className="edu-btn btn-border btn-medium"
                  to={`/member/admin/package/${id}`}
                >
                  Select plan<i className="icon-east"></i>
                </Link>
              </div>
            </div>
          </div>
    );
};

export default PricingTable;