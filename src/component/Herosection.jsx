import React from "react";
import HeroImg from "../assets/HeroImg.png";
import { css } from "@emotion/react";
const Herosection = () => {
  return (
    // <div className="hero-image">
    //   <div className="container">
    //     <div className="text-center display-3 py-5">
    //       <b>SPECIAL </b>
    //       <span style={{ color: "blue" }}>50% OFF</span>
    //       <br />
    //       <b>For</b> <span style={{ color: "red" }}>Christmas</span>
    //     </div>
    //     <div className="d-flex justify-content-center align-items-center my-4">
    //       <form style={{ width: "350px" }}>
    //         <input
    //           className="form-control w-100"
    //           style={{ height: "40px" }}
    //           placeholder="search"
    //         />
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div css={styles.hero}>
      <img src={HeroImg} alt="hero-image" css={styles.heroImg} />

      <div css={styles.content}>
        <h1>
          <b>SPECIAL</b> <span style={{ color: "blue" }}>50% OFF</span>
        </h1>
        <h1>
          <b>FOR </b>
          <span style={{ color: "red" }}>CHRISTMAS</span>
        </h1>
      </div>
    </div>

    // <div css={styles.hero}>
    //   <div css={styles.mask}>
    //     <img src={HeroImg} alt="hero-image" css={styles.heroImg} />
    //   </div>
    //   <div css={styles.content}>
    //     <p>Watch All Wuxia Series Here</p>
    //     <button css={styles.getStartedBtn}>Get Started</button>
    //   </div>
    // </div>
  );
};

export default Herosection;
const styles = {
  hero: css`
    height: 100%;
    width: 100%;
  `,
  mask: css`
    width: 100%;
    height: 100%;
    position: relative;
    &:after {
      content: " ";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      opacity: 0.5;
    }
  `,
  heroImg: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    // object-position: 0px -100px;
  `,
  content: css`
    position: absolute;
    max-width: 500px;
    transform: translate(-50%, -50%);
    top: 30%;
    left: 50%;
    text-align: center;

    p {
      font-size: 3rem;
      font-weight: 600;
      color: #fff;
    }
  `,
  getStartedBtn: css`
    margin-top: 1em;
    border: 1px solid #fff;
    padding: 1em 2em;
    background: rgba(64, 66, 88, 0.7);
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.3s ease 0s;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
    &:hover {
      background-color: rgba(64, 66, 88, 0.46);
      transform: translateY(-3px);
    }
    &:focus {
      outline: none;
    }
  `,
};
