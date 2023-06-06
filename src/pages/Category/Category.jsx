import React, { useState } from "react";
import "./Category.scss";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import withRoot from "../../Component/modules/withRoot";
import { Grid } from "@mui/material";
import Typography from "../../Component/modules/components/Typography";
import VideoLeft from "../../Component/modules/views/VideoLeft/VideoLeft";
import LeftCards from "../../Component/modules/components/LeftCards/LeftCards";
import { useParams } from "react-router-dom";
import { data } from "../../data";

const SingleVideo = (props = { title: "jesse" }) => {
  const id = parseInt(useParams().id)

  const CatVideos = data.categories.filter(catvideo => catvideo.id =id)
  console.log(CatVideos)
  const [maxPlay, setMaxPlay] =useState(1000)
  const [sort, setSort] =useState()
  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <div className="category">
        <div className="left">
          <Grid sx={{ mt: 7, mb: 12 }}>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", width: "130px" }}
            >
              {CatVideos[0].title}
            </Typography>
            <div className="header__section">
              <p>{props.title}</p>
            </div>
            <AppSingleVideo videoUrl ={CatVideos[0].introVideo} />
            <div className="videoInCategory">
              <Typography
                variant="h3"
                gutterBottom
                marked="center"
                align="center"
                sx={{ color: "#BA68C8", fontSize: "16px", width: "220px" }}
              >
                Videos in category
              </Typography>
            </div>
            <div className="displayCartegory">
              {
                CatVideos[0].subcategories.map(subCat => 
                  <>
                    <LeftCards videos={subCat?.videos} key={subCat.id} />
                  </>
                  )
              }
            

            </div>
          </Grid>
        </div>

        <div className="right">
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="left"
            sx={{ color: "#BA68C8", fontSize: "16px",width:'140px' }}
          >
            Filter Options
          </Typography>
          

          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >theories</label>
          </div>
          <div className="filterItem">
            
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >practicals</label>
          </div>
          <div className="filterItem">
            
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >advanced</label>
          </div>
          <div className="filterItem">
            
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check" >most viewed</label>
          </div>
          <div className="filterItem">
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="left"
            sx={{ color: "#BA68C8", fontSize: "16px",width:'140px' }}
          >filter by min</Typography>
            <span>0</span>
            <input type="range" min={0} max={1000} onChange={(e) => setMaxPlay(e.target.value)}/>
            <span>1000</span>
          </div>
          <div className="filterItem">
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="left"
            sx={{ color: "#BA68C8", fontSize: "16px",width:'140px' }}
          >movies sort</Typography>
            <div className="inputItem">

            <input type="radio" id="asc" name="price" value="asc" onChange={(e) => setSort('asc')} />
            <label htmlFor="asc">shortest</label>
            </div>
            <div className="inputItem">
            <input type="radio" id="asc" value={'desc'} name="price" onChange={(e) => setSort('desc')} />
            <label htmlFor="desc">longest</label>
              </div>
          </div>


          <div className="filterItem">
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="left"
            sx={{ color: "#BA68C8", fontSize: "16px",width:'140px' }}
          >Date produced</Typography>
            <div className="inputItem">

            <input type="radio" id="asc" name="price" value="asc" onChange={(e) => setSort('asc')} />
            <label htmlFor="asc">latest</label>
            </div>
            <div className="inputItem">
            <input type="radio" id="asc" value={'desc'} name="price" onChange={(e) => setSort('desc')} />
            <label htmlFor="desc">oldest</label>
              </div>
          </div>

        </div>
        </div>
     
  
    </React.Fragment>
  );
};

export default withRoot(SingleVideo);
