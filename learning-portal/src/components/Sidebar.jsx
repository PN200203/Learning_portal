import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">🏠 Dashboard</Link>

      <Link to="/videos">🎥 Videos</Link>

      <Link to="/profile">👤 Profile</Link>

    </div>
  );
};

export default Sidebar;