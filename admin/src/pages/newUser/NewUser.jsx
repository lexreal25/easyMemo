import { useState } from "react";
import "./newuser.css";
import axios from "axios";
// import { dispatch } from "react-redux"

export const NewUser = () => {
  const [state, setState] = useState({
    id: "",
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
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        state
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
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
          <label>Role ID</label>
          <select
            name="id"
            id="id"
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
    </div>
  );
};
