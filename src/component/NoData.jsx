import React from "react";
import NoDataIcon from "./icons/NoDataIcon";
import { css } from "@emotion/react";
const NoData = () => {
  return (
    <div css={styles.emptyWrapper}>
      <NoDataIcon />
      <p className="text-white">There is no data related with your account</p>
    </div>
  );
};

export default NoData;
const styles = {
  emptyWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
