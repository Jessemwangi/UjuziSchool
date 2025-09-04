import React, { useEffect, useState } from 'react';
 import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useSearchParams } from 'react-router-dom';
import PaginationTwo from '../../Component/paginatio-2';
import { timeformat } from '../../UtilitiesFunctions/formatTime';
import { Alert, CircularProgress } from '@mui/material';
import Button from '../../Component/modules/components/Button';
import { useFetch_NoToken } from '../../hooks/useFetch';

const InstructionsMasonryArea = () => {
          const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");

  // Get the 'age' parameter from the query string
  const pageNo = searchParams.get("page") || 1;
  useEffect(() => {
    setUrl(
      `/study-resources?populate=image&populate=file&filters[isDeleted]=false&pagination[pageSize]=6&pagination[page]=${pageNo}&sort=id:desc`
    );
  }, [pageNo]);
  const { data: resources, loading, error } = useFetch_NoToken(url);
  if (loading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
const errorMessage = error?.response?.data?.error?.message || error?.response?.data?.error?.name  || error.message || 'Something went wrong';
    const statusCode = error?.response?.status || error?.status || 500;
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity={errorMessage === "ForbiddenError" || statusCode === 403 || errorMessage === 'Forbidden access' ? "info" : "error"} sx={{ marginBottom: "1rem" }}>
                      {errorMessage === "ForbiddenError" || statusCode === 403 || errorMessage === 'Forbidden access'
              ? "You don't have permission to access student data."
              : errorMessage
            }
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }
  return (
        <section className="section-gap-equal">
            <div className="container">
                <div className="g-5" id="masonry-gallery" >
                    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 992: 3 }}>
                        <>
                        {!error && resources &&
                        <Masonry gutter="30px">
                            {resources?.data.map(({name, description, createdAt, category, comment, image, file ,id}) => {
                              
                                return (
                                    <div key={id}>
                                        <div className="edu-blog blog-style-5">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                    {/* <Link to={downloadUrl} target='_blank'> */}
                                                      
                                                            <img src={image?.url} alt={category} />
                                                           
                                                    {/* </Link> */}
                                                </div>

                                                <div className="content position-top">
                                                    <div className="read-more-btn">
                                                        <Link className="btn-icon-round" to={file?.url} target='_blank'>
                                                            <i className="icon-4"></i>
                                                        </Link>
                                                    </div>
                                                    <div className="category-wrap">
                                                        <Link to="#" className="blog-category">{category}</Link>
                                                    </div>
                                                    <h5 className="title">
                                                        <Link to={file?.url} target='_blank'>
                                                       
                                                        {name?.split(' ').slice(0, 60).join(' ')}{name?.split(' ').length > 3 ? ' ...' : ''}...
                                                        </Link>
                                                    </h5>
                                                    <ul className="blog-meta">
                                                        <li><i className="icon-27"></i>{timeformat(createdAt)}</li>
                                                        <li><i className="icon-28"></i>Com {comment}</li>
                                                    </ul>
                                                    <p>{description?.split(' ').slice(0, 20).join(' ')}{description?.split(' ').length > 20 ? ' ...' : ''}</p>
                                                    <Link className="edu-btn" to={file?.url} target='_blank'>
                                    Download doc<i className="icon-4"></i> 🗎
                                     
                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Masonry>
}</>
                    </ResponsiveMasonry>
                </div>
                <ul className="edu-pagination top-space-30">
                    {/* pagination start */}
                  {  resources && <PaginationTwo meta={resources?.meta}/> }
                    {/* pagination end */}
                </ul>
            </div>
        </section>
    )
}

export default InstructionsMasonryArea;