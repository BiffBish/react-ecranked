import React, { useState } from "react";

export default function Component() {
  return (
    <div style={{ backgroundColor: "crimson", padding: "20px" }}>
      This a component
      <SubComponent color={"royalblue"} paddingValue={50} />
      <SubComponent color={"purple"} paddingValue={80} />
      <SubComponent color={"pink"} paddingValue={50} />
    </div>
  );
}

const SubComponent = ({ color, paddingValue }) => {
  return (
    <div style={{ backgroundColor: color, padding: paddingValue + "px" }}>
      {color}
      <SubSubComponent />
    </div>
  );
};

const SubSubComponent = () => {
  return (
    <div style={{ backgroundColor: "grey", padding: "20px" }}>
      Sub Sub Component
    </div>
  );
};
