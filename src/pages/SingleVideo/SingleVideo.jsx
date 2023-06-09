import React from "react";
import "./SingleVideo.scss";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import { useLocation, useParams } from "react-router-dom";
import LeftCards from "../../Component/modules/components/LeftCards/LeftCards";
import Typography from "../../Component/modules/components/Typography";
import { Box, Container, Grid } from "@mui/material";
import arrow from "../../static/assets/arrow.png";
import bg2 from '../../static/assets/bg2.png'

const SingleVideo = () => {
  const location = useLocation();
  const id = useParams().id;

  const { video } = location.state;
  return (
    <div className="singleVideo">
      <Box component={'img'} 
      src={bg2} sx={{position:'absolute', 
       opacity:'0.1',
       top:'30px',
      height: 'auto',}}
      />

      <Box
        sx={{
          textAlign: "center",
          borderRadius: 0,
          height: "auto",
          py: 2,
          px: 5,
          mt: 5,
        }}
      >
        <Typography variant="h4" component="span" marked={"center"}>
          {video.title}
        </Typography>
      </Box>
      <AppSingleVideo videoUrl={video.url} key={id} />{" "}
      {/*  //to pass url and the title */}
      <Container xs={10} className="desc">
        <Grid xs={3} className="arrow">
          <Box component="img" src={arrow} alt="buoy" sx={{ width: 60 }} />
        </Grid>
        <Grid xs={7} className="description">
          <p>{video.desc}</p>
        </Grid>
      </Container>
      {/* <LeftCards/> */}
    </div>
  );
};

export default SingleVideo;
