import Box from "@mui/material/Box";
import { useState } from "react";
import "./memolist.css";
import { style } from "./boxstyle";
import Typography from "@mui/material/Typography";
//import ReactHtmlParser from "react-html-parser";
import { jsPDF } from "jspdf";
import { AddOutlined } from "@material-ui/icons";

export const MemoList = () => {
  // const [memo, setMemo] = useState("");
  const [open, setOpen] = useState(false);
  const [txt, setText] = useState("");
  const [content, setContent] = useState("");

  const download = () => {
    const doc = new jsPDF("portrait", "px", "a4", "false");
    doc.text(60, 60, "hello");
    doc.addPage();
    doc.save("a4.pdf");
  };
  const handleSend = () => {
    setContent(txt);
    setText("");
  };
  const handleComment = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="memolist">
      <div className={open ? "cTxt" : "cT"}>
        <textarea
          name=""
          cols="30"
          rows="10"
          value={txt}
          placeholder="comment here...."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="btn">
          <button onClick={handleSend}>Send</button>
          <button onClick={handleClose}>X</button>
        </div>
      </div>

      <div className="memolist-container">
        <div className="memo-page">
          <div className="memo-details">
            <Box sx={style}>
              <Typography variant="h6" component="h3">
                MEMO (ID: loyalty-652-2022)
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="header">
                  <p>TO : EXECUTIVE DIRECTOR</p>
                  <p>FROM : HEAD OF IT DEPARTMENT</p>
                  <p className="date">DATE : {Date()}</p>
                  <p style={{ marginTop: "10px" }} className="pg">
                    {" "}
                    SUBJECT :{" "}
                    <span>
                      REQUEST FOR PAYMENT OF MAINTENANCE FEE TO GEOLET CONSULT
                    </span>
                  </p>
                </div>
              </Typography>
              <Typography className="content">
                <div className="content-details">
                  {/* content */}
                  <div>
                    {/* {" "}
                  {ReactHtmlParser(
                    "Hello there how are you doing today and beyond Hello there how are you doing today and beyond Hello there how are you doing today and beyond Hello there how are you doing today and beyond"
                  )} */}
                    <p>
                      Hello there how are you doing today and beyond Hello there
                      how are you doing today and beyond Hello there how are you
                      doing today and beyond Hello there how are you doing today
                      and beyond.
                    </p>
                    <p>
                      Hello there how are you doing today and beyond Hello there
                      how are you doing today and beyond Hello there how are you
                      doing today and beyond Hello there how are you doing today
                      and beyond.
                    </p>
                    <p>
                      Hello there how are you doing today and beyond Hello there
                      how are you doing today and beyond Hello there how are you
                      doing today and beyond Hello there how are you doing today
                      and beyond.
                    </p>
                    <p>
                      Hello there how are you doing today and beyond Hello there
                      how are you doing today and beyond Hello there how are you
                      doing today and beyond Hello there how are you doing today
                      and beyond. Hello there how are you doing today and beyond
                      Hello there
                    </p>
                    <p>
                      Hello there how are you doing today and beyond Hello there
                      how are you doing today and beyond Hello there how are you
                      doing today and beyond Hello there how are you doing today
                      and beyond. Hello there how are you doing today and beyond
                      Hello there
                    </p>
                  </div>

                  {/* end of content */}
                  <div
                    className="content-attachement"
                    style={{ fontSize: "12px" }}
                  >
                    {" "}
                    Files:
                  </div>
                </div>
                <div
                  className="sign"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span style={{ fontSize: "12px" }}>Thank You</span>
                  <span style={{ fontSize: "12px" }}> Signature:</span>
                  <p style={{ fontSize: "12px" }}>( DANIEL K. NAGAI )</p>
                </div>
              </Typography>
              <button className="download-btn" onClick={download}>
                Download PDF
              </button>
            </Box>
          </div>
          {/* comments */}
          <div className="comments">
            <span
              style={{ borderBottom: "2px solid purple", color: "GrayText" }}
            >
              Comments
            </span>
            <div className="add-comment" onClick={handleComment}>
              <div className="memo-addBtn">
                <AddOutlined style={{ fontSize: "20px" }} />
              </div>
            </div>
            <div className="comment-details">
              <div className="comment-top">
                <span className="cid">ID: loyalty-652-2022</span>
                <span>|</span>
                <span className="cdate">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium aspernatur nulla officia debitis possimus incidunt
                totam corporis enim aperiam excepturi? Ex eligendi accusantium
                dolorem est temporibus porro ut alias tenetur?
              </span>
              <p>FROM: EXECUTIVE DIRECTOR</p>
            </div>
            <div className="comment-details">
              <div className="comment-top">
                <span className="cid">ID: loyalty-652-2022</span>
                <span>|</span>
                <span className="cdate">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium aspernatur nulla officia debitis possimus incidunt
                totam corporis enim aperiam excepturi? Ex eligendi accusantium
                dolorem est temporibus porro ut alias tenetur?
              </span>
              <p>FROM: HEAD OF IT</p>
            </div>
            <div className="comment-details">
              <div className="comment-top">
                <span className="cid">ID: loyalty-652-2022</span>
                <span>|</span>
                <span className="cdate">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium aspernatur nulla officia debitis possimus incidunt
                totam corporis enim aperiam excepturi? Ex eligendi accusantium
                dolorem est temporibus porro ut alias tenetur?
              </span>
              <p>FROM: CFO</p>
            </div>
            <div className="comment-details">
              <div className="comment-top">
                <span className="cid">ID: loyalty-652-2022</span>
                <span>|</span>
                <span className="cdate">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <span>{content}</span>
              <p>FROM: HR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
