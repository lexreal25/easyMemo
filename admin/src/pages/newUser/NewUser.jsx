import { useState } from "react";
import "./newuser.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//error handling
const notify = (message) => toast.error(message);
const success = (message) => toast.success(message);

export const NewUser = () => {
  const [state, setState] = useState({
    roleId: "",
    fname: "",
    lname: "",
    role: "",
    password: "",
  });
  //  const dispatch = useDispatch();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.fname ||
      state.lname ||
      state.role ||
      state.roleId ||
      state.password !== ""
    ) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/register`,
          state
        );
        success("User registered successfully");
      } catch (error) {
        notify(error.response.data);
      }
    } else {
      notify("Please complete all fields");
    }
    setState({...state === ""})
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            placeholder="Enter first name "
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            placeholder="Last name"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <input
            type="text"
            name="role"
            placeholder="enter user role"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            autoComplete="true"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Signature</label>
          <input
            type="file"
            name="signature"
            placeholder="upload signature"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Role ID</label>
          <select
            name="roleId"
            roleId="roleId"
            className="newUserSelect"
            autoComplete="true"
            onChange={handleChange}
          >
            <option value="defalt">Select</option>
            <option value="ed">ED</option>
            <option value="md">MD</option>
            <option value="it">IT</option>
            <option value="au">AU</option>
            <option value="cfo">CFO</option>
            <option value="hr">HR</option>
            <option value="hsm">HSM</option>
            <option value="hbd">HBD</option>
          </select>
        </div>
        <button className="newUserBtn" onClick={handleSubmit}>
          Create
        </button>
      </form>
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
    </div>
  );
};
