import "./App.css";
import { Sidebar } from "./component/sidebar/Sidebar";
import { Topbar } from "./component/topbar/Topbar";
import { Home } from "./pages/home/Home";
import { Memo } from "./pages/creatememo/Memo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pendingmemo } from "./pages/pendingmemo/Pendingmemo";
import { Archives } from "./pages/archives/Archives";
import { Settings } from "./pages/settings/Settings";
import { MemoList } from "./pages/memoList/MemoList";
import { NewUser } from "./pages/newUser/NewUser";
import { Users } from "./pages/signatories/Users";

function App() {
  return (
    <Router >
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/pending" element={<Pendingmemo />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/archives" element={<Archives />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/edit/:userId" element={<Settings />} />
          <Route path="/settings" element={<NewUser />} />
          <Route path="/memo/:memoId" element={<MemoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
