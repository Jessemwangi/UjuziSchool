import React from 'react';
 import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'react-router-dom';
import PaginationTwo from '../../Component/paginatio-2';
import resource_data from '../../Data/resource_data';
// import m from '../../images'
const blog_items = resource_data.filter(blog => blog.blog_masonry);

const InstructionsMasonryArea = () => {
  return (
        <section className="section-gap-equal">
            <div className="container">
                <div className="g-5" id="masonry-gallery" data-sal-delay="10" data-sal="slide-up" data-sal-duration="900">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 992: 3 }}>
                        <Masonry gutter="30px">
                            {blog_items.map((blog) => {
                                const { id, img, desc, title, date, category, comment, downloadUrl } = blog;
                                return (
                                    <div key={id}>
                                        <div className="edu-blog blog-style-5">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                    {/* <Link to={downloadUrl} target='_blank'> */}
                                                      
                                                            <img src={require(`../../images/blog/${img}`)} alt="Blog Images" />
                                                           
                                                    {/* </Link> */}
                                                </div>

                                                <div className="content position-top">
                                                    <div className="read-more-btn">
                                                        <Link className="btn-icon-round" to={downloadUrl} target='_blank'>
                                                            <i className="icon-4"></i>
                                                        </Link>
                                                    </div>
                                                    <div className="category-wrap">
                                                        <Link to="#" className="blog-category">{category}</Link>
                                                    </div>
                                                    <h5 className="title">
                                                        <Link to={downloadUrl} target='_blank'>
                                                       
                                                        {title.split(' ').slice(0, 60).join(' ')}{title.split(' ').length > 3 ? ' ...' : ''}...
                                                        </Link>
                                                    </h5>
                                                    <ul className="blog-meta">
                                                        <li><i className="icon-27"></i>{date}</li>
                                                        <li><i className="icon-28"></i>Com {comment}</li>
                                                    </ul>
                                                    <p>{desc.split(' ').slice(0, 20).join(' ')}{desc.split(' ').length > 20 ? ' ...' : ''}</p>
                                                    <Link className="edu-btn" to={downloadUrl} target='_blank'>
                                    Download doc<i className="icon-4"></i> 🗎
                                     
                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
                <ul className="edu-pagination top-space-30">
                    {/* pagination start */}
                    <PaginationTwo />
                    {/* pagination end */}
                </ul>
            </div>
        </section>
    )
}

export default InstructionsMasonryArea;