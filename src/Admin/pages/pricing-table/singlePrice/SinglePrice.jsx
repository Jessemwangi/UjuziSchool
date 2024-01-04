import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import SystemError from '../../../../Component/modules/views/Error/SystemError';
import SingleProgressbar from '../../../../Component/single-progressbar';
import SingleComment from '../../../../Component/single-comment';
import SingleAccordion from '../../../../Component/single-accordion';
import CourseDetailsSidebar from './course-details-sidebar';

const social_links= [
  {link: 'http://facebook.com', target: '_blank', icon: 'icon-facebook'},
  {link: 'http://twitter.com', target: '_blank', icon: 'icon-twitter'},
  {link: 'https://www.linkedin.com/', target: '_blank', icon: 'icon-linkedin2'},
  {link: 'https://www.youtube.com/', target: '_blank', icon: 'icon-youtube'}
]

const reviews =[
  {img:'/assets/images/blog/comment-01.jpg',rating:5,name:'Haley Bennet',date:'Oct 10, 2021',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  {img:'/assets/images/blog/comment-02.jpg',rating:5,name:'Simon Baker',date:'Oct 15, 2021',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  {img:'/assets/images/blog/comment-03.jpg',rating:5,name:'Richard Gere',date:'Oct 19, 2021',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
]

const SinglePrice = () => {
    const {id} =useParams()
    const url =`/subscription-packages/${id}?populate[]=item_per_packages.subscription_package_items&populate=*`
    const [subscription, setSubscription] =useState()
    const [isLoading,setIsLoading] =useState(false)
    const [err, setErr] =useState()
  const { data, loading, error }  =useFetch(url)
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
    if (data?.length > 0) {
      setSubscription(data);
    }
  
  }, [data, error, loading]);

    if (err)  return <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}` }/>
    if (isLoading) return <h2>loading .....</h2>

    return (
      <section className="edu-section-gap course-details-area">
      <div className="container">
          <div className="row row--30">
              <div className="col-lg-8">
                  <div className="course-details-content course-details-2">
                      <div className="course-overview">
                          <h3 className="heading-title" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">About This Course</h3>
                          <p data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">{'Bronze 1'}</p>
                          <p data-sal-delay="150" data-sal-duration="800">{'Small description'}</p>
                          <div className="border-box">
                              <h5 className="title" data-sal-delay="150" data-sal-duration="800">What You’ll Learn?</h5>
                              <div className="row g-5">
                                  <div className="col-lg-6" data-sal-delay="150" data-sal-duration="800">
                                      <ul>
                                          <li>Learn to use Python professionally, learning both Python 2 & Python 3!</li>
                                          <li>Build 6 beautiful real-world projects for your portfolio (not boring toy apps)</li>
                                      </ul>
                                  </div>

                                  <div className="col-lg-6" data-sal-delay="150" data-sal-duration="800">
                                      <ul>
                                          <li>Understand the Theory behind Vue.js and use it in Real Projects</li>
                                          <li>Create responsive, accessible, and beautiful layouts</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>

                          <h3 className="heading-title" data-sal-delay="150" data-sal-duration="800">Requirements</h3>
                          <ul className="mb--90" data-sal-delay="150" data-sal-duration="800">
                              <li>No prior knowledge of Wordpress is required as everything will be covered in this course.</li>
                              <li>Basic HTML and CSS knowledge helps, but {"isn't"} a must-have</li>
                              <li>You {"don't"} need any coding experience at all. That is the beauty of Wordpress.</li>
                              <li>Basic JavaScript knowledge is required</li>
                          </ul>

                          <h3 className="heading-title" data-sal-delay="150" data-sal-duration="800">Target Audience</h3>
                          <ul className="mb--90" data-sal-delay="150" data-sal-duration="800">
                              <li>Newcomer as well as experienced frontend developers interested in learning a modern JavaScript framework</li>
                              <li>If you want to learn to master Wordpress without getting bogged down with technical jargon, this course is for you.</li>
                              <li>This course is for you if you want to build a website, whether for personal or business reasons.</li>
                              <li>This course is perfect for you if you are taking over an existing Wordpress website, or want to build one from</li>
                          </ul>
                      </div>

                      <div className="course-curriculam mb--90">
                          <h3 className="heading-title" data-sal-delay="150" data-sal-duration="800">Topics for This Course</h3>
                          <p data-sal-delay="150" data-sal-duration="800">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua.</p>
                          <div className="accordion edu-accordion" id="accordionExample" data-sal-delay="150" data-sal-duration="800">

                              <SingleAccordion show={true} id="1" title="Course Introduction" desc={[
                                  { title: 'Introduction', icon: 'icon-68' },
                                  { title: 'Course Overview', icon: 'icon-68' },
                                  { title: 'Course Overview', badge_list: true, question: 0, minutes: 10 },
                                  { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                  { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                  { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                              ]} />
                              <SingleAccordion id="2" title="JavaScript Language Basics" desc={[
                                  { title: 'Introduction', icon: 'icon-68' },
                                  { title: 'Course Overview', icon: 'icon-68' },
                                  { title: 'Course Overview', badge_list: true, question: 2, minutes: 12 },
                                  { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                  { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                  { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                              ]} />
                              <SingleAccordion id="3" title="Components & Databinding" desc={[
                                  { title: 'Introduction', icon: 'icon-68' },
                                  { title: 'Course Overview', icon: 'icon-68' },
                                  { title: 'Course Overview', badge_list: true, question: 4, minutes: 15 },
                                  { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                  { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                  { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                              ]} />
                              <SingleAccordion id="4" title="Product Management Leadership" desc={[
                                  { title: 'Introduction', icon: 'icon-68' },
                                  { title: 'Course Overview', icon: 'icon-68' },
                                  { title: 'Course Overview', badge_list: true, question: 6, minutes: 18 },
                                  { title: 'Course Exercise / Reference Files', icon: 'icon-68' },
                                  { title: 'Code Editor Installation (Optional if you have one)', icon: 'icon-68' },
                                  { title: 'Embedding PHP in HTML', icon: 'icon-68' }
                              ]} />
                          </div>
                      </div>

                      <div className="course-instructor-wrap mb--90" data-sal-delay="150" data-sal-duration="800">
                          <h3 className="heading-title">Online Instruction</h3>
                          <div className="course-instructor">
                              <div className="thumbnail">
                                  <img src={require(`../../../../images/team/team-02/team-01.webp`)} alt="team images" />
                              </div>

                              <div className="author-content">
                                  <h6 className="title">{'instructor name'}</h6>
                                  <span className="subtitle">{`PHD name name`}</span>
                                  <p>{`instructor_desc`}</p>
                                  <ul className="social-share">
                                      {social_links?.map((social, i) => (
                                          <li key={i}>
                                              <a href={social.link} target={social.target ? social.target : ''}>
                                                  <i className={social.icon}></i>
                                              </a>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                      </div>

                      <div className="course-review" data-sal-delay="150" data-sal-duration="800">
                          <h3 className="heading-title">Student Feedback</h3>
                          <p>{5} average rating based on {10} rating</p>
                          <div className="row g-0 align-items-center">
                              <div className="col-sm-4">
                                  <div className="rating-box">
                                      <div className="rating-number">{10}</div>
                                      <div className="rating">
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                          <i className="icon-23"></i>
                                      </div>
                                      <span>({10} Review)</span>
                                  </div>
                              </div>

                              <div className="col-lg-8">
                                  <div className="review-wrapper">
                                      <SingleProgressbar value={'100'} rating_value={10} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                      <SingleProgressbar value={'0'} rating_value={'0'} />
                                  </div>
                              </div>
                          </div>

                          <div className="comment-area">
                              <h3 className="heading-title">Reviews</h3>
                              <div className="comment-list-wrapper">
                                  {reviews?.map((review, i) => (
                                      <SingleComment key={i} review={review} />
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-lg-4">
                  <CourseDetailsSidebar  details_2={true} />
              </div>
          </div>
      </div>
  </section>
    );
};

export default SinglePrice;