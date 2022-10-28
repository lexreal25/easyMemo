import "./App.css";
// import { Sidebar } from "./component/sidebar/Sidebar";
import { Topbar } from "./component/topbar/Topbar";
import { Home } from "./pages/home/Home";
import { Memo } from "./pages/creatememo/Memo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Settings } from "./pages/settings/Settings";
import { MemoList } from "./pages/memoList/MemoList";
import { Login } from "./pages/login/Login";
import { useEffect, useState } from "react";
import { Sent } from "./pages/sentmemos/SentMemos";
import { Review } from "./pages/memostoreview/MemosToReview";
import { Received } from "./pages/receivedmemos/ReceivedMemos";
import { CopiedMemos } from "./pages/copiedmemo/Copied";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setCurrentUser(user?.currentUser.accessToken);
  }, []);

  if (currentUser === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/">
          <Route index element={<Received />} />
          <Route path="memo" element={<Memo />} />
          <Route path="edit/:userId" element={<Settings />} />
          <Route path="memo/:memoId" element={<MemoList />} />
          <Route path="login" element={<Login />} />
          <Route path="sent" element={<Sent />} />
          <Route path="review" element={<Review />} />
          <Route path="copied" element={<CopiedMemos />} />
          <Route path="received" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
