import { useMemo, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

const statusLabels = {
  "under-review": "Mark as Screened",
  accepted: "Approve Manuscript",
  rejected: "Reject Manuscript",
  paid: "Mark as Paid",
  publish: "Publish manuscript",
};

const ManuscriptActions = ({ manuscript, setManuscript }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const statusOptions = useMemo(() => {
    let base = {
      screening: ["under-review", "rejected"],
      "under-review": ["accepted", "rejected"],
      accepted: ["rejected"],
      rejected: ["accepted"],
    };
    if (user.roles.includes("admin")) {
      base = {
        ...base,
        paid: ["publish"],
        accepted: [...base.accepted, "paid"],
      };
    }
    return base;
  }, [user.roles]);
  const isAdmin = user.roles.includes("admin");
  const isEditor = user.roles.includes("editor");
  const canChangeStatus = isAdmin || isEditor;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(() => () => {});
  const navigate = useNavigate();
  const confirmAction = (message, actionFn) => {
    setModalMessage(message);
    setModalAction(() => actionFn);
    setModalOpen(true);
  };

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);
      let action = "review";
      if (newStatus === "publish") {
        action = "publish";
      }
      const res = await axios.patch(
        `/manuscripts/${action}/${manuscript._id}`,
        {
          status: newStatus,
        }
      );
      toast.success(`Status changed to '${newStatus}'`);
      if (action === "publish") return navigate("/manuscripts");
      setManuscript(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const availableOptions = statusOptions[manuscript.status] || [];

  if (!canChangeStatus || availableOptions.length === 0) return null;

  return (
    <div className="manuscript-actions">
      <ConfirmModal
        open={modalOpen}
        message={modalMessage}
        cancel={true}
        onConfirm={() => {
          modalAction();
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />

      <h4>Take Action</h4>

      <div className="action-group">
        <label>Choose an action:</label>
        <div className="status-buttons">
          {availableOptions.map((status) => (
            <button
              key={status}
              className="blue-button"
              onClick={() =>
                confirmAction(
                  `Are you sure you want to ${
                    statusLabels[status] || "change status"
                  }? ${
                    status === "under-review"
                      ? "This action cannot be undone"
                      : ""
                  }.`,
                  () => updateStatus(status)
                )
              }
              disabled={loading}
              type="button"
            >
              {statusLabels[status] || status}
            </button>
          ))}
        </div>
      </div>
      {manuscript.status === "screening" && (
        <div className="action-group">
          <label>Message to Author:</label>
          <textarea
            rows={3}
            placeholder="Enter message to author..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      {manuscript.status === "screening" && message.trim() && (
        <button
          className="blue-button"
          onClick={() =>
            confirmAction("Send this message to the author?", async () => {
              try {
                setLoading(true);
                await axios.patch(`/manuscripts/${manuscript._id}/message`, {
                  message,
                });
                toast.success("Message sent to author");
                setMessage("");
              } catch (err) {
                toast.error(
                  err?.response?.data?.error || "Failed to send message"
                );
              } finally {
                setLoading(false);
              }
            })
          }
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      )}
    </div>
  );
};

export default ManuscriptActions;
