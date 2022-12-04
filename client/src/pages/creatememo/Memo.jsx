import "./memo.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import ReactHtmlParser from "react-html-parser";
import { style } from "./boxstyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../component/sidebar/Sidebar";
import "../../App.css";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => toast.error(message);
const success = (message) => toast.success(message);

export const Memo = () => {
  const [signature, setSignature] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [through, setThrough] = useState("");
  const [copy, setCopy] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [files, setFile] = useState([]);
  const [uploadedfile, setUploadedFile] = useState("");
  const [uploadsig, setUploadSig] = useState("");
  const [filename, setFileName] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { fname, lname, role } = useSelector(
    (state) => state.user?.currentUser
  );
  let name = fname + " " + lname;
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    genId();
    allUsers();
  }, [navigate]);

  //get all users
  const allUsers = async () => {
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
  //generate unique id for each memo
  const genId = async () => {
    const date = new Date();
    const val = Math.floor(1000 + Math.random() * 900);
    setId("loyalty-" + val.toString() + "-" + date.getFullYear());
  };

  //upload attachement
  const uploadDoc = async (e) => {
    e.preventDefault();
    if (files) {
      try {
        await Promise.all(
          Object.values(files).map(async (file) => {
            success("uploading document(s)...");
            const doc = new FormData();
            doc.append("file", file);
            doc.append("upload_preset", "upload");
            const uploadedFiles = await axios.post(
              `${process.env.REACT_APP_CLOUDINARY}`,
              doc,
              { reportProgress: true }
            );
            success("upload successful");
            let { url, original_filename } = uploadedFiles.data;
            setUploadedFile(url);
            setFileName(original_filename);
          })
        );
      } catch (error) {
        notify(error.message);
      }
    }
    return notify("Select file(s) to upload");
  };
  //attach signature
  const uploadSignature = async (e) => {
    e.preventDefault();
    if (signature === "") notify("Please upload your signature");
    else {
      success("Uploading signature....");
      const sig = new FormData();
      sig.append("file", signature);
      sig.append("upload_preset", "upload");
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_CLOUDINARY}`,
          sig,
          {
            reportProgress: true,
          }
        );
        const { url } = res.data;
        success("upload successful");
        setUploadSig(url);
      } catch (error) {
        notify(error.message);
      }
    }
  };
  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content === "") {
      notify("provide all fields");
    } else {
      success("Sending memo");
      try {
        const newMemo = {
          id,
          content,
          to,
          from: role,
          date,
          subject,
          through,
          copy,
          sender: name,
          signature: uploadsig,
          files: {
            file_name: filename,
            url: uploadedfile,
          },
        };
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/memo/memos`,
          newMemo,
          {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        );

        success("Memo sent successfully");
      } catch (err) {
        notify(err.message);
      }
      setTimeout(() => {
        clear();
        genId();
        navigate("/");
      }, 3000);
    }
  };
  const clear = () => {
    return (
      setTo(""),
      setThrough(""),
      setDate(""),
      setFile(""),
      setId(""),
      setSignature(""),
      setSubject(""),
      setContent(""),
      setCopy("")
    );
  };
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
                <p>FROM : {role}</p>
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
                <p style={{ fontSize: "12px" }}>( {fname + " " + lname} )</p>
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
                {users?.map((user) => (
                  <option
                    defaultValue={user.role}
                    key={user?.roleId}
                    value={user?.role}
                  >
                    {user.role.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="memo-div">
              <label>Cc:</label>
              <select
                className="to-selector"
                onChange={(e) => setCopy(e.target.value)}
                value={copy}
                name="copy"
              >
                {users?.map((user) => (
                  <option key={user.roleId} value={user?.role}>
                    {user?.role.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="memo-div">
              <label>Through:</label>
              <select
                className="to-selector"
                onChange={(e) => setThrough(e.target.value)}
                value={through}
                name="through"
              >
                {users?.map((user) => (
                  <option key={user.roleId} value={user.role}>
                    {user?.role.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="memo-div">
              <label>From:</label>
              <input
                type="text"
                className="memo-input"
                defaultValue={role}
                readOnly
              />
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
              config={
                {
                  // plugins: ['CKFinder' ],
                }
              }
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
