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
// import file from "../../assets/scan.pdf";
import axios from "axios";

export const Memo = () => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [through, setThrough] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [files, setFile] = useState("");
  const [signature, setSignature] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    genId();
  }, []);

  //generate unique id for each memo
  const genId = async () => {
    const val = Math.floor(1000 + Math.random() * 900);
    setId("loyalty-" + val.toString() + "-2022");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { id, content, to, from, date, subject };
    try {
      const res = axios.post("http://localhost:4000/api/memo/memos", data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    alert("sending...");
    setTimeout(() => {
      clear();
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
      setContent("")
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

  const handleChangeFile = (e) => {
    e.preventDefault();
    // let name = e.target.name;
    // let fileReader = new FileReader();
    // //get the actual file
    // let file = e.target.files[0];
    // fileReader.onload = () => {
    //   setFile([
    //     ...files,
    //     { file_name: name, uploaded_file: fileReader.result },
    //   ]);
    // };
    // fileReader.readAsDataURL(file);
  };
  const handleSignature = (e) => {
    const selectedFile = e.target.files[0];
    setSignature(selectedFile);
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview);
    console.log(filePreview);
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
            MEMO (ID:{id})
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="header">
              <p>TO : {to}</p>
              <p>FROM : {from}</p>
              <p>THROUGH : {through}</p>
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
              <span>{ReactHtmlParser(content)}</span>

              {/* end of content */}
              <div className="content-attachement">
                {" "}
                <span>File</span>:{}
              </div>
            </div>
            <div
              className="sign"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p>Thank You</p>
              <span style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                signature:
                {signature && (
                  <img
                    src={preview}
                    alt="signature"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                )}
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
              onChange={(e) => setTo(e.target.value)}
              value={to}
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
              value={through}
              onChange={(e) => setThrough(e.target.value)}
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
              className="memo-input txt"
              value={subject}
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
              name="documents"
              size={10240}
              multiple
              accept=".png .jpeg .pdf"
              className="memo-input"
              value={files}
              onChange={handleChangeFile}
            />
          </div>
          <div className="memo-div">
            <label style={{ fontSize: "12px", fontFamily: "inherit" }}>
              Attach signature
            </label>
            <input
              type="file"
              name="signature"
              size={1024}
              className="memo-input"
              value={signature}
              onChange={handleSignature}
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
            <button className="send" onClick={handleSubmit}>
              SEND
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
