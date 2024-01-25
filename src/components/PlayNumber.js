import React from "react";

const PlayNumber = (props) => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
  >
    {props.number}
  </button>
);

// Color Theme
const colors = {
  available: "#8b8b8b",
  used: "#286c1d",
  wrong: "#f08080",
  candidate: "#008cbb",
};

export default PlayNumber;
