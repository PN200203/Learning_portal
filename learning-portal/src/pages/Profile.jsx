import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <Sidebar />

        <div className="dashboard-content">

          <div className="profile-card">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
            />

            <h2>{user?.name}</h2>

            <p>{user?.email}</p>

            <div className="profile-info">

              <div>
                <h3>Courses</h3>
                <p>3</p>
              </div>

              <div>
                <h3>Bookmarks</h3>
                <p>10</p>
              </div>

              <div>
                <h3>Status</h3>
                <p>Active</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
};

export default Profile;