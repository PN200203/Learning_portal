import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const VideoDetails = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkName, setBookmarkName] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVideo();
    fetchBookmarks();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await API.get(`/videos/${id}`);
      setVideo(res.data.video);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await API.get(`/bookmarks/${id}`);
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.log(err);
    }
  };

  const saveBookmark = async () => {
    if (!bookmarkName.trim()) {
      alert("Enter bookmark name");
      return;
    }

    if (!timestamp) {
      alert("Enter timestamp in seconds");
      return;
    }

    try {
      const data = {
        userId: user.id,
        videoId: Number(id),
        bookmarkName,
        timestamp: Number(timestamp),
      };

      console.log(data);

      await API.post("/bookmarks", data);

      alert("Bookmark Saved");

      setBookmarkName("");
      setTimestamp("");

      fetchBookmarks();
    } catch (err) {
      console.log(err);
      alert("Failed to save bookmark");
    }
  };

  const deleteBookmark = async (bookmarkId) => {
    try {
      await API.delete(`/bookmarks/${bookmarkId}`);
      fetchBookmarks();
    } catch (err) {
      console.log(err);
    }
  };

  if (!video) return <h2>Loading...</h2>;

  const videoId = video.videoUrl.split("v=")[1].split("&")[0];

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">

          <h2>{video.title}</h2>
          <p>{video.description}</p>

          <div className="video-wrapper">

            <div className="player-container">

              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="watermark">
                {user.email}
              </div>

            </div>

            <div className="bookmark-panel">

              <h3>Bookmarks</h3>

              <input
                type="text"
                placeholder="Bookmark Name"
                value={bookmarkName}
                onChange={(e) => setBookmarkName(e.target.value)}
              />

              <br />
              <br />

              <input
                type="number"
                placeholder="Timestamp (seconds)"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />

              <br />
              <br />

              <button onClick={saveBookmark}>
                Save Bookmark
              </button>

              <br />
              <br />

              {bookmarks.length === 0 ? (
                <p>No bookmarks available.</p>
              ) : (
                bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bookmark-item">

                    <h4>{bookmark.bookmarkName}</h4>

                    <p>
                      {Math.floor(bookmark.timestamp / 60)}:
                      {(bookmark.timestamp % 60)
                        .toString()
                        .padStart(2, "0")}
                    </p>

                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}&t=${bookmark.timestamp}s`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button>Resume</button>
                    </a>

                    <button
                      style={{ marginLeft: 10 }}
                      onClick={() => deleteBookmark(bookmark.id)}
                    >
                      Delete
                    </button>

                    <hr />

                  </div>
                ))
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default VideoDetails;