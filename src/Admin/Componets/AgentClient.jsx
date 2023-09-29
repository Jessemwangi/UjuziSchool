import React, { useEffect, useState } from "react";
import { get_Data } from "../../UtilitiesFunctions/Function";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import "./agentsClient.css";
import playIcon from '../../static/assets/playICon.svg'
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";

const AgentClient = ({ id }) => {
  const [client, setClient] = useState();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      const getClient = async () => {
        setIsLoading(true);
        const response = await get_Data(`/users/${id}?populate=*`);
        console.log(response);
        setClient(response);
      };
      getClient();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  if (loading) return <LinearProgress color="secondary" />;
  return (
    <div>
      <div className="card" key={client.id}>
        <figure className="card__thumb">
          <div className="toptop">
            <img
              className="flag"
              src={playIcon}
              alt={'play video'}
            />
          </div>
          <div
            alt="chef"
            className="card__image"
          >
            <AppSingleVideo videoUrl={''}/>
            </div>
          <figcaption className="card__caption">
            <h2 className="card__title">🥘 {client.name}</h2>
            <small>By</small>
            <h3 className="card__title">👨‍🍳 {client.author}</h3>
            <p className="card__snippet">
              Total ingredients : <b>{client?.ingredients.length || 0}</b>
              <br />
              Steps: <b>{client.steps?.length || ""}</b> <br />
              <span className="emojis">⏱️</span> Time :
              <b>{client.steps.reduce((a, b) => a + parseInt(b.timers), 0)}</b>
            </p>
            <p>
              {" "}
              <img
                className="p_Flag"
                src={client.country.flagUrl}
                alt="india"
              />
              <br />
              {client.country.name.toUpperCase()}
            </p>
            <Link to={`/viewclient/${client.id}`} className="card__button">
              More Details
            </Link>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default AgentClient;
