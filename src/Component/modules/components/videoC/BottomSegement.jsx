import React from "react";
import Typography from "../Typography";
import { PrettoSlider } from "../PrettoSlider";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { VolumeUp } from "@mui/icons-material";
import { Fullscreen } from "@mui/icons-material";
import { PlayArrowSharp } from "@mui/icons-material";
import { PauseSharp } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { VolumeOff } from "@mui/icons-material";
import Popover from '@mui/material/Popover';

const BottomSegement = ({
  handlePlayAndPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
  playedTime,
  fullMovieTime,
  muting,
  muted,
  volumeChange,
  volumeSeek,
  handlePopOver,
  playerbackRate,
  playRate,
      id,
    open,
    anchorEl,
    handleClose,
    fullScreenMode,
}) => {
  const style = {
    bottom__icons: {
      color: "#999",
    },

    "bottom__icons:hover": {
      color: "white",
    },
    volume__slider: {
      width: "100px",
      marginTop: "-50px",
      marginLeft: "130px",
    },
  };
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            {"Series parallel-combination simulation"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100}
            defaultValue={20}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
          />

          <Grid container direction="row" justifyContent="space-between">
            <Typography variant="h7" style={{ color: "white" }}>
              {playedTime}
            </Typography>
            <Typography variant="h7" style={{ color: "white" }}>
              {fullMovieTime}
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton
              sx={style.bottom__icons}
              aria-label="reqind"
              onClick={handlePlayAndPause}
            >
              {playing ? (
                <PauseSharp fontSize="large" style={{ color: "white" }} />
              ) : (
                <PlayArrowSharp fontSize="large" style={{ color: "white" }} />
              )}
            </IconButton>

            <IconButton
              sx={style.bottom__icons}
              aria-label="reqind"
              onClick={muting}
            >
              {muted ? (
                <VolumeOff fontSize="large" style={{ color: "white" }} />
              ) : (
                <VolumeUp fontSize="large" style={{ color: "white" }} />
              )}
            </IconButton>

            <Typography style={{ color: "#fff", paddingTop: "5px" }}>
              40
            </Typography>
            <Slider
              min={0}
              max={100}
              defaultValue={100}
              sx={style.volume__slider}
              onChange={volumeChange}
              onChangeCommitted={volumeSeek}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Button variant="text" className="bottom__icons" onClick={handlePopOver}>
            
          <Typography>{playerbackRate}X</Typography>
          </Button>

          <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    handleClose={handleClose}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
   }}>
        <Grid container direction='column-reverse'>
                 {
                      [0.5,1,1.5,2].map((rate) => (
                           <Button variant='text' onClick={() => playRate(rate)}>
                               <Typography color={rate === playerbackRate ? 'secondary' : 'default'}>{rate}</Typography>
                           </Button>
                      ))
               }
       </Grid>
</Popover>

          <IconButton className="bottom__icons" onClick={fullScreenMode}>
            <Fullscreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomSegement;
