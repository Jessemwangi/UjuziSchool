import React, { useState } from "react";
import "./Category.scss";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import withRoot from "../../Component/modules/withRoot";
import { Box, Grid } from "@mui/material";
import Typography from "../../Component/modules/components/Typography";
import LeftCards from "../../Component/modules/components/LeftCards/LeftCards";
import { useParams } from "react-router-dom";
// import { data } from "../../data";
import SearchBar from "../../Component/SearchBar";
import { data } from "../../Data/data";

const SingleVideo = (props = { title: "jesse" }) => {
  const id = parseInt(useParams().id);
  const [searchQuery, setSearchQuery] = useState()

  const CatVideos = data.categories.filter((catvideo) => (catvideo.id = id));
  const [maxPlay, setMaxPlay] = useState(1000);
  const [sort, setSort] = useState();
  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <div className="category">
        <div className="left">
          <Grid
            sx={{
              mt: 7,
              mb: 12,
              display: "flex",
              flexDirection: "column",
              gap: "50px",
            }}
          >
            <Grid container xs={12}>
                <Grid item xs={3}>
                <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", width: "130px" }}
            >
              {CatVideos[0].title}
            </Typography>
                </Grid>
                <Grid item xs={9}  sx={{width:"100%"}}>
              <SearchBar setSearchQuery ={setSearchQuery}/>
                </Grid>
              </Grid>
           
            <div className="header__section">
            
                <p>{props.title}</p>

             
            </div>
            <div className="introVideo">
              <AppSingleVideo
                videoUrl={CatVideos[0].introVideo}
                key={CatVideos[0].id}
              />
            </div>
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
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                xs={12}
              >
                {CatVideos[0].subcategories.map((subCat) => (
                  <>
                    {subCat?.videos.map((video) => (
                      <Grid
                        item
                        xs={4}
                        key={subCat.id}
                        sx={{ height: "400px", mt: 3 }}
                      >
                        <LeftCards
                          title={video.title}
                          desc={video.description}
                          url={video.url}
                          id={video.id}
                          key={video.id}
                        />
                      </Grid>
                    ))}
                  </>
                ))}
              </Grid>
            </Box>
          </Grid>
        </div>

        <div className="right">
          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="left"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              Filter Options
            </Typography>
          </div>
          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check">theories</label>
          </div>
          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check">practicals</label>
          </div>
          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check">advanced</label>
          </div>
          <div className="filterItem">
            <input type="checkbox" id="check" value={1} />
            <label htmlFor="check">most viewed</label>
          </div>
          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              filter by min
            </Typography>
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPlay(e.target.value)}
            />
            <span>1000</span>
          </div>
          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              movies sort
            </Typography>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                name="price"
                value="asc"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">shortest</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value={"desc"}
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">longest</label>
            </div>
          </div>

          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              Date produced
            </Typography>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                name="price"
                value="asc"
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="asc">latest</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value={"desc"}
                name="price"
                onChange={(e) => setSort("desc")}
              />
              <label htmlFor="desc">oldest</label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRoot(SingleVideo);
