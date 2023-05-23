import { Container, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./Single_Video.scss";
import ControlIcons from "../modules/components/videoC/ControlIcons";
import Controls from "../modules/components/videoC/Controls";

const AppSingleVideo = () => {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    mute: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef()

  const { playing, mute, volume, playerbackRate, played, seeking} = playerstate;

  const handlePlayAndPause = () => {
    setPlayerState({
      ...playerstate, 
      playing: !playerstate.playing
    })
}

const handleRewind = () => {
  playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, `seconds`)
}

const handleFastForward = () => {
  playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30, `seconds`)
}

const handlePlayerProgress = (state) => {

  console.log('onProgress', state);
    if (!playerstate.seeking) {
      setPlayerState({...playerstate, ...state})
    }
    console.log('afterProgress', state);

}

const handlePlayerSeek = (newValue) => {
  setPlayerState({...playerstate, played: parseFloat(newValue/100)});
  playerRef.current.seekTo(parseFloat(newValue / 100));
}

const handlePlayerMouseSeekUp = (newValue) => {
  setPlayerState({...playerstate, seeking: false});
  playerRef.current.seekTo(newValue / 100);
}


  return (
    <Container sx={{ my: 8, display: "flex" }}>
      <Grid container spacing={5}>
        <Container maxWidth="md" className="singleVideoContainer">
          <div className="playerDiv">
            <ReactPlayer
              width={"100%"}
              height="50vh"
              playing={playing}
              muted={mute}
              ref={playerRef}
              controls={true}
              onProgress={handlePlayerProgress}
              url="https://youtu.be/JKvQTCRLTHY"
            />
            <ControlIcons playandpause={handlePlayAndPause}
             playing={playing}
             rewind={handleRewind}
             fastForward={handleFastForward}
             played={played}
             onSeekMouseUp={handlePlayerMouseSeekUp}
             onSeek={handlePlayerSeek} 
              />
            {/* <Controls/> */}
          </div>
        </Container>
      </Grid>
    </Container>
  );
};

export default AppSingleVideo;
