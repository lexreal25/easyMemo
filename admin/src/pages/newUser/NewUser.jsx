import { useState } from "react";
import "./newuser.css";
import axios from "axios"
import { dispatch } from "react-redux"


export const NewUser = () => {

  const [state, setState] = useState({
    id: "",
    name: "",
    role: "",
    password: "",
    signature: "",
    active: "",
  });
//  const dispatch = useDispatch();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
 const handleSubmit =async (e) => {
  e.preventDefault();
  console.log({name:state.name})
  try {
    const res = await axios.post(`${process.env.BASE_URL}/register`,...state)
    console.log(res.data)
  } catch (error) {
    
  }
 }
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
            autoComplete="true"
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
            autoComplete="true"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserBtn" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};
