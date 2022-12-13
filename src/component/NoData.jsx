import React from "react";
import NoDataIcon from "../assets/nodata.png";
import { css } from "@emotion/react";
const NoData = () => {
  return (
    <div css={styles.emptyWrapper}>
      <img src={NoDataIcon} alt="nodata" css={styles.noDataImg} />

      <p className="text-white mt-2">
        There is no data related with your account
      </p>
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
  noDataImg: css`
    border-radius: 50%;
  `,
};
