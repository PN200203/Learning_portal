const BookmarkList = ({
  bookmarks,
  onResume,
  onDelete,
}) => {
  if (bookmarks.length === 0) {
    return <p>No bookmarks available.</p>;
  }

  return (
    <>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bookmark-item"
        >
          <h4>
            {bookmark.bookmarkName || "Bookmark"}
          </h4>

          <p>
            {Math.floor(bookmark.timestamp / 60)}:
            {(bookmark.timestamp % 60)
              .toString()
              .padStart(2, "0")}
          </p>

          <button
            onClick={() =>
              onResume(bookmark.timestamp)
            }
          >
            Resume
          </button>

          <button
            onClick={() =>
              onDelete(bookmark.id)
            }
            style={{
              marginLeft: "10px",
            }}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </>
  );
};

export default BookmarkList;