import { Box, Container, Grid } from "@mui/material";
import React from "react";
import img1 from "../../../static/assets/productHowItWorks1.svg";
import "../../../pages/AboutUs/AboutUs.scss";

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
          ur products UjuziP, UjuziC, UjuziB, and UjuziIT, solves challenges in
          STEM education. We bring this solution because in East Africa,
          particularly Tanzania, fewer secondary school
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
          ur products UjuziP, UjuziC, UjuziB, and UjuziIT, solves challenges in
          STEM education. We bring this solution because in East Africa,
          particularly Tanzania, fewer secondary school
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
          ur products UjuziP, UjuziC, UjuziB, and UjuziIT, solves challenges in
          STEM education. We bring this solution because in East Africa,
          particularly Tanzania, fewer secondary school
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
          ur products UjuziP, UjuziC, UjuziB, and UjuziIT, solves challenges in
          STEM education. We bring this solution because in East Africa,
          particularly Tanzania, fewer secondary school
        </p>
      </Grid>

      
    </Container>
  );
};

export default OurProduct2;
