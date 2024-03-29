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
    // background: "rgba(0, 0, 0, 0.6)",
  },
};

const ControlIcons = ({
  playandpause,
  playing,
  rewind,
  fastForward,
  muting,
  muted,
  volumeChange,
  volumeSeek,
  volume,
  playRate,
  fullScreenMode,
  onSeek,
  played,
  onSeekMouseUp,
  onSeekMouseDown,
  fullMovieTime,
  playedTime,
  handlePopOver,
  playerbackRate,
  setIsDragging,
  isDragging ,
}) => {
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

      <MiddleSegment
        handlePlayAndPause={playandpause}
        playing={playing}
        fastForward={fastForward}
        rewind={rewind}
      />

      <BottomSegement
        handlePlayAndPause={playandpause}
        playing={playing}
        played={played}
        onSeek={onSeek}
        onSeekMouseUp={onSeekMouseUp}
        onSeekMouseDown = {onSeekMouseDown}
        playedTime={playedTime}
        fullMovieTime={fullMovieTime}
        muting ={muting}
        muted ={muted}
        volumeChange ={volumeChange}
        volume={ volume}
        volumeSeek={volumeSeek}
        handlePopOver={handlePopOver}
        playerbackRate={playerbackRate}
        playRate={playRate}
        fullScreenMode ={fullScreenMode}
        setIsDragging = {setIsDragging}
        isDragging = {isDragging}
      />
    </Container>
  );
};

export default ControlIcons;
