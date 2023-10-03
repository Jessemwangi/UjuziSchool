import React from 'react';
import { Link } from 'react-router-dom';

const HowToJoin = () => {
    return (
       
            <div className="container">
                <div className="row row--30">
                    <div className="col-lg-8">
                        <div className="privacy-policy purchase-guide">
                            <div className="text-block">
                                <h3 className="title">Become a Part of Us</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat. </p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Institution Account Registering</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <ul>
                                            <li>Name of the Contact person (required)</li>
                                            <li>Region / Location (required)</li>
                                            <li>Institution you represent (required)</li>
                                            <li>Details of the institution. (required)</li>
                                            <li>Current career (required)</li>
                                            <li>Number of Student to enroll (required)</li>
                                        </ul>
                                    </div>

                                    <div className="col-lg-6">
                                        <ul>
                                            <li>Mobile phone numbers (required)</li>
                                            <li>Strong password (required)</li>
                                            <li>Valid Email address (required)</li>
                                            <li>Hobbies & interests (optional)</li>
                                            <li>Social profiles (optional)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="text-block">
                                <h4 className="title">Account Registration for students only</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <ul>
                                            <li>Name (required)</li>
                                            <li>password (required)</li>
                                        </ul>
                                    </div>
                            </div>
                            </div>
                            <div className="text-block">
                                <h4 className="title">How to Purchase a Course?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis aliquip commodo consequat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Accepted Credit Cards</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul>
                                    <li>Visa</li>
                                    <li>Mastercards</li>
                                    <li>American Express</li>
                                    <li>Discover</li>
                                </ul>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Why be part of Ujuzi?</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul>
                                    <li>Updated content on a regular basis</li>
                                    <li>Secure & hassle-free payment</li>
                                    <li>1-click checkout</li>
                                    <li>Easy access & smart user dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                    <div className="course-view-all" style={{marginBottom:'50px'}} data-sal-delay="150" data-sal="slide-up" data-sal-duration="1200">
                            <Link href="/sign-up" className="edu-btn">
                                Join Our Community <i className="icon-4"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    
    )
}

export default HowToJoin;