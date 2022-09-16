import "./memo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { style } from "./boxstyle";
import { users } from "./userData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../component/sidebar/Sidebar";
import "../../App.css";
import { useSelector } from "react-redux";

export const Memo = () => {
  const [signature, setSignature] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [through, setThrough] = useState("");
  const [copy, setCopy] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [files, setFile] = useState([]);
  const [uploadedfile, setUploadedFile] = useState("");
  const [uploadsig, setUploadSig] = useState("");
  const [filename, setFileName] = useState("");

  const navigate = useNavigate();
  const username = useSelector((state) =>state.user.currentUser?.name)

  useEffect(() => {
    if(localStorage.getItem("token") === null){
      navigate("/login")
    }
    genId();
  }, [navigate]);
  //generate unique id for each memo
  const genId = async () => {
    const date = new Date();
    const val = Math.floor(1000 + Math.random() * 900);
    setId("loyalty-" + val.toString() + "-" + date.getFullYear());
  };
  //upload attachement
  const uploadDoc = async (e) => {
    e.preventDefault();
    try {
      if (files) {
        await Promise.all(
          Object.values(files).map(async (file) => {
            const doc = new FormData();
            doc.append("file", file);
            doc.append("upload_preset", "upload");
            const uploadedFiles = await axios.post(
              `${process.env.REACT_APP_CLOUDINARY}`,
              doc,
              { reportProgress: true }
            );
            let { url, original_filename } = uploadedFiles.data;
            setUploadedFile(url);
            setFileName(original_filename);
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //attach signature
  const uploadSignature = async (e) => {
    e.preventDefault();
    const sig = new FormData();
    sig.append("file", signature);
    sig.append("upload_preset", "upload");
    try {
      const res = await axios.post(`${process.env.REACT_APP_CLOUDINARY}`, sig, {
        reportProgress: true,
      });
      const { url } = res.data;
      setUploadSig(url);
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };
  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMemo = {
        id,
        content,
        to,
        from,
        date,
        subject,
        copy,
        signature: uploadsig,
        files: uploadedfile,
      };
      await axios.post(`${process.env.REACT_APP_BASE_URL}/memo/memos`, newMemo);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      clear();
      genId();
      navigate("/");
    }, 3000);
  };
  const clear = () => {
    return (
      setTo(""),
      setThrough(""),
      setDate(""),
      setFile(""),
      setFrom(""),
      setId(""),
      setSignature(""),
      setSubject(""),
      setContent(""),
      setCopy("")
    );
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="memo">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* content display */}
          <Box className="box-main" overflow="scroll" sx={style}>
            <p> MEMO (ID:{id})</p>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="header">
                <p>TO : {to}</p>
                <p>FROM : {from}</p>
                <p style={{ textTransform: "uppercase" }}>
                  THROUGH : {through}
                </p>
                <p>
                  Cc :{" "}
                  <span style={{ textTransform: "uppercase" }}>{copy}</span>{" "}
                </p>
                <p className="date">DATE : {date}</p>
                <p style={{ marginTop: "10px" }} className="pg">
                  {" "}
                  SUBJECT :{" "}
                  <span style={{ textTransform: "uppercase" }}>{subject}</span>
                </p>
              </div>
            </Typography>
            <Typography id="modal-modal-content" className="content">
              <div className="content-details">
                {/* content */}
                <span>{ReactHtmlParser(content)}</span>
              </div>
              <div
                className="sign"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  signature:
                  {signature && (
                    <img
                      src={URL.createObjectURL(signature)}
                      alt="signature"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </span>
                <p style={{ fontSize: "12px" }}>( {username} )</p>
              </div>
            </Typography>
          </Box>
          {/* end of content display section */}
        </Modal>
        <h3 style={{ fontFamily: "sans-serif" }}>MEMO</h3>
        <form className="memo-form">
          <div className="memo-container">
            <div className="memo-div">
              <label>To:</label>
              <select
                className="to-selector"
                onChange={(e) => setTo(e.target.value)}
                value={to}
                name="to"
              >
                {users.map((user) => (
                  <option
                    defaultValue={user.default}
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="memo-div">
              <label>Cc:</label>
              <input
                type="text"
                className="memo-input"
                placeholder="If applicable"
                value={copy}
                name="copy"
                onChange={(e) => setCopy(e.target.value)}
              />
            </div>
            <div className="memo-div">
              <label>Through:</label>
              <input
                type="text"
                className="memo-input"
                placeholder="If applicable"
                value={through}
                name="through"
                onChange={(e) => setThrough(e.target.value)}
              />
            </div>
            <div className="memo-div">
              <label>From:</label>
              <select
                className="to-selector"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
                name="from"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="memo-div">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                className="memo-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="textareal-field">
            <div className="memo-div">
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                className="memo-input txt"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            {/* attach file */}
            <div className="memo-div">
              <label>Add Files:</label>
              <input
                type="file"
                name="signature"
                size={1024}
                className="memo-input"
                // value={signature}
                onChange={(e) => setFile(e.target.files)}
              />
              <button className="btn_upload" onClick={uploadDoc}>
                UPLOAD
              </button>
            </div>
          </div>
          <div className="memo-div">
            <label>Signature:</label>
            <input
              type="file"
              name="signature"
              size={1024}
              className="memo-input"
              // value={signature}
              onChange={(e) => setSignature(e.target.files[0])}
            />
            <button className="btn_upload" onClick={uploadSignature}>
              UPLOAD
            </button>
          </div>
          <div className="memo-text-area">
            {/* helo there */}
            <CKEditor
              editor={ClassicEditor}
              data={content}
              config={{
                ckfinder: {},
              }}
              onChange={handleChange}
            />
          </div>
          <div className="btn">
            <button className="prev" onClick={handleOpen}>
              PREVIEW
            </button>
            <button className="send" onClick={handleSubmit}>
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
