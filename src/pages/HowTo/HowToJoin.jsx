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
                                <p>We are seeking partners who share our vision of transforming STEM education worldwide. Whether you're an investor looking for a promising opportunity, 
                                    a school aiming to enhance your curriculum, or an NGO dedicated to improving education access, Ujuzi STEMEX is the solution that can make a real difference. </p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Institution Account Registering</h4>
                                <p>To create your account, we’ll need some information from you. This data helps us provide a more personalized experience and ensures the security of your account. Here’s what we’ll ask for:.</p>
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
                                <p>Please note that your privacy is important to us. We adhere to strict privacy policies and your information will be stored securely and you can always delete your information from the dashboard. Let’s get started with your registration!</p>
                            </div>
                            <div className="text-block">
                                <h4 className="title">Account Registration for students only</h4>
                                <p>Agents will play a crucial role in the registration process for children. Depending on the chosen subscription package, agents can create a certain number of child accounts. This involves creating a username and password for each student, which will then be shared with them individually.

In addition to account creation, agents also have the authority to revoke a student’s access if necessary. To register a student, the following information will be required:

Please note that the exact details needed for registration may vary, but this gives a general idea of the process. We appreciate the important work our agents do in managing these registrations and maintaining the integrity of our platform.</p>
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
                                <p>To purchase a package, you have the option to choose from our list of available packages, or you can contact us for a customized package tailored to your specific needs. Our packages are designed with flexibility in mind to accommodate your budget, the number of students, and contract length. We strive to be as accommodating and flexible as possible to meet your needs.</p>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Accepted Credit Cards</h4>
                                <p>We accept online payment form the following, This allows us to provide you with a secure and convenient payment process..</p>
                                <ul>
                                    <li>Visa</li>
                                    <li>Mastercards</li>
                                    <li>American Express</li>
                                    <li>Mobile transfer</li>
                                    <li>Paypal</li>
                                    <li>Bank transfer</li>
                                </ul>
                            </div>

                            <div className="text-block">
                                <h4 className="title">Why be part of Ujuzi?</h4>
                                <p>Ujuzi STEMEX is a cutting-edge educational platform designed to revolutionize STEM learning. Our solution combines the power of technology, interactive multimedia, and physical equipment to create a holistic and engaging learning experience.</p>
                                <ul>
                                    <li>Updated content on a regular basis</li>
                                    <li>Secure & hassle-free payment</li>
                                    <li>Easy access & smart user dashboard</li>
                                    <li>Interactive Learning</li>
                                    <li>Customized Learning Paths</li>
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