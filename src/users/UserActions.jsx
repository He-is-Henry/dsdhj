import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import { FaEllipsisV } from "react-icons/fa";

const UserActions = ({ user, setUsers }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { _id, roles } = user;

  const fetch = async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  };

  const handleError = (err) => {
    console.log(err);
    toast.error(err?.response?.data?.error || "Something went wrong");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${_id}`);
      toast.success("User deleted");
      fetch();
    } catch (err) {
      handleError(err);
    }
  };

  const handleMakeEditor = async () => {
    try {
      await axios.put(`/users/${_id}`, { role: "editor" });
      toast.success("Made editor");
      fetch();
    } catch (err) {
      handleError(err);
    }
  };

  const handleMakeAdmin = async () => {
    try {
      await axios.put(`/users/${_id}`, { role: "admin" });
      toast.success("Made admin");
      fetch();
    } catch (err) {
      handleError(err);
    }
  };

  const handleRevokeEditor = async () => {
    try {
      await axios.patch(`/users/${_id}`, { role: "editor" });
      toast.success("Editor revoked");
      fetch();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [dropUp, setDropUp] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 200) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [showMenu]);

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      <button
        ref={buttonRef}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <FaEllipsisV />
      </button>

      {showMenu && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: dropUp ? "auto" : "100%",
            bottom: dropUp ? "100%" : "auto",
            background: "white",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            borderRadius: 6,
            padding: 8,
            zIndex: 10,
          }}
        >
          {!roles.includes("admin") && (
            <>
              <button onClick={handleDelete} style={btnStyle}>
                Delete User
              </button>
              <button onClick={handleMakeEditor} style={btnStyle}>
                Make Editor
              </button>
              <button onClick={handleMakeAdmin} style={btnStyle}>
                Make Admin
              </button>
              {roles.includes("editor") && (
                <button onClick={handleRevokeEditor} style={btnStyle}>
                  Revoke Editor
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  display: "block",
  background: "#e0e0e0",
  padding: "6px 12px",
  marginBottom: 4,
  border: "none",
  borderRadius: 4,
  width: "100%",
  cursor: "pointer",
  textAlign: "left",
};

export default UserActions;
