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

const BottomSegement = ({
  handlePlayAndPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
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
              00:26
            </Typography>
            <Typography variant="h7" style={{ color: "white" }}>
              12:30
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

            <IconButton sx={style.bottom__icons} aria-label="reqind">
              <VolumeUp fontSize="large" style={{ color: "white" }} />
            </IconButton>

            <Typography style={{ color: "#fff", paddingTop: "5px" }}>
              40
            </Typography>
            <Slider
              min={0}
              max={100}
              defaultValue={100}
              sx={style.volume__slider}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Button variant="text" className="bottom__icons">
            <Typography>1X</Typography>
          </Button>

          <IconButton className="bottom__icons">
            <Fullscreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomSegement;
