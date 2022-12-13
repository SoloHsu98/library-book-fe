import React from "react";
import { css } from "@emotion/react";
const Testing = () => {
  return <div css={styles.text}>Testing Emotion</div>;
};

export default Testing;
const styles = {
  text: css`
    color: red;
    font-size: 2rem;
    border: 1px solid red;
  `,
};
