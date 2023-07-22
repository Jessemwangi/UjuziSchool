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
import Popover from "@mui/material/Popover";
import Tooltip from '@mui/material/Tooltip';

const BottomSegement = ({
  handlePlayAndPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
  onSeekMouseDown,
  playedTime,
  fullMovieTime,
  muting,
  muted,
  volume,
  volumeChange,
  volumeSeek,
  playerbackRate,
  playRate,
  fullScreenMode,
  setIsDragging,
  isDragging,
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleVolumeChange = (event, newValue) => {
    volumeChange(event, newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;

  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
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
            onMouseDown={onSeekMouseDown} 
            onChangeCommitted={onSeekMouseUp}
            valueLabelDisplay="auto"
                  // aria-label="custom thumb label"
                  components={{
                    ValueLabel: ValueLabelComponent,
                  }}
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
              {Math.round(volume * 100)}
            </Typography>
            <Slider
              min={0}
              max={100}
              value={isDragging ? volume * 100 : volume * 100} // Use isDragging to determine the value
              sx={style.volume__slider}
              onChange={handleVolumeChange} // Use the updated volumeChange function
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant="text"
            sx={style.bottom__icons}
            onClick={handlePopOver}
          >
            <Typography>{playerbackRate}X</Typography>
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button key={rate} variant="text" onClick={() => playRate(rate)}>
                  <Typography
                    color={rate === playerbackRate ? "secondary" : "default"}
                  >
                    {rate}
                  </Typography>
                </Button>
              ))}
            </Grid>
          </Popover>

          <IconButton sx={style.bottom__icons} onClick={fullScreenMode}>
            <Fullscreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomSegement;
