import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>MENU</h3>

      <NavLink to="/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/books">📚 Books</NavLink>
      <NavLink to="/authors">✍️ Authors</NavLink>
      <NavLink to="/categories">🏷️ Categories</NavLink>
      <NavLink to="/students">👨‍🎓 Students</NavLink>
      <NavLink to="/issue-book">📖 Issue Book</NavLink>
      <NavLink to="/return-book">↩️ Return Book</NavLink>
      <NavLink to="/ai-assistant">🤖 AI Assistant</NavLink>
    </aside>
  );
}

export default Sidebar;
