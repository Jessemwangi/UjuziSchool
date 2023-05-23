import React from "react";
import { Container, Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { FastRewind } from "@mui/icons-material";
import { FastForwardSharp } from "@mui/icons-material";
import { PlayArrowSharp } from "@mui/icons-material";

import Typography from "./Typography";
import VideoBottom from "./VideoBottom";

const styles = {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 2,
    background: "rgba(0, 0, 0, 0.6)",
  },
  controls__icons: {
    color: "white",
    fontSize: 50,
    transform: "scale(0.9)",
  },
  "controls__icons:hover": {
    color: "#fff",
    transform: "scale(1)",
  },
};

const ControlIcons = () => {
  return (
    <Container sx={styles.container}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        style={{ padding: 16 }}
      >
         <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            Player
          </Typography>
        </Grid>
      </Grid>
      {/* Middle Segment */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton sx={styles.controls__icons} aria-label="reqind">
          <FastRewind fontSize="large" style={{ color: "white" }} />
        </IconButton>

        <IconButton sx={styles.controls__icons} aria-label="reqind">
          <PlayArrowSharp fontSize="large" style={{ color: "white" }} />
        </IconButton>

        <IconButton sx={styles.controls__icons} aria-label="reqind">
          <FastForwardSharp fontSize="large" style={{ color: "white" }} />
        </IconButton>
      </Grid>
        {/* Bottom Segment */}
        {/* <VideoBottom/> */}
    </Container>
  );
};

export default ControlIcons;
