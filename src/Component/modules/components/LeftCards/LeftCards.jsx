import React, {  Fragment, useRef, useState } from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
const desiredDuration = 10;

const LeftCards = ({videos}) => {
  const videoRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0);
  const navigate = useNavigate()

    const videoShare = () => {
        alert("Not allowed to share !!!");
      };
    
      const moreOptions = () => {
        alert("Hold it we will impliment it !!!");
      };

      const handlePlay =(e) => {
        setIsPlay(true)
      }

     const handleStop =() =>{
      setIsPlay(false)
     }
   
     const handleVideoDuration = (duration) => {
       setVideoDuration(duration);
     };

     const viewVideo = (id) => {
navigate(`/singlevideo/${id}`)
      
     }

    return (
      <Fragment>
        {
          videos.map(video => 
            <Card sx={{ maxWidth: 345 }} key={video.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="Video">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={moreOptions}>
                  <MoreVertIcon />
                </IconButton>
              }
            title={video.title}
              subheader="September 14, 2016"
            />
  <div onMouseOver={(e) => handlePlay(e)} onMouseLeave={handleStop}> 
  {/* videoRef.current?.play() */}
        <ReactPlayer
          ref={videoRef}
          // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          url={video.url}
          height="100%"
          width='100%'
          controls={false}
          playing={isPlay}
          muted={true}
        loop={true}
        playbackRate={ Math.round(videoDuration) / desiredDuration}
        onDuration={handleVideoDuration}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload' // Optional: Hide download button
            }
          }
        }}
        />
      </div>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
               {video.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Watch" onClick={() =>viewVideo(1)}>
                <PlayCircleFilledOutlinedIcon />
              </IconButton>
              <IconButton aria-label="save" onClick={videoShare}>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
            )
        }

      </Fragment>
      );
};

export default LeftCards;