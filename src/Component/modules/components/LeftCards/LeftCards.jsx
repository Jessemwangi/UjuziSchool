import React, { Fragment, useRef, useState } from "react";
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
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { backend } from "../../../../UtilitiesFunctions/Function";
import moment from "moment/moment";
const desiredDuration = 10;

const VideoCard = ({title,desc,videoUrl,id}) => {
const video = {title,desc,videoUrl,id}
  const videoRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const navigate = useNavigate();
  const videoShare = (url) => {
    alert(`Not allowed to share !!!${videoUrl.name}`);
  };

  const moreOptions = () => {
    alert("Hold it we will impliment it !!!");
  };

  const handlePlay = (e) => {
    setIsPlay(true);
  };

  const handleStop = () => {
    setIsPlay(false);
  };

  const handleVideoDuration = (duration) => {
    setVideoDuration(duration);
  };

  const viewVideo = (e, id) => {
e.preventDefault();
    navigate(`/singlevideo/${id}`, {state:{video}});
  };

  return (
    <Fragment>
     
        <Card sx={{ maxWidth: 345, height:400 }} key={id}>
          <CardHeader sx={{height:100}}
            avatar={
              <Avatar sx={{ bgcolor: red[500], textTransform:'uppercase' }} aria-label="Video">
               { title.substring(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={moreOptions}>
                <MoreVertIcon />
              </IconButton>
            }
            title={`${title.substring(0, 50)} ${title.length > 50 ? '...' : ''}`}
            subheader={`published: ${moment(videoUrl.updatedAt).fromNow()}`}
          />
          <div onMouseOver={(e) => handlePlay(e)} onMouseLeave={handleStop}>
            {/* videoRef.current?.play() */}
            <ReactPlayer
              ref={videoRef}
              // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
              url={`${backend}${videoUrl.url}`}
              height="100%"
              width="100%"
              controls={false}
              playing={isPlay}
              muted={true}
              loop={true}
              playbackRate={Math.round(videoDuration) / desiredDuration}
              onDuration={handleVideoDuration}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload", // Optional: Hide download button
                  },
                },
              }}
            />
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`${desc.substring(0,100)} ...`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Watch" onClick={(e) => viewVideo(e,id)}>
              <PlayCircleFilledOutlinedIcon />
            </IconButton>
            <IconButton aria-label="save" onClick={() => videoShare(videoUrl.url)}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
    
    </Fragment>
  );
};

export default VideoCard;
