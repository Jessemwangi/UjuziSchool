import React from "react";
import "./Videos.scss";
import LeftCards from "../../Component/modules/components/LeftCards/LeftCards";
import Typography from "../../Component/modules/components/Typography";
import { Grid } from "@mui/material";
import { data } from "../../Data/data";

const Videos = () => {
  const videos = data;
  return (
    <div className="displayCartegory">
      {videos.categories.map((cat) => (
        <div key={cat.id}>
          <Typography marked="center" variant="h4" component="span">
            {cat.title}
          </Typography>
          {cat.subcategories.map((subcat) => (
            <div key={subcat.id}>
              <Typography marked="center" variant="h4" component="span">
                {subcat.title}
              </Typography>
              
                <Grid
                  sx={{
                    mt: 7,
                    mb: 12,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:'center',
                    flexWrap: "wrap",
                    flexGrow: "auto",
                    margin: '0 auto',
                    gap:'50px',
                  }}
                  
                >
                    {subcat.videos.map((video) => (
                  <LeftCards
                  key={video.id}
                  url={video.url}
                    title ={video.title}
                    desc ={video.description}
                    id={video.id}
                  />
                  ))}
                </Grid>
            
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Videos;
