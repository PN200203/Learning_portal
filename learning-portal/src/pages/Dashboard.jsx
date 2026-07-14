import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const { user } = useAuth();

  return (
    <>

      <Navbar />

      <div className="dashboard">

        <Sidebar />

        <div className="dashboard-content">

          <h1>
            Welcome, {user?.name}
          </h1>

          <div className="cards">

            <div className="card">
              <h2>Total Videos</h2>
              <p>3</p>
            </div>

            <div className="card">
              <h2>Bookmarks</h2>
              <p>0</p>
            </div>

            <div className="card">
              <h2>Continue Learning</h2>
              <p>React Course</p>
            </div>

          </div>

        </div>

      </div>

    </>
  );
};

export default Dashboard;