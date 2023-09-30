import { Link } from "react-router-dom";
import FooterSocial from "./component/footer-social";
import logolight from '../../static/assets/logo.png'
const footer_contents = {
    logoLight: logolight,
    logoDark: logolight,
    desc: 'A Finnish EduTech company aim at experiential learning in STEM.',
    add: 'Runeberginkatu 14-16, Helsinki, Southern Finland, 00100',
    call: '+358 45 196 4808',
    email: 'info@ujuzi.io',
    widgets: [
        {
            col: '3',
            class: 'explore-widget',
            widget_title: 'Online Platform',
            footer_links: [
                { link: 'about-1', title: 'About' },
                { link: 'course-style-1', title: 'Courses' },
                { link: 'team-1', title: 'Instructor' },
                { link: 'event-grid', title: 'Events' },
                { link: 'team-details', title: 'Instructor Profile' },
                { link: 'purchase-guide', title: 'Purchase Guide' }
            ]
        },
        {
            col: '2',
            class: 'quick-link-widget',
            widget_title: 'Links',
            footer_links: [
                { link: 'contact', title: 'Contact Us' },
                { link: 'gallery-grid', title: 'Gallery' },
                { link: 'blog-standard', title: 'News & Articles' },
                { link: 'faq', title: "FAQ's" },
                { link: 'sign-in', title: 'Sign In/Registration' },
                { link: 'coming-soon', title: 'Coming Soon' }
            ]
        }
    ]

}

const { logoDark, logoLight, desc, add, call, email, widgets } = footer_contents;

const Footer = ({ style_2, dark_bg,home_4 }) => {
    return (
        <footer className={`edu-footer ${style_2 ? style_2 : dark_bg ? 'footer-dark bg-image footer-style-3' : "footer-lighten bg-image footer-style-1"}`}>
            <div className={`footer-top ${style_2 ? "footer-top-2" : ""}`}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="edu-footer-widget">
                                <div className="logo"  >
                                    {/* <Link href={'/'}>
                                        
                                            {!dark_bg && <>
                                                {!style_2 && <img  className="logo-light" style={{height:'70px'}} src={logoLight} alt="Corporate Logo" />}
                                                <img className="logo-dark" src={logoDark} alt="Corporate Logo" />
                                            </>}
                                       
                                    </Link> */}

                                    <Link href={'/'}>
                                     
                                           <img  style={{height:'70px'}} src={logolight} alt="Corporate Logo" />
                                       
                                    </Link>
                                </div>

                                <p className="description">{desc}</p>
                                <div className="widget-information">
                                    <ul className="information-list">
                                        <li><span>Add:</span>{add}</li>
                                        <li><span>Call:</span><a href="tel:+358 41 12394555">{call}</a></li>
                                        <li><span>Email:</span><a href="mailto:info@ujuzi.io" rel="noreferrer" target="_blank">{email}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {widgets.map((w, i) => (
                            <div key={i} className={`col-lg-${w.col} col-sm-6`}>
                                <div className={`edu-footer-widget ${w.class}`}>
                                    <h4 className="widget-title">{w.widget_title}</h4>
                                    <div className="inner">
                                        <ul className="footer-link link-hover">
                                            {w.footer_links.map((l, i) => <li key={i}><Link to={`/${l.link}`}>{l.title}</Link></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-lg-4 col-md-6">
                            <div className="edu-footer-widget">
                                <h4 className="widget-title">Contacts</h4>
                                <div className="inner">
                                    <p className="description">Enter your email address to register to our newsletter subscription</p>
                                    <div className="input-group footer-subscription-form">
                                        <input type="email" className="form-control" placeholder="Your email" />
                                        <button className={`edu-btn ${dark_bg && !home_4?'btn-secondary':''} btn-medium`} type="button">Subscribe <i className="icon-4"></i></button>
                                    </div>
                                    <ul className="social-share icon-transparent">
                                        <FooterSocial/>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner text-center">
                                <p>Copyright {new Date().getFullYear()} <a href="https://ujuzi.io" rel="noreferrer" target="_blank">Ujuzi</a> Designed By <a href="https://ujuzi.io" rel="noreferrer" target="_blank">Ujuzi Oy</a>. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;