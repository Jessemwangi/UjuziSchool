import React, { useEffect, useState } from 'react';
 import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useSearchParams } from 'react-router-dom';
import PaginationTwo from '../../Component/paginatio-2';
import getdata from '../../UtilitiesFunctions/getData'
import { timeformat } from '../../UtilitiesFunctions/formatTime';

const InstructionsMasonryArea = () => {
        const [resources, setResources] = useState(null);
        const [metaInfo, setMetaInfo] = useState(null)
        const [err,setErr] = useState('')
        const [searchParams] = useSearchParams();

  // Get the 'age' parameter from the query string
  const pageNo = searchParams.get('page') || 1;

      const url =`/study-resources?populate=image&populate=file&filters[isDeleted]=false&pagination[pageSize]=6&pagination[page]=${pageNo}&sort=id:desc`
        useEffect(() => {
          const fetchData = async () => {
            try {
              const data = await getdata.getAll(`${process.env.REACT_APP_SERVER_URL}${url}`);
              setResources(data.data);
              setMetaInfo(data?.meta)
            } catch (error) {
              console.error('Error fetching data:', error);
              setErr(error.message)
            }
          };
      
          fetchData();
        }, [url]);
  return (
        <section className="section-gap-equal">
            <div className="container">
                <div className="g-5" id="masonry-gallery" data-sal-delay="10" data-sal="slide-up" data-sal-duration="900">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 992: 3 }}>
                        <>
                      {err && <>
                      <p>There was an error</p>
                      {err}
                      </>
                      }
                        {!err && resources &&
                        <Masonry gutter="30px">
                            {resources?.map(({attributes,id}) => {
                               const {  name, description, createdAt, category, comment, image, file ,meta } = attributes;
                                return (
                                    <div key={id}>
                                        <div className="edu-blog blog-style-5">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                    {/* <Link to={downloadUrl} target='_blank'> */}
                                                      
                                                            <img src={image?.data?.attributes?.url} alt={category} />
                                                           
                                                    {/* </Link> */}
                                                </div>

                                                <div className="content position-top">
                                                    <div className="read-more-btn">
                                                        <Link className="btn-icon-round" to={file?.data?.attributes?.url} target='_blank'>
                                                            <i className="icon-4"></i>
                                                        </Link>
                                                    </div>
                                                    <div className="category-wrap">
                                                        <Link to="#" className="blog-category">{category}</Link>
                                                    </div>
                                                    <h5 className="title">
                                                        <Link to={file?.data?.attributes?.url} target='_blank'>
                                                       
                                                        {name?.split(' ').slice(0, 60).join(' ')}{name?.split(' ').length > 3 ? ' ...' : ''}...
                                                        </Link>
                                                    </h5>
                                                    <ul className="blog-meta">
                                                        <li><i className="icon-27"></i>{timeformat(createdAt)}</li>
                                                        <li><i className="icon-28"></i>Com {comment}</li>
                                                    </ul>
                                                    <p>{description?.split(' ').slice(0, 20).join(' ')}{description?.split(' ').length > 20 ? ' ...' : ''}</p>
                                                    <Link className="edu-btn" to={file?.data?.attributes?.url} target='_blank'>
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
                  {  metaInfo && <PaginationTwo meta={metaInfo}/> }
                    {/* pagination end */}
                </ul>
            </div>
        </section>
    )
}

export default InstructionsMasonryArea;