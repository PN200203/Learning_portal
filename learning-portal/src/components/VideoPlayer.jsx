import { useEffect } from "react";

const VideoPlayer = ({
  video,
  userEmail,
  blurVideo,
  playing,
  setPlaying,
  setCurrentTime,
}) => {
  if (!video) {
    return <h2>Loading...</h2>;
  }

  // Check if the video is from YouTube
  const isYoutube =
    video.videoUrl.includes("youtube.com") ||
    video.videoUrl.includes("youtu.be");

  // Extract YouTube Video ID
  let youtubeId = "";

  if (isYoutube) {
    if (video.videoUrl.includes("watch?v=")) {
      youtubeId = video.videoUrl.split("watch?v=")[1].split("&")[0];
    } else if (video.videoUrl.includes("youtu.be/")) {
      youtubeId = video.videoUrl.split("youtu.be/")[1].split("?")[0];
    }
  }

  // Pause when browser tab changes
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setPlaying(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [setPlaying]);

  return (
    <div
      className={`player-container ${
        blurVideo ? "blur" : ""
      }`}
    >
      {isYoutube ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer;
                 autoplay;
                 clipboard-write;
                 encrypted-media;
                 gyroscope;
                 picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          width="100%"
          height="500"
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) =>
            setCurrentTime(e.target.currentTime)
          }
        >
          <source
            src={video.videoUrl}
            type="video/mp4"
          />

          Your browser does not support HTML5 video.
        </video>
      )}

      {/* Watermark */}
      <div className="watermark">
        {userEmail}
      </div>
    </div>
  );
};

export default VideoPlayer;