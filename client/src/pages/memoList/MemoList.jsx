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

import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import "../../App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommentPdf } from "./CommentPdf";

const notify = (message) => toast.error(message);
// const success = (message) => toast.success(message);

export const MemoList = () => {
  const [open, setOpen] = useState(false);
  const [comments, setText] = useState("");
  const [options, setOptions] = useState("");
  const [memo, setMemo] = useState([]);
  const [comment, setComment] = useState([]);
  const [user, setUsers] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memoId = location.pathname.split("/")[2].toString();
  const { fname, lname, role } = useSelector((state) => state.user.currentUser);
  const sender = fname + " " + lname;

  const userkey = localStorage.getItem("userkey");
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    fetchData();
    fetchComment();
    users();
  }, [navigate, dispatch]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      setMemo(res.data);
    } catch (error) {}
  };

  const users = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/user/`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      setUsers(res.data);
    } catch (error) {
      notify(error.response.data);
    }
  };
  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/comment/`,
        {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setComment(res.data);
    } catch (error) {}
  };

  const memos = memo.find((item) => item.id === memoId);

  useEffect(() => {
    const creatpdf = async () =>
      await axios
        .post(`${process.env.REACT_APP_BASE_URI}/pdf/createpdf`, memos)
        .then((res) => {});
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
      });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URI}/comment/`,
        {
          receiver: options,
          memoId,
          comment: { message: comments, from: sender },
        },
        {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setOpen(false);
      setText("");
      setOptions("");
      setTimeout(() => {
        fetchComment(dispatch);
      }, 1000);
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

  const handleApprove = async () => {
    //update memo
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URI}/memo/update/${memos?.id}`,
        {
          status: "Approved",
          approvedby: role,
        },
        {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
    } catch (error) {
      notify(error.response.data);
    }
  };

  //download minutes
  let c = comment.filter((comment) => comment.memoId === memoId);
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
                {user.map((sender, i) => (
                  <option key={i} value={sender.role}>
                    {sender.role}
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
                    <div>
                      <p className="memoID">MEMO ID:({memos?.id})</p>
                      <div>
                        <span
                          style={{
                            color: "teal",
                            fontSize: "12px",
                            paddingRight: "5px",
                          }}
                        >
                          Status: {memos?.status}
                        </span>
                        <button
                          disabled={
                            memos?.status === "Pending" &&
                            (userkey === "executivedirector" ||
                              userkey === "manangingdirector")
                              ? ""
                              : "true"
                          }
                          onClick={handleApprove}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "green",
                        fontFamily: "'Ibarra Real Nova', serif",
                      }}
                    >
                      <img
                        src={
                          "http://res.cloudinary.com/lexreal1/image/upload/v1666785970/upload/gcd2hfmso4vvgtcl6ra4.png"
                        }
                        alt="logo"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                  <div className="header">
                    <p>
                      <span>TO</span> : {memos?.to}
                    </p>
                    <p>
                      <span>FROM</span> : {memos?.from.toUpperCase()}
                    </p>
                    <p>
                      <span>Cc</span> : {memos?.copy.toUpperCase()}
                    </p>
                    <p>
                      <span>THROUGH</span> : {memos?.through}
                    </p>
                    <p className="date">
                      <span>DATE</span> : {memos?.date.split("T")[0]}
                      {memos?.createdAt}
                    </p>
                    <p className="pg">
                      SUBJECT : <span>{memos?.subject || "No Subject"}</span>
                    </p>
                  </div>
                </Typography>
                <Typography className="content">
                  <div className="content-details">
                    <div className="cp-text">
                      {ReactHtmlParser(
                        `<p className="cp">${memos?.content}</p>`
                      )}
                    </div>
                    {memos?.files[0].file_name !== "" && (
                      <div
                        className="content-attachement"
                        style={{ fontSize: "12px", marginBottom: "10px" }}
                      >
                        {" "}
                        Attachments:
                        {memos?.files?.map((file, i) => (
                          <div key={i} style={{ marginTop: "4px" }}>
                            <span
                              style={{
                                fontSize: "15px",
                                textTransform: "uppercase",
                              }}
                            >
                              {file.file_name}:
                            </span>
                            <button
                              className="doc_atc"
                              onClick={() => window.open(file.url)}
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
                        src={memos?.signature}
                        alt="signature"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </span>
                    <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                      ( {memos?.sender} )
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
                MINUTES
              </span>
              <div className="add-comment" onClick={handleComment}>
                <div className="memo-addBtn">
                  <AddOutlined style={{ fontSize: "20px" }} />
                </div>
              </div>
              <CommentPdf data={c} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
