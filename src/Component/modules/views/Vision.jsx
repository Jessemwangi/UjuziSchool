import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import mission from "../../../static/assets/mission.png";
import vission from "../../../static/assets/vission.png";
import curvy from "../../../static/assets/productCurvyLines.png";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

const VisionMission = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "white", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Ujuzi Mission and Vision
        </Typography>

        <Grid
          container
          spacing={5}
          sx={{ display: "flex", flexDirection: "row",justifyContent:'space-around' }}
          xs={12}
        >
          <Grid item xs={12} md={6}>
            <Box sx={item}>
              <Box sx={number}>Mission</Box>
              <Box component="img" src={mission} alt="suitcase" sx={image} />
              <Typography variant="h5" align="center">
                Develop resources, technologies, and platforms that enhance
                technology sharing to facilitate practical skills development
                for young Africans
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={item}>
              <Box sx={number}>Vission</Box>
              <Box
                component="img"
                src={vission}
                // ../../../static/assets/productHowItWorks2.svg
                alt="graph"
                sx={image}
              />
              <Typography variant="h5" align="center">
                To Enhance the participation of African youth in innovation and
                problem-solving within the continent
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionMission;
