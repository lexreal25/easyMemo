import "./App.css";
import { Sidebar } from "./component/sidebar/Sidebar";
import { Topbar } from "./component/topbar/Topbar";
import { Home } from "./pages/home/Home";
import { Memo } from "./pages/creatememo/Memo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Settings } from "./pages/settings/Settings";
import { MemoList } from "./pages/memoList/MemoList";
import { Login } from "./pages/login/Login";
import { useEffect } from "react";

function App() {
  // const user = () => localStorage.getItem("userDetails");
  // useEffect(() => {
  //   user();
  // }, []);
  const user = false
  return (
    <Router>
      {/* <Login /> */}
      {user ? (
        <>
          {" "}
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/memo" element={<Memo />} />
              <Route path="/edit/:userId" element={<Settings />} />
              <Route path="/memo/:memoId" element={<MemoList />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
