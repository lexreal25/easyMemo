import { useEffect } from "react";
import { Sidebar } from "../../component/sidebar/Sidebar";
import { Table } from "../../component/table/Table";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "../../App.css";
import { allComments } from "../../redux/commentRedux";
import axios from "axios";
import { getMemoSuccess } from "../../redux/memoRedux";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const userid = useSelector((state) =>
    state.user.currentUser?.role.replace(/ +/g, "").toLowerCase()
  );

  localStorage.setItem("userkey", userid);

  const filteredMemos = useSelector((state) =>
    state.memo.Memo?.filter(
      (memo) =>
        memo.to.replace(/ +/g, "").toLowerCase() === userid
    )
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/memo/`,{
          headers:{
            token:"Bearer "+JSON.parse(localStorage.getItem('token')),
          }
        });
        dispatch(getMemoSuccess(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URI}/comment/`
        );
        dispatch(allComments(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar />
      <div className="home">
        <Table info={filteredMemos} />
      </div>
    </div>
  );
};
