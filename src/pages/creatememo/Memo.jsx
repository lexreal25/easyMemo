import "./memo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "150mm",
  height: "150mm",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  background: "linear-gradient(pink,rgba(244, 241, 241, 0.75))",
  boxShadow: 24,
  p: 5,
};

//array of users
const users = [
  { id: 1, name: "..select.." },
  {
    id: 2,
    name: "EXECUTIVE DIRECTOR",
  },
  {
    id: 3,
    name: "MANAGING DIRECTOR",
  },
  {
    id: 4,
    name: "HR MANAGER",
  },
  {
    id: 5,
    name: "CFO",
  },
  {
    id: 6,
    name: "HEAD OF IT DEPARTMENT",
  },
  {
    id: 7,
    name: "HEAD OF MARKETING",
  },
];
export const Memo = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [signature, setSignature] = useState("");
  const [attachment, setAttachment] = useState("");
console.log(attachment)
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
            MEMO
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
              <div className="content-attachement"> Files:{attachment}</div>
            </div>
            <div
              className="sign"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p>Thank You</p>
              <span> Signature: {signature}</span>
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
