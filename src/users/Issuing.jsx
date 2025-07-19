import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
const status = { true: "open to submissions.", false: "closed." };

const Issuing = () => {
  const [currentIssue, setCurrentIssue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newIssue, setNewIssue] = useState(0);
  const [active, setActive] = useState(true);
  const inputRef = useRef(null);
  const handleStatusToggle = () => {
    setOpen(true);
    setOnConfirm(() => () => handleIssueStatus());
    const msg = active
      ? "Are you sure you want to close this issue?"
      : "Reactivate this issue?";
    setMessage(msg);
  };

  useEffect(() => {
    const getCurrentIssue = async () => {
      try {
        const { data } = await axios.get("/issues/");
        setCurrentIssue(data.issue);
        setActive(data.active);
      } catch (err) {
        toast.error("Failed to fetch current issue");
      } finally {
        setLoading(false);
      }
    };
    getCurrentIssue();
  }, []);

  const getNewIssue = async (payload = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.patch("/issues", payload);
      setCurrentIssue((prev) =>
        data.acknowledged ? prev + 1 : data.issue ?? prev
      );
      toast.success("Issue updated");
    } catch (err) {
      toast.error("Failed to update issue");
    } finally {
      setLoading(false);
      setOpen(false);
      setShowForm(false);
    }
  };

  const handleNewIssue = (issue) => {
    setOpen(true);
    setMessage(
      "Are you sure you want to send a new issue?\nThis is a very sensitive action."
    );
    const payload = Number(issue) ? { issue } : {};
    setOnConfirm(() => () => getNewIssue(payload));
  };

  const handleManualIssueChange = (e) => {
    e.preventDefault();
    if (Number(newIssue) <= 0) return toast.error("Invalid issue number");
    handleNewIssue(newIssue);
  };

  const handleIssueStatus = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put("/issues");
      setActive(data.active);
      toast.success(`Issue ${data.active ? "opened" : "closed"}`);
    } catch {
      toast.error("Status toggle failed");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div
      style={{
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : "auto",
      }}
    >
      <h3>This issue is currently {status[active]} </h3>
      <ConfirmModal
        message={message}
        onConfirm={onConfirm}
        open={open}
        cancel={true}
        onCancel={() => setOpen(false)}
      />

      {loading ? (
        <p style={{ fontStyle: "italic", color: "#64748b" }}>
          Loading current issue...
        </p>
      ) : (
        <>
          <p>
            Current Volume: <span>{new Date().getFullYear() - 2022}</span>
          </p>
          <p>
            <strong>Current issue: </strong>
            <span>{currentIssue}</span>
          </p>

          <button className="blue-button" onClick={() => handleNewIssue()}>
            Call for a new issue
          </button>

          <div style={{ margin: "20px" }}>
            {!showForm && (
              <button className="blue-button" onClick={() => setShowForm(true)}>
                Enter a number
              </button>
            )}
            {showForm && (
              <form onSubmit={handleManualIssueChange}>
                <h2>Enter a custom issue number</h2>
                <input
                  ref={inputRef}
                  type="number"
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    margin: "0.5rem 0 1rem",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "1rem",
                    backgroundColor: "#fff",
                  }}
                />
                <button className="blue-button" disabled={loading}>
                  Submit
                </button>
                <button
                  type="reset"
                  onClick={() => setShowForm(false)}
                  style={{ backgroundColor: "crimson" }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          <button className="blue-button" onClick={handleStatusToggle}>
            {active ? "Close Issue" : "Open Issue"}
          </button>
        </>
      )}
    </div>
  );
};

export default Issuing;
