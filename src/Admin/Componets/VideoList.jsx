import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const VideoList = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <Card key={video.id}>
          <CardMedia component="img" image={video.thumbnail} alt={video.title} />
          <CardContent>
            <Typography variant="h6">{video.title}</Typography>
            {/* Display other information here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VideoList;