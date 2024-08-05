// get all video with user id and needs to remove remove units and replace with the current playing video description
import React, { Fragment, useEffect, useState } from "react"; 
import "../../pages/SubCategories/SubCategories.scss";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { backend, get_Data } from "../../UtilitiesFunctions/Function";
import { useUser } from "../../hooks/UserContext";
import Typography from "../../Component/modules/components/Typography";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import SystemError from "../../Component/modules/views/Error/SystemError";

const MemberVideos = () => {
  const [currentPage] = useState(1);
  const recordsPerPage = 5;
  const [playingActive, setPlayingActive] = useState({border:"none"});
  const [subcategoryVideos, setSubcategoryVideos] = useState({});
  const [isLoading,setIsLoading] =useState(false)
  const [err, setErr] =useState()


  const {user} = useUser()
  // available for non logged in, get all video then on click compare if the video are in user subscription if not return not authorized,
const filter = `populate=*&populate=course_subcategories.introVideo&populate[]=course_subcategories.videos.videoImage&populate[]=course_subcategories.videos.videoUrl&populate[]=course_subcategories.topics&populate[]=course_subcategories.questions&populate[]=course_subcategories.simulations&populate[]=course_subcategories.subscription_packages&populate[]=course_subcategories.topics.sub_units`
const userurl = `users/${user?.id}?populate=*&populate[]=agents&populate[]=agents.subscription_packages&
populate[]=agents.subscription_packages.coursecategories&populate[]=agents.subscription_packages.course_subcategories&
populate[]=agents.subscription_packages.videos.videoImage&populate[]=agents.subscription_packages.units&
populate[]=agents.subscription_packages.units.sub_units&populate[]=agents.subscription_packages.charges&
populate[]=agents.subscription_status&populate[]=agents.subscription_packages.videos.videoUrl
&filters[agents][subscription_packages][isActive]=true&
filters[agents][subscription_status][isActive]=true&
filters[agents][subscription_status][expiresOn_gte]=${new Date()}`
const start = (currentPage - 1) * recordsPerPage;
const limit = `?_limit=${recordsPerPage}&_start=${start}&`

const { data, loading, error } = useFetch(
    `/coursecategories/${limit}${filter}`
  );
  useEffect(() => {

    if (error) {
      setErr(error?.response?.data?.error?.message);
      setIsLoading(false); 
    }
    
    if (!error && loading) {
      setIsLoading(true);
    }
  
    if (!error && !loading) {
      setErr();
      setIsLoading(false);
    }
  
  }, [data, error, loading]);

  useEffect(()=>{
  
     const getuserreg = async () => {
      try {
       const {data} = await get_Data(userurl,user.jwt) 
       console.log(data)
   } catch (error) {
    console.log(error)
    setErr(error?.response?.data?.error?.message)
   }
      
        }
    getuserreg()
  },[user.jwt, userurl])    
    
  if (err)  return <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}` }/>
  
  return (
    <Fragment>
      {isLoading ? (
        <>Loading ..</>
      ) : (
        <>
          {data && 
          data?.attributes?.course_subcategories?.data.map(data =>

            <div className="subCategory" key={data.id}>
              <div className="subCatName">
              <Typography variant="h3" marked="center" align="left" component="h3">
              {data?.attributes?.title} </Typography>
              </div>
              <div className="upper">
                <div className="left">
                  <div className="images">
                    {data?.attributes?.videos?.data.map((vid, index) => (
                     
                        <img key={vid?.id} style={playingActive}
                          src={
                            `${backend}${vid?.attributes?.videoImage?.data?.attributes?.formats?.thumbnail?.url}` ||
                            `https://source.unsplash.com/600x300/?online`
                          }
                          alt=""
                          onClick={(e) => {
                            const subcategoryId = data.id; // Get the ID of the current subcategory
                            const videoUrl = `${backend}${vid?.attributes?.videoUrl?.data?.attributes?.url}`;
                            setSubcategoryVideos((prevVideos) => ({
                              ...prevVideos,
                              [subcategoryId]: videoUrl, // Store the video URL for the specific subcategory
                            }));
                            setPlayingActive({border:"solid 2px #ba68c8"})
                          }}
                        />
                     
                    ))}
                  </div>
                  <div className="mainImg">
                  <AppSingleVideo
                    videoUrl={
                      subcategoryVideos[data.id] || // Get the video URL for the specific subcategory
                      `${backend}${data?.attributes?.introVideo?.data?.attributes?.url}`
                    }
                    isplaying={false}
                    key={data?.introVideo?.data?.id}
                  />{" "}
                  </div>
                </div>

                {/* impliment the topics, questions */}
                <div className="right">
                  <h1>{"View Units in this subcategory"}</h1>
                  {data.attributes?.topics?.data.map((topic) => (
                    <div className="units" key={topic?.id}>
                      <span className="unit"> {topic?.attributes?.title} </span>
                      {topic?.attributes?.sub_units?.data.map(subUnit =>
                      <div className="subUnits" key={subUnit?.id}>
                        <Link className="subUnit" to={`/courses/subunit/${subUnit?.id}`}> {subUnit?.attributes?.title}</Link>
                      </div>
                      )}
                      {/* <span className="quantity"> {topic?.attributes?.content}  </span> */}
                      <Link to={topic?.attributes?.practicalUrl}>
                        Hands on work
                      </Link>
                      <Link to={topic?.attributes?.examsUrl}>Take Exams</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div> )
          }
        </>
      )}
     

    </Fragment>
  );
};

export default MemberVideos;
