import { useState } from "react";
import "./memolist.css";
import { style } from "./boxstyle";
import Typography from "@mui/material/Typography";
import ReactHtmlParser from "react-html-parser";
import { AddOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { getComments } from "../../redux/apiCall";
import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import "../../App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => toast.error(message);
// const success = (message) => toast.success(message);

const senders = [
  {
    id: 1,
    name: "EXECUTIVE DIRECTOR",
  },
  {
    id: 2,
    name: "MANAGING DIRECTOR",
  },
  {
    id: 3,
    name: "CFO",
  },
  {
    id: 4,
    name: "HR MANAGER",
  },
  {
    id: 5,
    name: "HEAD OF IT",
  },
  {
    id: 6,
    name: "CORPORATE AFFAIRS",
  },
  {
    id: 7,
    name: "MARKETING",
  },
];
export const MemoList = () => {
  const [open, setOpen] = useState(false);
  const [comments, setText] = useState("");
  const [options, setOptions] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memoId = location.pathname.split("/")[2].toString();
  const { fname, lname } = useSelector((state) => state.user.currentUser);
  const sender = fname + " " + lname;
  
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  }, [navigate]);
  //fetch memo from redux
  const memos = useSelector((state) =>
    state.memo.Memo.find((item) => item.id === memoId)
  );
  const userComment = useSelector((state) => state.comment.comments);
  useEffect(() => {
    const creatpdf = async () =>
      await axios
        .post(`${process.env.REACT_APP_BASE_URI}/pdf/createpdf`, memos)
        .then((res) => {
          console.log(res.data);
        });
    creatpdf();
  }, [memos]);

  //download memo
  const download = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URI}/pdf/fetchpdf`, {
        responseType: "blob",
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "memo.pdf");
      })
      .then((err) => {
        notify(err.message);
        console.log(err);
      });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URI}/comment/`, {
        receiver: options,
        memoId,
        comment: { message: comments, from: sender },
      });
      setOpen(false);
      setText("");
      setOptions("");
      setTimeout(() => {
        getComments(dispatch);
      }, 1500);
    } catch (error) {
      notify(error.message);
    }
  };

  //open comment modal
  const handleComment = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  //select option
  const handleSelect = (e) => {
    e.preventDefault();
    setOptions(e.target.value);
  };
  return (
    <div className="container">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Sidebar />
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="send_to"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h6>SEND TO :</h6>
              <select
                className="select-opt"
                value={options}
                onChange={handleSelect}
              >
                {senders.map((sender) => (
                  <option key={sender.id} value={sender.name}>
                    {sender.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn">
              <button onClick={handleSend}>Send</button>
              <button onClick={handleClose}>X</button>
            </div>
          </div>
        </div>
        <div className="memolist-container">
          <div className="memo-page">
            <div className="memo-details">
              <div sx={style} className="content">
                <Typography variant="h6" component="h6">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className="memoID">MEMO ID:({memos.id})</p>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "green",
                        fontFamily: "'Ibarra Real Nova', serif",
                      }}
                    >
                      status: {memos.status}
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
                      <span>DATE</span> :{" "}
                      {memos.date.split("T")[0] || "no date"} {memos.createdAt}
                    </p>
                    <p className="pg">
                      SUBJECT : <span>{memos.subject || "No Subject"}</span>
                    </p>
                  </div>
                </Typography>
                <Typography className="content">
                  <div className="content-details">
                    <div className="cp-text">
                      {ReactHtmlParser(
                        `<p className="cp">${memos.content}</p>`
                      )}
                    </div>
                    {memos.files[0] !== '' && (
                      <div
                        className="content-attachement"
                        style={{ fontSize: "12px", marginBottom: "10px" }}
                      >
                        {" "}
                        Attachments:
                        {memos.files?.map((file, i) => (
                          <div key={i} style={{ marginTop: "4px" }}>
                            name of doc{" "}
                            <button
                              className="doc_atc"
                              onClick={() => window.open(file)}
                            >
                              View Document
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      ( {memos.sender} )
                    </p>
                  </div>
                </Typography>
                <button className="download-btn" onClick={download}>
                  Download PDF
                </button>
              </div>
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
              {userComment?.map(
                (comment, index) =>
                  comment.memoId === memoId && (
                    <div className="comment-details" key={index}>
                      <div className="comment-top">
                        <span className="cdate">
                          Date: {comment.createdAt.split("T")[0] || "no date"}
                        </span>
                        <span>|</span>
                        <span className="cid">
                          Time: {comment.createdAt.split("T")[1].split(".")[0]}
                        </span>
                      </div>
                      <span style={{ color: "#BD910E" }}>
                        @{comment.receiver}
                      </span>
                      <span>{comment.comment.message}</span>
                      <p>FROM: {comment.comment.from}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
