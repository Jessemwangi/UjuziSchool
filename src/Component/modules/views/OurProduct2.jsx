import { Box, Container, Grid } from "@mui/material";
import React from "react";
import img1 from "../../../static/assets/productHowItWorks1.svg";
import "../../../pages/AboutUs_Old/AboutUs.scss";

const OurProduct2 = () => {
  return (
    <Container sx={{ display: "flex" }} className="ourProduct2">

      <Grid xs={2} className="productGrid">
        <Box className="imgContainer">
          <Box component={"img"} src={img1} alt="one" className="img" />
        </Box>
        <span
          style={{
            width: "50%",
            marginTop: "3px",
            height: 4,
            background: "purple",
          }}
        ></span>

        <p>
        We enable experiential learning of STEM by combining theory,
         simulation, practical demonstration, project learning, and gamification
        </p>
      </Grid>

      <Grid xs={2} className="productGrid">
        <Box className="imgContainer">
          <Box component={"img"} src={img1} alt="one" className="img" />
        </Box>
        <span
          style={{
            width: "50%",
            marginTop: "3px",
            height: 4,
            background: "purple",
          }}
        ></span>

        <p>
        We focus on applicability of STEM to enable students to connect theoretical 
        concepts learned in STEM subjects like physics with real-world applications.
        </p>
      </Grid>

      <Grid xs={2} className="productGrid">
        <Box className="imgContainer">
          <Box component={"img"} src={img1} alt="one" className="img" />
        </Box>
        <span
          style={{
            width: "50%",
            marginTop: "3px",
            height: 4,
            background: "purple",
          }}
        ></span>

        <p>
        We concentrate on practical understanding to invoke curiosity, interest, and engagement 
        in STEM education to inspire students to pursue STEM-related careers.
        </p>
      </Grid>

      <Grid xs={2} className="productGrid">
        <Box className="imgContainer">
          <Box component={"img"} src={img1} alt="one" className="img" />
        </Box>
        <span
          style={{
            width: "50%",
            marginTop: "3px",
            height: 4,
            background: "purple",
          }}
        ></span>

        <p>
        Our teaching methods emphasize hands-on skills to prepare students for future STEM-related opportunities.
        </p>
      </Grid>

      
    </Container>
  );
};

export default OurProduct2;
