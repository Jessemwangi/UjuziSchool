import React, { useEffect, useState } from "react";
import AdminMain from "./AdminMain";
import { useUser } from "../hooks/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Container, Grid } from "@mui/material";
import MainMenu from "./Menu/MainMenu";
import './admin.scss'

const Dashboard = () => {
  const navigate = useNavigate()
  const {user,ctxLoading} = useUser();
  const [userVideos, setUserVideo]  = useState()
  const [units,setUnits] = useState()
  

  useEffect(() => {
    if (ctxLoading === false) {
      if(!user){
        navigate('/sign-in')
      }
    }
  }, [ctxLoading, navigate, user]);


  return (
    <HelmetProvider>
      <Container maxWidth={false} disableGutters sx={{marginTop:'2rem'}} className="dashboard">
        <Grid container>
          <Grid item md={3} lg={2}>
            <MainMenu user={user} />
          </Grid>
          <Grid item md={9} lg={10}>
          <Outlet/>
          </Grid>
        </Grid>
      </Container>
    </HelmetProvider>
  );
};

export default Dashboard;
