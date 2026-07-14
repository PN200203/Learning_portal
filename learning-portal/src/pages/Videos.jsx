import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await API.get("/videos");
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Videos...
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          <h1>Learning Videos</h1>

          {/* Search Box */}
          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="video-grid">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div className="video-card" key={video.id}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                  />

                  <h3>{video.title}</h3>

                  <p>{video.description}</p>

                  <p>
                    <strong>Duration:</strong> {video.duration}
                  </p>

                  <button
                    onClick={() => navigate(`/video/${video.id}`)}
                  >
                    ▶ Watch Video
                  </button>
                </div>
              ))
            ) : (
              <h2>No videos found.</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;