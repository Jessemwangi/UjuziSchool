import React from "react";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { FastRewind } from "@mui/icons-material";
import { FastForwardSharp } from "@mui/icons-material";
import { PlayArrowSharp } from "@mui/icons-material";
import { PauseSharp } from "@mui/icons-material";

const MiddleSegment = ({ handlePlayAndPause, playing, fastForward, rewind }) => {
  const styles = {
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
  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <IconButton sx={styles.controls__icons} aria-label="reqind">
        <FastRewind fontSize="large" style={{ color: "white" }} onClick={rewind} />
      </IconButton>

      <IconButton
        sx={styles.controls__icons}
        aria-label="reqind"
        onClick={handlePlayAndPause}
      >
        {playing ? (
          <PauseSharp fontSize="large" style={{ color: "white" }} />
        ) : (
          <PlayArrowSharp fontSize="large" style={{ color: "white" }} />
        )}
      </IconButton>

      <IconButton sx={styles.controls__icons} aria-label="reqind">
        <FastForwardSharp fontSize="large" style={{ color: "white" }} onClick={fastForward} />
      </IconButton>
    </Grid>
  );
};

export default MiddleSegment;
