"use client"

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/UserContext";
import ConfirmModal from "../ui/ConfirmModal";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const statusLabels = {
  "under-review": "Mark as Screened",
  accepted: "Approve Manuscript",
  rejected: "Reject Manuscript",
  paid: "Mark as Paid",
  publish: "Publish manuscript",
};

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const validateSlug = (slug: string) => {
  if (!slug || !slug.trim()) return "Slug is required";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    return "Slug must be lowercase letters, numbers, and hyphens only";
  return "";
};

type Props = {
  manuscript: Manuscript,
  setManuscript: Dispatch<SetStateAction<Manuscript | null>>
}


type AllowedStatuses = keyof typeof statusLabels;


type StatusOptions = {
  screening: AllowedStatuses[],
  "under-review": AllowedStatuses[],
  accepted: AllowedStatuses[],
  rejected: AllowedStatuses[],
  paid?: AllowedStatuses[]
}


const ManuscriptActions = ({ manuscript, setManuscript }: Props) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [slugModalOpen, setSlugModalOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState("");


  const statusOptions = useMemo(() => {

    let base: StatusOptions = {
      screening: ["under-review", "rejected"],
      "under-review": ["accepted", "rejected"],
      accepted: ["rejected"],
      rejected: ["accepted"],
    };
    if (user?.roles.includes("admin")) {
      base = {
        ...base,
        paid: ["publish"],
        accepted: [...base.accepted, "paid"],
      };
    }
    return base;
  }, [user?.roles]);
  const isAdmin = user?.roles.includes("admin");
  const isEditor = user?.roles.includes("editor");
  const canChangeStatus = isAdmin || isEditor;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => () => { })
  const router = useRouter();

  const confirmAction = (message: string, actionFn: () => void) => {
    setModalMessage(message);
    setModalAction(() => actionFn);
    setModalOpen(true);
  };

  const updateStatus = async (newStatus: string, slugValue?: string) => {
    try {
      setLoading(true);
      let action = "review";
      if (newStatus === "publish") {
        action = "publish";
      }
      const body: {
        status: string,
        slug?: string
      } = { status: newStatus };
      if (newStatus === "publish") body.slug = slugValue;

      const res = await axios.patch(
        `/manuscripts/${action}/${manuscript._id}`,
        body,
      );
      console.log(`Status changed to '${newStatus}'`);
      toast.success(`Status changed to '${newStatus}'`);

      if (action === "publish") return router.push("/manuscripts");
      const updatedManuscript = res.data;
      console.log(updatedManuscript);
      setManuscript(updatedManuscript);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      toast.error(err?.response?.data?.error || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const onActionClick = (status: keyof typeof statusLabels) => {

    if (status === "publish") {
      setSlug(slugify(manuscript.title));
      setSlugError("");
      setSlugModalOpen(true);
      return;
    }
    confirmAction(
      `Are you sure you want to ${statusLabels[status] || "change status"}? ${status === "under-review" ? "This action cannot be undone" : ""
      }.`,
      () => updateStatus(status),
    );
  };

  const publishWithSlug = async (cleanedSlug: string) => {
    try {
      setLoading(true);
      await axios.patch(`/manuscripts/publish/${manuscript._id}`, {
        status: "publish",
        slug: cleanedSlug,
      });
      toast.success("Manuscript published");
      router.push("/manuscripts");
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      const msg = err?.response?.data?.error || "Failed to publish";
      setSlugError(msg);
      setSlugModalOpen(true); // reopen so they can fix it in place
    } finally {
      setLoading(false);
    }
  };

  const handleSlugContinue = () => {
    const cleaned = slugify(slug);
    const err = validateSlug(cleaned);
    if (err) {
      setSlugError(err);
      return;
    }
    setSlugModalOpen(false);
    confirmAction(
      `Publish this manuscript with slug "${cleaned}"? This cannot be undone.`,
      () => publishWithSlug(cleaned),
    );
  };

  const availableOptions: AllowedStatuses[] = statusOptions[manuscript.status as keyof StatusOptions] || [];

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

      {slugModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3 className="modal-title">Choose a URL slug</h3>
            <p className="modal-message">
              This will be used in the public link for this manuscript.
            </p>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugError("");
              }}
              placeholder="e.g. climate-effects-on-soil"
            />
            {slugError && (
              <p style={{ color: "crimson", fontSize: "0.9rem" }}>
                {slugError}
              </p>
            )}
            <div className="modal-actions">
              <button
                className="modal-button cancel-button"
                onClick={() => setSlugModalOpen(false)}
              >
                Cancel
              </button>
              <button className="modal-button" onClick={handleSlugContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <h4>Take Action</h4>

      <div className="action-group">
        <label>Choose an action:</label>
        <div className="status-buttons">
          {availableOptions.map((status) => (
            <button
              key={status}
              className="blue-button"
              onClick={() => onActionClick(status)}
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
              } catch (e) {
                const err = e as AxiosError<{ error: string }>
                toast.error(
                  err?.response?.data?.error || "Failed to send message",
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
