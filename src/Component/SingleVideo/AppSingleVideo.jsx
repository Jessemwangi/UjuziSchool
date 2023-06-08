import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import screenfull from 'screenfull';
import ReactPlayer from "react-player";
import "./Single_Video.scss";
import ControlIcons from "../modules/components/videoC/ControlIcons";
import { formatHours } from "../../UtilitiesFunctions/Function";

const AppSingleVideo = ({videoUrl}) => {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playerbackRate:1.0,
    played:0,
    seeking: false,
  })


  //Destructure State in other to get the values in it
  const { playing, muted, volume, playerbackRate, played, seeking } = playerstate;
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  //This function handles play and pause onchange button
  const handlePlayAndPause = () => {
    setPlayerState({...playerstate, playing: !playerstate.playing})
  }

  const handleMuting = () => {
    setPlayerState({...playerstate, muted: !playerstate.muted})
  }

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30)
  }

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({...playerstate, volume:parseFloat(newValue/100), muted:newValue === 0 ? true : false, });
  }

  const handleVolumeSeek = (e, newValue) => {
    setPlayerState({...playerstate, volume:parseFloat(newValue/100), muted:newValue === 0 ? true : false, });
  }

  const handlePlayerRate = (rate) => {
    setPlayerState({...playerstate, playerbackRate: rate});
  }

  const handleFullScreenMode = () => {
    screenfull.toggle(playerDivRef.current)
  }

  const handlePlayerProgress = (state) => {
    // console.log('onProgress', state);
    if (!playerstate.seeking) {
      setPlayerState({...playerstate, ...state});
    }
    // console.log('afterProgress', state);
  }

  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({...playerstate, played: parseFloat(newValue / 100)});
    playerRef.current.seekTo(parseFloat(newValue / 100));
    // console.log(played)
  }

  const handlePlayerMouseSeekDown = (e) => {
    setPlayerState({...playerstate, seeking: true});
  }

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({...playerstate, seeking: false});
    playerRef.current.seekTo(newValue / 100);
  }

  const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const movieDuration =  playerRef.current ? playerRef.current.getDuration() : '00:00';
  const playedTime = formatHours(currentPlayerTime);
  const fullMovieTime = formatHours(movieDuration);


return (
<Container maxWidth="md">
        <div className='playerDiv' ref={playerDivRef}>
          <ReactPlayer width={'100%'} height='50vh'
          ref={playerRef} 
          // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          url={videoUrl}
          playing={playing}
          volume={volume} 
          playbackRate={playerbackRate}
          onProgress={handlePlayerProgress}
          muted={muted}/>
{/* <>{console.log(volume)}</> */}
          <ControlIcons
           key={volume.toString()}
           playandpause={handlePlayAndPause}
           playing={playing}
           rewind={handleRewind}
           fastForward={handleFastForward}
           muting={handleMuting}
           muted={muted}
           volumeChange={handleVolumeChange}
           volumeSeek={handleVolumeSeek}
           volume={volume}
           playerbackRate={playerbackRate}
           playRate={handlePlayerRate}
           fullScreenMode={handleFullScreenMode}
           played={played}
           onSeek={handlePlayerSeek}  
           onSeekMouseUp={handlePlayerMouseSeekUp}
           onSeekMouseDown={handlePlayerMouseSeekDown}
           playedTime={playedTime}
           fullMovieTime={fullMovieTime}
           seeking={seeking}
          />
        </div>
      </Container>
  );
};

export default AppSingleVideo;
