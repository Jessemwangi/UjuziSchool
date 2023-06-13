import React from 'react';
import LessonHeroPages from '../modules/views/LessonHeroLayoutPages';
import './BreadCrums.scss'
import aboutBanner from '../../static/assets/banner2.png'

const BreadCrumb = () => {
const backgroundImage = "https://source.unsplash.com/1200x400/?teaching?auto=format&fit=crop&h=400"
  
    return (
      <React.Fragment>
        {/* <section className='breadcrum' style={{backgroundImage:'https://source.unsplash.com/1750x300/?teaching?auto=format&fit=crop&h=300"'}}>
          <div className='container'>
            <div className='page-header_wrapper'>
              <h1 className='page-header_title'>{'breadCrumbTitle'}</h1>
              <div className='breadcrumb-wrapper'>
                <div className='breadcrumb-inner'>
                  <div className='breadcrumbs'>
                    <a href='/'>Home</a>
                    <span className='separator'></span>
                    <span> {'pageName'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
            <LessonHeroPages
      sxBackground={{
        backgroundImage: `url(${aboutBanner})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        height:'300px',
        
      }}
    ></LessonHeroPages>
      </React.Fragment>
    );

}
export default BreadCrumb;
