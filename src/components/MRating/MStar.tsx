import React from "react";
import "./MStar.scss";

const Star = ({ filled }) => {
  return <span className={`star ${filled ? "filled" : ""}`}>&#9733;</span>;
};

export default Star;
