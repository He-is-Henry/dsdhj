import { useRef, useState } from "react";
import { useAuth } from "../context/UserContext";
import { FaCamera, FaUserAlt } from "react-icons/fa";
import axios from "../api/axios";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [uploadMsg, setUploadMsg] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (user.avatar) {
        setUploadMsg("Deleting previous avatar...");
        try {
          await axios.delete(
            `/files/delete?url=${encodeURIComponent(user.avatar)}&type=image`
          );
        } catch (deleteErr) {
          console.warn("Delete failed, continuing upload:", deleteErr);
        }
      }

      setUploadMsg("Uploading new avatar...");
      const formData = new FormData();
      formData.append("avatar", file);

      const uploadRes = await axios.post("/files/avatar", formData, {
        withCredentials: true,
      });

      const newAvatarUrl = uploadRes.data?.url;
      if (!newAvatarUrl) throw new Error("Upload failed");

      setUploadMsg("Saving profile...");

      setUser({ ...user, avatar: newAvatarUrl });
      setUploadMsg("Avatar updated ✅");
    } catch (err) {
      console.error("Avatar upload failed:", err);
      setUploadMsg("❌ Avatar upload failed");
    } finally {
      setTimeout(() => setUploadMsg(""), 3000);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="profile-container">
      <div className="image-container">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Avatar"
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <FaUserAlt size={80} className="avatar-icon" />
        )}

        <label htmlFor="img">
          <FaCamera size={20} className="camera" />
        </label>

        <input
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          className="img-input"
          id="img"
          accept="image/*"
        />
      </div>

      <p style={{ color: "#555", fontStyle: "italic" }}>{uploadMsg}</p>

      <p>
        {user.firstname} {user.lastname}
      </p>

      <p>
        {user.roles.map((role, index) => (
          <span
            key={index}
            style={{
              display: "block",
              textTransform: "capitalize",
              marginBottom: "4px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {role}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Profile;
