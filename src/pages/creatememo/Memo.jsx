import "./memo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { style } from "./boxstyle";
import { users } from "./userData";
import avatar from "../../assets/sig.JPG"
import file from "../../assets/scan.pdf"
export const Memo = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [signature, setSignature] = useState("");
  const [attachment, setAttachment] = useState("");

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
    <div className="memo">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* content display */}
        <Box className="box-main" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            MEMO (ID: loyalty-652-2022)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="header">
              <p>TO : {selectedValue}</p>
              <p>FROM : {from}</p>
              <p className="date">DATE : {date}</p>
              <p style={{ marginTop: "10px" }} className="pg">
                {" "}
                SUBJECT : <span>{subject} </span>
              </p>
            </div>
          </Typography>
          <Typography id="modal-modal-content" className="content">
            <div className="content-details">
              {/* content */}
              <div> {ReactHtmlParser(content)}</div>

              {/* end of content */}
              <div className="content-attachement"> Files:{file}</div>
            </div>
            <div
              className="sign"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p>Thank You</p>
              <span style={{display:'flex',flexDirection:'column'}}>
                {" "}
                signature:
                <img
                  src={avatar}
                  alt="signature"
                  style={{ width: "50px", height: "50px",objectFit:'contain' }}
                />{" "}
                
              </span>
              <p style={{ fontSize: "12px" }}>( DANIEL K. NAGAI )</p>
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
              onChange={(e) => setSelectedValue(e.target.value)}
              value={selectedValue}
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
            <label>Through:</label>
            <input
              type="text"
              className="memo-input"
              placeholder="If applicable"
            />
          </div>
          <div className="memo-div">
            <label>From:</label>
            <select
              className="to-selector"
              onChange={(e) => setFrom(e.target.value)}
              value={from}
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
              className="memo-input"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="textareal-field">
          <div className="memo-div">
            <label>Subject:</label>
            <input
              type="text"
              className="memo-input txt"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          {/* attach file */}
          <div className="memo-div-file" style={{ margin: "20px 0" }}>
            <label style={{ fontSize: "12px", fontFamily: "inherit" }}>
              Attach File(s):
            </label>
            <input
              type="file"
              multiple
              className="memo-input"
              onChange={(e) => setAttachment(e.target.value)}
            />
          </div>
          <div className="memo-div">
            <label style={{ fontSize: "12px", fontFamily: "inherit" }}>
              Attach signature
            </label>
            <input
              type="file"
              className="memo-input"
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
          <div className="memo-text-area">
            {/* helo there */}
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={handleChange}
            />
          </div>
          <div className="btn">
            <button className="prev" onClick={handleOpen}>
              PREVIEW
            </button>
            <button className="send">SEND</button>
          </div>
        </div>
      </form>
    </div>
  );
};
