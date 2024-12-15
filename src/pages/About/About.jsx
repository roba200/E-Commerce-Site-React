import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./About.css"

function About() {
    return (
        <>
            <Header></Header>
            <div className="navigation-panel">
                <ul>
                    <li>
                        <a href="">Home </a>
                    </li>
                    <li>/</li>
                    <li>
                        <a href="">About</a>
                    </li>
                </ul>
            </div>
            <div className="stroy-container">
                <div className="our-story">
                    <b>Our Story</b>
                    <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh.
                        Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands
                        and serves 3 millioons customers across the region.
                    </p>

                    <p>Exclusive has more than 1 Million products to offer, growing at a very fast.
                        Exclusive offers a diverse assotment in categories ranging  from consumer.
                    </p>
                </div>
                <div className="story-img">
                    <img src="../../public/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png" alt="" />
                </div>
            </div>
            <div className="box-container">
                <div className="box">
                    <img src="../../public/Services.png" alt="" />
                    <b>
                        10.5k
                    </b>
                    <p>
                        Sallers active our site
                    </p>
                </div>
                <div className="box">
                    <img src="../../public/Services.png" alt="" />
                    <b>
                        10.5k
                    </b>
                    <p>
                        Sallers active our site
                    </p>
                </div>
                <div className="box">
                    <img src="../../public/Services.png" alt="" />
                    <b>
                        10.5k
                    </b>
                    <p>
                        Sallers active our site
                    </p>
                </div>
                <div className="box">
                    <img src="../../public/Services.png" alt="" />
                    <b>
                        10.5k
                    </b>
                    <p>
                        Sallers active our site
                    </p>
                </div>
            </div>
            <div className="team-container">
                <div className="team-box">
                    <div className="team-img">
                        <img src="../../public/image 46.png" alt="" />
                    </div>
                    <div className="team-details">
                        <b>Tom Cruise</b>
                        <p>Founder & Chairman</p>
                        <div className="social-media">
                            <img src="../../public/Icon-Twitter.png" alt="" />
                            <img src="../../public/Icon-instagram.png" alt="" />
                            <img src="../../public/Icon-Linkedin.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="team-box">
                    <div className="team-img">
                        <img src="../../public/image 51.png" alt="" />
                    </div>
                    <div className="team-details">
                        <b>Tom Cruise</b>
                        <p>Founder & Chairman</p>
                        <div className="social-media">
                            <img src="../../public/Icon-Twitter.png" alt="" />
                            <img src="../../public/Icon-instagram.png" alt="" />
                            <img src="../../public/Icon-Linkedin.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="team-box">
                        <div className="team-img">
                            <img src="../../public/image 47.png" alt="" />
                        </div>
                    <div className="team-details">
                        <b>Tom Cruise</b>
                        <p>Founder & Chairman</p>
                        <div className="social-media">
                            <img src="../../public/Icon-Twitter.png" alt="" />
                            <img src="../../public/Icon-instagram.png" alt="" />
                            <img src="../../public/Icon-Linkedin.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-navigate">
                <img src="../../public/Frame 883.png" alt="" />
            </div>
            <div className="features">
                <div className="feature-container">
                    <div className="feature-img">
                        <img src="../../public/delivery.png" alt="" />
                    </div>
                    <b>Free and Fast Delivery</b>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className="feature-container">
                    <div className="feature-img">
                        <img src="../../public/delivery.png" alt="" />
                    </div>
                    <b>Free and Fast Delivery</b>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className="feature-container">
                    <div className="feature-img">
                        <img src="../../public/delivery.png" alt="" />
                    </div>
                    <b>Free and Fast Delivery</b>
                    <p>Free delivery for all orders over $140</p>
                </div>

            </div>
            <Footer></Footer>
        </>
    );
}
export default About;