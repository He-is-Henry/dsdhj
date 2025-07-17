import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

const Issuing = () => {
  const [currentIssue, setCurrentIssue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newIssue, setNewIssue] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const getCurrentIssue = async () => {
      const response = await axios.get("/issues/");
      setLoading(false);
      setCurrentIssue(response.data);
    };
    getCurrentIssue();
  }, []);

  const getNewIssue = async (payload = {}) => {
    const response = await axios.patch("/issues", payload);
    setCurrentIssue((prev) =>
      response.data.acknowledged
        ? prev + 1
        : response?.data?.issue
        ? response.data.issue
        : prev
    );
    console.log(response.data);
    setOpen(false);
    setShowForm(false);
  };
  const handleNewIssue = (issue) => {
    setOpen(true);
    setMessage(
      "Are you sure you want to send a new issue?..\nThis is a very sensitive action"
    );
    const payload = Number(issue) ? { issue } : {};
    console.log(payload);
    setOnConfirm(() => () => getNewIssue(payload));
  };
  const handleManualssueChange = async (e) => {
    e.preventDefault();
    if (Number(newIssue) < 0)
      return toast.error("Cannot send a negative value");
    if (Number(newIssue) === 0) return toast.error("Issue cannot be 0");
    handleNewIssue(newIssue);
  };
  return (
    <div>
      <ConfirmModal
        message={message}
        onConfirm={onConfirm}
        open={open}
        cancel={true}
        onCancel={() => setOpen(false)}
      />
      <p>
        Current Volume: <span>{new Date().getFullYear() - 2022}</span>
      </p>
      <p>
        <strong>Current issue: </strong>
        <span>{loading ? "loading" : currentIssue}</span>
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
          <form onSubmit={handleManualssueChange}>
            <h2>Enter a custom issue number</h2>
            <input
              ref={inputRef}
              type="number"
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
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
            <button className="blue-button">Submit</button>
            <button
              type="reset"
              onClick={() => setShowForm(false)}
              style={{ backgroundColor: "crimson" }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Issuing;
