import React from "react";
import emptyimg from "../../assets/folder2.jpg"
export const Message = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={emptyimg} alt="imag" width={100} height={100} />
      <p>Empty</p>
    </div>
  );
};
