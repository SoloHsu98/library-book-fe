import React from "react";
import Navbar from "../component/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center justify-content-center py-4"
        style={{
          height: "100vh",
          color: "white",

          backgroundColor: "#2B3A55",
        }}
      >
        <div className="fs-4">
          Name : Book Library Website
          <br />
          Email : booklibrary2022@gmail.com <br />
          Ph No: 111-222-3333 <br /> Facebook : Book Library
        </div>
        <div className="mt-5 fs-5">
          Book Library is founded in 2022 and our website is dedicated to
          providing many kinds of books.
        </div>
      </div>
    </>
  );
};

export default AboutUs;
