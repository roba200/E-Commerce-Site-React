import React, { Component } from "react";
import "./Contact.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/RedButton"

function Contact() {
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
                        <a href="">My Account</a>
                    </li>
                </ul>
            </div>
            <div className="detail">
                <div className="contact">
                    <div className="call">
                        <div className="heading"><img src="../../public/icons-phone.png" alt="" />
                            <b>Call To Us</b>
                        </div>
                        <br />
                        we are available 24/7, 7 days a week.<br /><br />
                        phone: +94234123456<br /><br />
                        <hr />
                    </div>

                    <div className="mail">
                        <div className="heading"><img src="../../public/icons-mail.png" alt="" />
                            <b>Write To Us</b>
                        </div>
                        <br />
                        Fill out our form and we will contact  you within 24 hours.<br /><br />
                        Emails: custormer@exclsive.com<br /><br />
                        Emails: support@exclusive.com
                    </div>
                </div>

                <div className="message-box">
                    <div className="user-detail">
                        <input type="text" placeholder="Your Name" required />
                        <input type="text" placeholder="Your Email" required />
                        <input type="text" placeholder="Your Phone" required />
                    </div>

                    <textarea class="msg-textarea" id="" placeholder="Your Message"></textarea>

                    <div className="send-button">
                        <div className="button-container">
                            <Redbutton text="Send Message" />
                        </div>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </>
    );
}
export default Contact;