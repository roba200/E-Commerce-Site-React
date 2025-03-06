import React, { useState } from "react";
import "./Contact.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Redbutton from "../../components/RedButton/RedButton";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailParams = {
      ...formData,
      to_email: "pasindudeemantha2000@gmail.com", // Add recipient's email address here
    };
    emailjs
      .send(
        "service_urph25f",
        "template_m73anq1",
        emailParams,
        "qiVy4hEHZd0LBzcAL"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");

          // Send thank you email to the customer
          const thankYouParams = {
            to_name: formData.name,
            email: formData.email, // Ensure this field is set
          };
          emailjs.send(
            "service_urph25f",
            "template_thankyou",
            thankYouParams,
            "qiVy4hEHZd0LBzcAL"
          );
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message, please try again.");
        }
      );
  };

  return (
    <>
      <Header />
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
            <div className="heading">
              <img src="/icons-phone.png" alt="" />
              <b>Call To Us</b>
            </div>
            <br />
            we are available 24/7, 7 days a week.
            <br />
            <br />
            phone: +94234123456
            <br />
            <br />
            <hr />
          </div>

          <div className="mail">
            <div className="heading">
              <img src="/icons-mail.png" alt="" />
              <b>Write To Us</b>
            </div>
            <br />
            Fill out our form and we will contact you within 24 hours.
            <br />
            <br />
            Emails: custormer@exclsive.com
            <br />
            <br />
            Emails: support@exclusive.com
          </div>
        </div>

        <form className="message-box" onSubmit={handleSubmit}>
          <div className="user-detail">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            className="msg-textarea"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <div className="send-button">
            <div className="button-container">
              <Redbutton text="Send Message" />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;