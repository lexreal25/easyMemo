import "./settings.css";
import avatar from "../../assets/avatar.png";
import { BorderColor, PermIdentity } from "@material-ui/icons";
// import { Link } from "react-router-dom";
export const Settings = () => {
  return (
    <div className="settings">
      <div className="userSettingContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newuser">
          <button className="userAddBtn">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={avatar} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">DE-GRAFT AMOATENG</span>
              <span className="userShowTitle">HEAD OF IT DEPARTMENT</span>
            </div>
          </div>
          <div className="userShowBtm">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userIcon" />
              <span className="userShowInfoTitle">#14685</span>
            </div>
            <div className="userShowInfo">
              <BorderColor className="userIcon" />
              <span className="userShowInfoTitle">Signature</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>ID</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder="User Id"
                />
              </div>

              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder="Username"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder="User Role"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Signature</label>
                <input
                  type="file"
                  className="userUpdateInput"
                  placeholder="User Id"
                />
              </div>
              <button className="userUpdateBtn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
