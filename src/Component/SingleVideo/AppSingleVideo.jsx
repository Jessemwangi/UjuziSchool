import { Container } from "@mui/material";
import React, { useRef, useState, useCallback, useEffect } from "react";
import screenfull from 'screenfull';
import ReactPlayer from "react-player";
import "./Single_Video.scss";
import ControlIcons from "../modules/components/videoC/ControlIcons";
import { formatHours } from "../../UtilitiesFunctions/Function";

const AppSingleVideo = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [playerbackRate, setPlayerbackRate] = useState(1.0);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimerRef = useRef(null);

  const handleTogglePlaying = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  const hideControlsAfterDelay = useCallback(() => {
    setShowControls(false);
  }, []);

  const handlePlayerTap = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(hideControlsAfterDelay, 5000);
  }, [hideControlsAfterDelay]);

  const handleToggleMuted = useCallback(() => {
    setMuted((prevMuted) => !prevMuted);
  }, []);

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30);
  };

  const handleVolumeChange = useCallback((event, newValue) => {
    setVolume(parseFloat(newValue / 100));
    setMuted(newValue === 0);
  }, []);

  const handleFullScreenMode = useCallback(() => {
    screenfull.toggle(playerDivRef.current);
  }, []);

  const handlePlayerProgress = useCallback((state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  }, [seeking]);

  const handlePlayerSeek = useCallback((e, newValue) => {
    setPlayed(parseFloat(newValue / 100));
    playerRef.current.seekTo(parseFloat(newValue / 100));
  }, []);

  const handlePlayerMouseSeekDown = useCallback(() => {
    setSeeking(true);
  }, []);

  const handlePlayerMouseSeekUp = useCallback((e, newValue) => {
    setSeeking(false);
    playerRef.current.seekTo(newValue / 100);
  }, []);

  const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : 0;
  const movieDuration = playerRef.current ? playerRef.current.getDuration() : 0;
  const playedTime = formatHours(currentPlayerTime);
  const fullMovieTime = formatHours(movieDuration);

  useEffect(() => {
    hideControlsTimerRef.current = setTimeout(hideControlsAfterDelay, 5000);

    return () => {
      clearTimeout(hideControlsTimerRef.current);
    };
  }, [hideControlsAfterDelay]);

  return (
    <Container maxWidth="md">

              <div className='playerDiv' ref={playerDivRef}>
        <ReactPlayer
          width={'100%'}
          height={screenfull.isFullscreen ? '100%' : '50vh'}
          ref={playerRef} 
          // url={videoUrl}
          url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          playing={playing}
          volume={volume} 
          playbackRate={playerbackRate}
          onProgress={handlePlayerProgress}
          muted={muted}
          onClick={handlePlayerTap}
          onTouchEnd={handlePlayerTap}
        />
        { showControls && < ControlIcons
        
         onPlayerTap={handlePlayerTap}
          key={volume.toString()}
          playandpause={handleTogglePlaying}
          playing={playing}
          rewind={handleRewind}
          fastForward={handleFastForward}
          muting={handleToggleMuted}
          muted={muted}
          volumeChange={handleVolumeChange}
          // volumeSeek={handleVolumeChange} // You can reuse the same function for both
          volume={volume}
          playerbackRate={playerbackRate}
          playRate={(rate) => setPlayerbackRate(rate)}
          fullScreenMode={handleFullScreenMode}
          played={played}
          onSeek={handlePlayerSeek}  
          onSeekMouseUp={handlePlayerMouseSeekUp}
          onSeekMouseDown={handlePlayerMouseSeekDown}
          playedTime={playedTime}
          fullMovieTime={fullMovieTime}
          seeking={seeking}
          setIsDragging = {setIsDragging}
          isDragging = {isDragging}
        /> }
      </div>
    </Container>
  );
};

export default AppSingleVideo;
