import { useState } from "react";

const BookmarkModal = ({
  onSave,
  onClose,
}) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    onSave(name);
    setName("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Bookmark</h2>

        <input
          type="text"
          placeholder="Bookmark Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <button onClick={handleSave}>
            Save
          </button>

          <button
            onClick={onClose}
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookmarkModal;