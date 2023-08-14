import React, { Fragment, useState } from "react";
import "./SubCategories.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import { Slider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import AppSingleVideo from "../../Component/SingleVideo/AppSingleVideo";
import Typography from "../../Component/modules/components/Typography";
import { backend } from "../../UtilitiesFunctions/Function";

const SubCategories = () => {
  const id = useParams().id;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  // available for non logged in, get all video then on click compare if the video are in user subscription if not return not authorized,
const filter = `populate=*&populate=course_subcategories.introVideo&populate[]=course_subcategories.videos.videoImage&populate[]=course_subcategories.videos.videoUrl&populate[]=course_subcategories.topics&populate[]=course_subcategories.questions&populate[]=course_subcategories.simulations&populate[]=course_subcategories.subscription_packages&populate[]=course_subcategories.topics.sub_units`
const start = (currentPage - 1) * recordsPerPage;
const limit = `?_limit=${recordsPerPage}&_start=${start}&`
const { data, loading, error } = UseFetch(
    `coursecategories/${id}${limit}${filter}`
  );

  console.log( data, loading, error)
  /// get user subscription
  //   const { data, loading, error } = UseFetch(
  // `users/${id}?populate=*&populate[]=agents&populate[]=agents.subscription_packages&populate[]=agents.subscription_packages.coursecategories&populate[]=agents.subscription_packages.course_subcategories&populate[]=agents.subscription_packages.videos.videoImage&populate[]=agents.subscription_packages.units&populate[]=agents.subscription_packages.units.sub_units&populate[]=agents.subscription_packages.charges&populate[]=agents.subscription_status&populate[]=agents.subscription_packages.videos.videoUrl&filters[agents][subscription_packages][isActive]=true&filters[agents][subscription_status][isActive]=true&filters[agents][subscription_status][expiresOn_gte]=${new Date()}`
  //   );
  const [bgcolor, setbgColor] = useState("purple");
  const [selectedImg, setSelectedImg] = useState(0);
  const [currentVideo, setCurrentVideo] = useState();
  const [quantity, setQuantity] = useState(0);
  const [validationError, setValidationError] = useState("");
  const [subcategoryVideos, setSubcategoryVideos] = useState({});

  const handleColorChange = (e) => {
    e.preventDefault();
    const color = e.target.value !== "" ? e.target.value : "purple";
    setbgColor(color.toLowerCase());
    console.log(e.target.value);
  };
  console.log(data);
  return (
    <Fragment>
      {loading ? (
        <>Loading ..</>
      ) : (
        <>
          {data && 
          data?.attributes?.course_subcategories?.data.map(data =>

            <div className="subCategory" key={data.id}>
              {/* <h1 className="subCatName">{data?.attributes?.title}</h1> */}
              <div className="subCatName">
              <Typography variant="h3" marked="center" align="left" component="h3">
              {data?.attributes?.title} </Typography>
              </div>
              <div className="upper">
                <div className="left">
                  <div className="images">
                    {data?.attributes?.videos?.data.map((vid, index) => (
                     
                        <img key={vid?.id}
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
      {error ? "error has occured " : ""}
    </Fragment>
  );
};

export default SubCategories;
