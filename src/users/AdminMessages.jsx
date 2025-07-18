import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/messages");
      setMessages(res.data);
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to load messages");
    }
  };

  const handleReply = async (message) => {
    console.log(message.email);
    if (!replyText.trim()) return toast.error("Reply cannot be empty");
    try {
      await axios.post(`/messages/${message._id}`, {
        reply: replyText,
      });
      toast.success("Reply sent");
      setReplyText("");
      setReplyingTo(null);
      fetchMessages();
    } catch (err) {
      toast.error("Failed to send reply");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`/messages/${id}`);
      toast.success("Message deleted");
      fetchMessages();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-messages">
      <h2 className="title">Messages</h2>
      {messages.map((msg) => (
        <div key={msg._id} className="message-card">
          <p className="sender">
            <strong>
              {msg.firstname} {msg.lastname}
            </strong>{" "}
            ({msg.email})
          </p>
          <p className="message-text">{msg.message}</p>
          {msg.read && <p className="replied-status">✓ Replied</p>}

          {replyingTo === msg._id ? (
            <div className="reply-box">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="reply-textarea"
              />
              <button
                onClick={() => handleReply(msg)}
                className="btn btn-green"
              >
                Send Reply
              </button>
            </div>
          ) : (
            <div className="action-buttons">
              <button
                onClick={() => {
                  setReplyingTo(msg._id);
                  setReplyText("");
                }}
                className="btn btn-blue"
              >
                Reply
              </button>
              <button
                onClick={() => handleDelete(msg._id)}
                className="btn btn-red"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
