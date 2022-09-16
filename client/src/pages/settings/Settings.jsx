import "./settings.css";
import avatar from "../../assets/avatar.png";
import { BorderColor, PermIdentity } from "@material-ui/icons";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { useSelector } from "react-redux";
import "../../App.css";


export const Settings = () => {
  const { name, role, id } = useSelector((state) => state.user.currentUser);

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      
    }catch{}
  }
  return (
    <div className="container">
      <Sidebar />
      <div className="settings">
        <div className="userSettingContainer">
          <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={avatar} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{name}</span>
                <span className="userShowTitle">{role}</span>
              </div>
            </div>
            <div className="userShowBtm">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userIcon" />
                <span className="userShowInfoTitle">#{id}</span>
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
                    defaultValue={id}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Name</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    placeholder="Username"
                    defaultValue={name}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Role</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    placeholder="User Role"
                    defaultValue={role}
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
                <button className="userUpdateBtn" onclick={() => handleUpdate()}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
