import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/students" element={<Students />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/issue-book" element={<IssueBook />} />
            <Route path="/return-book" element={<ReturnBook />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
