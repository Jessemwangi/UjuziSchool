import React, { useEffect, useState } from "react";
import "./Category.scss";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import withRoot from "../../Component/modules/withRoot";
import { Box, Grid } from "@mui/material";
import Typography from "../../Component/modules/components/Typography";
import LeftCards from "../../Component/modules/components/LeftCards/LeftCards";
import { useParams } from "react-router-dom";
import SearchBar from "../../Component/SearchBar";
import { useUser } from "../../hooks/UserContext";
import MessageInfo from "../../Component/modules/components/MessageInfo";
import { useFetch } from "../../hooks/useFetch";



const SingleCategory = (props = { title: "jesse" }) => {
  const { user } = useUser();
  const id = parseInt(useParams().id);
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setIsLoading] = useState(true);
  const [catVideos, setCatVideos] = useState();
  const [err,setErr] =useState('')
  const [subCategories, setSubCategories] = useState();
  const [units, setUnits] = useState();
  const [games, setGame] = useState();
  const [exam, setExam] = useState();
  const [simulation, setSimulation] = useState();
  const [category, setCategory] = useState();
  const freeVideos =
    "?populate[subscription_packages][filters][name][$eq]=FreeVideo&populate[subscription_packages][populate]=videos.videoUrl&populate=pic&populate[topics]=*&populate[course_subcategories]=*&populate[questions]=*";
  // const userVideos = `?populate=*&filters[user]=${user?.id}`;
  const { data, loading:isloading, error }  =useFetch(`/coursecategories/${id}/${freeVideos}`)
  useEffect(() => {

    if (error) {
      setErr(error?.response?.data?.error?.message);
      setIsLoading(false); 
    }
    
    if (!error && isloading) {
      setIsLoading(true);
    }
  
    if (!error && !isloading) {
      setErr();
      setIsLoading(false);
    }
    if (data?.length > 0) {
      setCategory(data);
      const  rawUnsortedVideo = (
        data?.attributes?.subscription_packages?.data.map(
          (freeVideos) => freeVideos?.attributes?.videos?.data
        )
      );
      setCatVideos(async ()=> await vvideo(rawUnsortedVideo))
      setExam(data?.attributes?.questions?.data.length);
      setGame(data?.attributes?.questions?.data.length);
      setSimulation(data?.attributes?.simulations?.data.length);
      setUnits(async () =>await vvideo(data?.attributes?.topics?.data));
      setSubCategories(
        data?.attributes?.course_subcategories?.data.length
      );
    }
  
  }, [data, error, isloading]);

  
  const vvideo = async (rawVideo) => {
    if (!rawVideo) return []; // Return an empty array if rawVideo is null or undefined
    
    // Flatten the two-level nested array
    const flattenedVideo = rawVideo.flat();
    setIsLoading(true)
    const attribVideo = await Promise.all(flattenedVideo.map(async (video) => {
      const { id, attributes } = video;
     
      const {
        createdAt,
        updatedAt,
        title,
        description,
      } = attributes;
  
      const videoUrl = attributes.videoUrl?.data?.attributes        ;
  
      return {
        id,
        createdAt,
        updatedAt,
        title,
        description,
        videoUrl,
      };
    }));
  setIsLoading(false)
    return attribVideo;
  };

  // const [maxPlay, setMaxPlay] = useState(1000);
  const [sort, setSort] = useState();
  if (loading) return <MessageInfo message={'fetch data'} show={false}/>
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
                  {category?.attributes?.title}
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ width: "100%" }}>
                <SearchBar setSearchQuery={setSearchQuery} />
              </Grid>
            </Grid>
            <div className="header__section">
              <p>{category?.attributes?.title}</p>
            </div>
            {category?.attributes?.title}{" "}
            <div className="introVideo">
              {category?.attributes?.introVideo ? (
                <AppSingleVideo
                  videoUrl={category?.attributes?.introVideo}
                  key={category?.attributes?.id}
                />
              ) : (
                <Box
                  component="img"
                  src={category?.attributes?.pic?.data?.attributes?.url}
                  alt={category?.attributes?.title}
                />
              )}
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
         
           {catVideos?.length > 0 ? (
  searchQuery ? 
  (
    catVideos
      .filter(
        (item) =>
          item?.attributes?.title?.includes(searchQuery) ||
          item?.attributes?.description?.includes(searchQuery)
      )
      .map(({   createdAt,
        updatedAt,
        title,
        description,
        videoUrl, }) => (
        <Grid item xs={4} key={id} sx={{ height: "400px", mt: 3 }}>
         
          <LeftCards
            title={title}
            desc={description}
            videoUrl ={videoUrl} // Access the video URL
            id={id}
            key={id}
          />
        </Grid>
      ))
  ) 
  : 
  (
    catVideos.map(({      id,
      createdAt,
      updatedAt,
      title,
      description,
      videoUrl, }) => (
      <Grid item xs={4} key={id} sx={{ height: "400px", mt: 3 }}>
        <LeftCards
          title={title}
          desc={description}
          videoUrl={videoUrl} // Access the video URL
          id={id}

          key={id}
        />
      </Grid>
    ))
  )
) :
 (
  <p><MessageInfo message="Sorry we did not find any free to watch material in this category" show={false}/> </p>
)}

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
              have premium account<br/>
              access
            </Typography>

          </div>
          {
            units && units?.map(unit =>
             <>
            <div className="filterItem">
            <input type="checkbox" id="check" checked={true} />
            <label htmlFor="check">{unit.title}</label>
          </div>
            </>
              )
          }
     

          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              games
            </Typography>
            <span>{games}</span>
            <input
              type="range"
              min={0}
              max={games}
              value={games}
            />
            <span>{games}</span>
          </div>
          <div className="filterItem">
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="left"
              sx={{ color: "#BA68C8", fontSize: "16px", width: "140px" }}
            >
              simulations
            </Typography>
            <div className="inputItem">
              <input
                type="radio"
                value={simulation}
                checked={true}
              />
              <label htmlFor="asc">{simulation}</label>
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

export default withRoot(SingleCategory);
