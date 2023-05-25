import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link className="link" to={`/category/video/${item.id}`}>
      <div className="card">
        <div className="image">
        {item.isnew  && <span>New arrivals</span>}
            <img src={item.img} className="mainimg" alt="" />
            <img src={item.img2} className="secondImg" alt="" />
        </div>
        <h2>{item.title}</h2>
        <div className="prices">
<h3>{item.oldprice}</h3>
<h3>{
item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
