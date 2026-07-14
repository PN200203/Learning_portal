import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const VideoDetails = () => {
  const { id } = useParams();

  const playerRef = useRef(null);

  const [video, setVideo] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkName, setBookmarkName] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [blurVideo, setBlurVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVideo();
    fetchBookmarks();
  }, [id]);

  // Blur when tab changes
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setBlurVideo(true);
        setPlaying(false);
      } else {
        setBlurVideo(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  // Disable Right Click
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener(
        "contextmenu",
        disableRightClick
      );
    };
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await API.get(`/videos/${id}`);
      setVideo(response.data.video);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await API.get(`/bookmarks/${id}`);
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  const saveBookmark = async () => {
    if (!bookmarkName.trim()) {
      alert("Enter Bookmark Name");
      return;
    }

    try {
      await API.post("/bookmarks", {
        userId: user.id,
        videoId: id,
        bookmarkName,
        timestamp: Math.floor(currentTime),
      });

      alert("Bookmark Saved");

      setBookmarkName("");

      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookmark = async (bookmarkId) => {
    try {
      await API.delete(`/bookmarks/${bookmarkId}`);

      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const jumpToBookmark = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
      setPlaying(true);
    }
  };

  if (!video) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">

          <h2>{video.title}</h2>

          <p>{video.description}</p>

          <div className="video-wrapper">

            <div
              className={`player-container ${
                blurVideo ? "blur" : ""
              }`}
            >
                    <iframe
  width="100%"
  height="500"
  src={`https://www.youtube.com/embed/${
    video.videoUrl.split("v=")[1].split("&")[0]
  }`}
  title={video.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
              

              <div className="watermark">
                {user?.email}
              </div>

            </div>

            <div className="bookmark-panel">

              <h3>Bookmarks</h3>

              <input
                type="text"
                placeholder="Bookmark Name"
                value={bookmarkName}
                onChange={(e) =>
                  setBookmarkName(e.target.value)
                }
              />

              <button onClick={saveBookmark}>
                Save Bookmark
              </button>

              <br />
              <br />

              {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="bookmark-item"
                  >
                    <h4>{bookmark.bookmarkName}</h4>

                    <p>
                      {Math.floor(bookmark.timestamp / 60)}:
                      {(bookmark.timestamp % 60)
                        .toString()
                        .padStart(2, "0")}
                    </p>

                    <button
                      onClick={() =>
                        jumpToBookmark(bookmark.timestamp)
                      }
                    >
                      Resume
                    </button>

                    <button
                      onClick={() =>
                        deleteBookmark(bookmark.id)
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>

                    <hr />
                  </div>
                ))
              ) : (
                <p>No bookmarks available.</p>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default VideoDetails;