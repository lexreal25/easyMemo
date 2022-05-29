import { useState } from "react";
import "./newuser.css";
export const NewUser = () => {
  const [state, setState] = useState({
    id: "",
    name: "",
    role: "",
    password: "",
    signature: "",
    active: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>ID</label>
          <input
            type="text"
            name="id"
            placeholder="user id "
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="De-Graft Amoateng"
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
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Signature</label>
          <input type="file" name="signature" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select
            name="active"
            id="active"
            className="newUserSelect"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserBtn" type="submit">Create</button>
      </form>
    </div>
  );
};
