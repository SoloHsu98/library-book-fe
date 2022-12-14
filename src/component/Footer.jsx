import React from "react";
import FacebookIcon from "./icons/FacebookIcon";
import Instagram from "./icons/Instagram";
import Telegram from "./icons/Telegram";
import Twitter from "./icons/Twitter";
import Xmax from "./icons/Xmax";

const Footer = () => {
  return (
    <footer
      style={{
        color: "white",
        backgroundColor: "#444444",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{ height: "100%" }}
            >
              <div className="d-flex flex-column align-items-start">
                <h4>Product</h4>
                <div>
                  Landing Page
                  <br />
                  Popup Builder
                  <br />
                  Web-design
                  <br />
                  Content
                </div>
              </div>
              <div className="d-flex flex-column align-items-start ">
                <h4>Use Cases</h4>
                <div>
                  Web-designers
                  <br />
                  Marketers
                  <br />
                  Small Business
                  <br />
                  Website Builder
                  <br />
                </div>
              </div>
              <div className="d-flex flex-column align-items-start ">
                <h4>Resources</h4>
                <div>
                  Stories
                  <br />
                  Authors
                  <br />
                  Summary
                  <br />
                  Support
                  <br />
                </div>
              </div>
              <div className="d-flex flex-column align-items-start ">
                <h4>Company</h4>
                <div>
                  Careers
                  <br />
                  FAQs
                  <br />
                  Teams
                  <br />
                  Contact Us
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <Xmax />
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <span className="mx-2">
            <FacebookIcon />
          </span>
          <span className="mx-2">
            <Twitter />
          </span>
          <span className="mx-2">
            {" "}
            <Instagram />
          </span>
          <span className="mx-2">
            <Telegram />
          </span>
        </div>
        <div
          className="d-flex flex-row justify-content-center align-items-center my-3"
          style={{ cursor: "pointer" }}
        >
          <span className="mx-3">Privacy Policy</span>
          <span className="mx-3">Terms of Use</span>
          <span className="mx-3">Sales and Refunds</span>
          <span className="mx-3">Legal</span>
          <span className="mx-3">Site Map</span>
        </div>
        <div className="text-center my-4 py-3">@2021 All Rights Served</div>
      </div>
    </footer>
  );
};

export default Footer;
