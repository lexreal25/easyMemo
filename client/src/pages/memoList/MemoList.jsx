import Box from "@mui/material/Box";
import { useState } from "react";
import "./memolist.css";
import { style } from "./boxstyle";
import Typography from "@mui/material/Typography";
import ReactHtmlParser from "react-html-parser";
// import { Document, Page } from "react-pdf";
import { AddOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const MemoList = () => {
  const [open, setOpen] = useState(false);
  const [comments, setText] = useState("");
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const location = useLocation();
  const memoId = location.pathname.split("/")[2].toString();

  //fetch memo from redux
  const memos = useSelector((state) =>
    state.memo.Memo.find((item) => item.id === memoId)
  );
  console.log(memos.comment);
  const download = () => {};
  const handleSend = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/memo/update/${memos._id}`,
        { comment: { message: comments, by: "Amoateng De-Graft" } }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
    setText("");
    setOpen(false);
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
          value={comments}
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
              <Typography variant="h6" component="h6">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="memoID">MEMO ( ID:{memos.id} )</div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    status: APPROVED
                  </div>
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="header">
                  <p>
                    <span>TO</span> : {memos.to}
                  </p>
                  <p>
                    <span>FROM</span> : {memos.from}
                  </p>
                  <p className="date">
                    <span>DATE</span> : {memos.date.split("T")[0] || "no date"}
                  </p>
                  <p style={{ marginTop: "10px" }} className="pg">
                    {" "}
                    SUBJECT :{" "}
                    <span style={{ fontSize: "13px" }}>
                      {memos.subject || "No Subject"}
                    </span>
                  </p>
                </div>
              </Typography>
              <Typography className="content">
                <div className="content-details">
                  <div className="cp-text">
                    <p>{ReactHtmlParser(memos.content)}</p>
                  </div>
                  <div
                    className="content-attachement"
                    style={{ fontSize: "12px", marginBottom: "10px" }}
                  >
                    {" "}
                    Files:
                    {memos.files &&
                      memos.files.map((file, i) => (
                        <div key={i}>
                          <input
                            type="text"
                            contentEditable={false}
                            defaultValue={file}
                            style={{ margin: "5px" }}
                          />
                          <button>View</button>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className="sign"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span>
                    <img
                      src={memos.signature}
                      alt="signature"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </span>
                  <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                    ( DANIEL K. NAGAI )
                  </p>
                </div>
              </Typography>
              <button className="download-btn" onClick={download}>
                Download PDF
              </button>
            </Box>
            {/* <Document file={memos} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Document> */}
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
            {memos.comment.map((memo) => (
              <div className="comment-details">
                <div className="comment-top">
                  <span className="cid">ID:{memos.id}</span>
                  <span>|</span>
                  <span className="cdate">
                  {memos.date.split("T")[0] || "no date"}
                  </span>
                </div>
                <span>{memo.message}</span>
                <p>FROM: {memo.by}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
