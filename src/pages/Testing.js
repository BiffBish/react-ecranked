/* eslint-disable */
import React, { useState } from "react";

export default function Component() {
  return null;
  // return (
  //   <div style={{ backgroundColor: "#e262c1", padding: "20px" }}>
  //     Biff is a cutie
  //     <SubComponent color={"#69c9a9"} paddingValue={20} />
  //     <SubComponent color={"#965ec7"} paddingValue={20} />
  //     <SubComponent color={"#b6dfd3"} paddingValue={20} />
  //     <SubComponent color={"#965ec7"} paddingValue={20} />
  //     <SubComponent color={"#69c9a9"} paddingValue={20} />
  //     <SubComponent2 color={"#565656"} paddingValue={20} />
  //   </div>
  // );
}
// {const [opacity, setOpacity] = React.useState("100%");

const SubComponent = ({ color, paddingValue }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: paddingValue + "px",
        opacity: "100%",
      }}
    >
      Biff is a cute little sub
      {" *boop*"}
      <SubSubComponent />
    </div>
  );
};

const SubComponent2 = ({ color, paddingValue }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: paddingValue + "px",
        opacity: "100%",
      }}
    >
      Love, Unusual
      {" *firSmooch*"}
    </div>
  );
};

const SubSubComponent = () => {
  return (
    <div style={{ backgroundColor: "teal", padding: "20x", opacity: "100%" }}>
      Biff is the cutest sub
    </div>
  );
};
