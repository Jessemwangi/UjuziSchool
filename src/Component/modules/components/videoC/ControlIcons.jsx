import React from "react";
import { Container, Grid } from "@mui/material";

import Typography from "../Typography";
import BottomSegement from "./BottomSegement";
import MiddleSegment from "./MiddleSegment";

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
};

const ControlIcons = ({playandpause, playing, rewind, fastForward, played, onSeek, onSeekMouseUp}) => {
 
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
            Ujuzi
          </Typography>
        </Grid>
      </Grid>
      {/* Middle Segment */}
      <MiddleSegment handlePlayAndPause={playandpause}  
      playing={playing} fastForward={fastForward} rewind={rewind}/>

      {/* Bottom Segment */}
      <BottomSegement handlePlayAndPause={playandpause}  playing={playing}  played={played}/>
    </Container>
  );
};

export default ControlIcons;
