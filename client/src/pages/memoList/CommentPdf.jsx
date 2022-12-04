import React, {  useRef } from "react";
import Pdf from "react-to-pdf";

export const CommentPdf = (props) => {
  const itemRef = useRef([]);
 
  return (
    <div style={{ float: "right", marginRight: "25px" }}>
      <div className="pdfcontainer" ref={itemRef}>
        {props.data?.map((c, i) => (
          <div
            className="comment-details"
            key={i}
            // ref={(el) => (itemRef.current[i] = el)}
            ref={itemRef}
            style={{ margin: "10px" }}
          >
            <div className="comment-top">
              <span className="cdate">
                Date: {c?.createdAt.split("T")[0]} |
              </span>
              <span className="cid">
                Time: {c?.createdAt.split("T")[1].split(".")[0]}
              </span>
            </div>
            <span style={{ color: "#BD910E" }}>@{c?.receiver}</span>
            <span>{c.comment?.message}</span>
            <p>FROM: {c.comment?.from}</p>
          </div>
        ))}
      </div>
      <Pdf targetRef={itemRef} filename="minute.pdf">
        {({ toPdf }) => (
          <button
            onClick={toPdf}
            style={{
              color: "GrayText",
              cursor: "pointer",
            }}
          >
            Download minutes
          </button>
        )}
      </Pdf>
    </div>
  );
};
