import { Container, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import screenfull from 'screenfull';
import ReactPlayer from "react-player";
import "./Single_Video.scss";
import ControlIcons from "../modules/components/videoC/ControlIcons";
import { formatHours } from "../../UtilitiesFunctions/Function";

const AppSingleVideo = () => {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    mute: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef();
  const playerDivRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { playing, mute, volume, playerbackRate, played, seeking } =
    playerstate;

  const handlePlayAndPause = () => {
    setPlayerState({
      ...playerstate,
      playing: !playerstate.playing,
    });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 10,
      `seconds`
    );
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 30,
      `seconds`
    );
  };

  const currentPlayerTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const movieDuration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const playedTime = formatHours(currentPlayerTime);
  const fullMovieTime = formatHours(movieDuration);

  const handlePlayerProgress = (state) => {
    console.log("onProgress", state);
    if (!playerstate.seeking) {
      setPlayerState({ ...playerstate, ...state });
    }
    console.log("afterProgress", state);
  };

  const handlePlayerSeek = (newValue) => {
    setPlayerState({ ...playerstate, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(parseFloat(newValue / 100));
  };

  const handlePlayerMouseSeekUp = (newValue) => {
    setPlayerState({ ...playerstate, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };
  const handleMuting = () => {
    setPlayerState({ ...playerstate, muted: !playerstate.muted });
  };

  //function for the `onChange` event
const handleVolumeChange = (e, newValue) => {
  setPlayerState({...playerstate, volume:parseFloat(newValue/100), mute:newValue === 0 ? true : false, });
}

//function for the `onChangeCommitted` event
const handleVolumeSeek = (e, newValue) => {
  setPlayerState({...playerstate, volume:parseFloat(newValue/100), mute:newValue === 0 ? true : false, });
}

const handlePlayerRate = (rate) => {
  setPlayerState({...playerstate, playerbackRate: rate});
}

const handlePopOver = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'playbackrate-popover' : undefined
 
const handleFullScreenMode = () => {
  screenfull.toggle(playerDivRef.current);
}


return (
    <div className="singleVideoContainer">
      <div className="playerDiv" ref={playerDivRef}>
        <ReactPlayer
          width={"100%"}
          height="50vh"
          playing={playing}
          muted={mute}
          ref={playerRef}
          controls={true}
          onProgress={handlePlayerProgress}
          playbackRate={playerbackRate}
          //  url="https://youtu.be/JKvQTCRLTHY"
           url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
        //  url="https://unelmacloud.com/drive/s/qQ5KFmnA3dfyynkk98MMrkDyJ4vrUk"
        />
        <ControlIcons
          playandpause={handlePlayAndPause}
          playing={playing}
          rewind={handleRewind}
          fastForward={handleFastForward}
          played={played}
          onSeekMouseUp={handlePlayerMouseSeekUp}
          onSeek={handlePlayerSeek}
          playedTime={playedTime}
          fullMovieTime={fullMovieTime}
          muting={handleMuting}
          muted={mute}
          volume={volume}
          volumeChange={handleVolumeChange}
          volumeSeek={handleVolumeSeek}
          playerbackRate={playerbackRate}
          playRate={handlePlayerRate}
          handlePopOver ={handlePopOver}
          
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          fullScreenMode={handleFullScreenMode}
        />
        {/* <Controls/> */}
      </div>
    </div>
  );
};

export default AppSingleVideo;
