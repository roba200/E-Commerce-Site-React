import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="f-wrapper">
      <div className="f-container">
        <div className="footer-menu">
          <ul className="footer-ul">
            <li className="footer-title">Exclusive</li>
            <li className="footer-subtitle">Subscribe</li>
            <li className="footer-subtitle">Get 10% off your first order</li>
            <li>
              <div className="email-input">
                <input type="text" placeholder="What are you looking for?" />
                <img src="/send.png" alt="" className="send-btn" />
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-menu">
          <ul className="footer-ul">
            <li className="footer-title">Support</li>
            <li className="footer-subtitle">
              No.453/A Bulugha junction,Kelaniya,western,Sri lanka.
            </li>
            <li className="footer-subtitle">exclusive@gmail.com</li>
            <li className="footer-subtitle">+9471 123 4567</li>
          </ul>
        </div>

        <div className="footer-menu">
          <ul className="footer-ul">
            <li className="footer-title">Account</li>
            <li className="footer-subtitle">My Account</li>
            <li className="footer-subtitle">Login / Register</li>
            <li className="footer-subtitle">Cart</li>
            <li className="footer-subtitle">Wishlist</li>
            <li className="footer-subtitle">Shop</li>
          </ul>
        </div>

        <div className="footer-menu">
          <ul className="footer-ul">
            <li className="footer-title">Quick Link</li>
            <li className="footer-subtitle">Privacy Policy</li>
            <li className="footer-subtitle">Terms Of Use</li>
            <li className="footer-subtitle">FAQ</li>
            <li className="footer-subtitle">Contact</li>
          </ul>
        </div>

        <div className="footer-menu">
          <ul className="footer-ul">
            <li className="footer-title">Download</li>
            <li className="footer-subtitle" style={{ fontSize: "12px" }}>
              Save $3 with App New User Only
            </li>
            <li>
              <table>
                <tr>
                  <td rowSpan={2}>
                    <img src="/qrcode.png" alt="" srcset="" />
                  </td>
                  <td>
                    <img src="/googleplay.png" alt="" srcset="" />
                  </td>
                </tr>
               
                <td>
                  <img src="/appstore.png" alt="" srcset="" />
                </td>
              </table>
            </li>
            <li className="social-panel">
                <img src="/Icon-Facebook.png" alt="logo" srcset="" />
                <img src="/icon-instagram.png" alt="logo" srcset="" />
                <img src="/Icon-Twitter.png" alt="logo" srcset="" />
                <img src="/Icon-Linkedin.png" alt="logo" srcset="" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
