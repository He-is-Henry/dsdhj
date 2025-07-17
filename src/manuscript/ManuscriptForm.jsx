import { useEffect, useState } from "react";
import "../styles/manuscriptForm.css";
import axios from "../api/axios";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";

const initialDataTemplate = {
  name: "",
  email: "",
  affiliation: "",
  institutionalAddress: "",
  discipline: "",
  country: "",

  title: "",
  type: "",
  keywords: [],
  abstract: "",
  references: "",

  coAuthors: [{ name: "", email: "" }],
  file: "",
};

const ManuscriptForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;
  const [stage, setStage] = useState(1);
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    if (isEdit) return;
    const saved = localStorage.getItem("manuscriptDraft");
    return saved ? JSON.parse(saved) : initialDataTemplate;
  });
  useEffect(() => {
    const fetchManuscript = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/manuscripts/${id}`);
        setFormData(res.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          setError("Manuscript does not exist");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit) fetchManuscript();
    else {
      const saved = localStorage.getItem("manuscriptDraft");
      if (saved) setFormData(JSON.parse(saved));
    }
  }, [id]);

  if (loading && isEdit)
    return <p> Fetching Manuscript, please wait a minute</p>;
  if (id && !formData && !loading) {
    console.log("Unable to get manuscript");
    return <h2>{error}</h2>;
  }

  const nextStage = () => {
    console.log(localStorage.getItem("manuscriptDraft"));
    saveDraft();
    setStage((prev) => prev + 1);
  };

  const prevStage = () => {
    saveDraft();
    setStage((prev) => prev - 1);
  };

  const saveDraft = () => {
    if (!isEdit)
      localStorage.setItem("manuscriptDraft", JSON.stringify(formData));
  };

  const clearDraft = () => {
    localStorage.removeItem("manuscriptDraft");
  };

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const submitData = isEdit
        ? { method: "patch", url: `/manuscripts/${formData._id}` }
        : { url: "/manuscripts", method: "post" };
      const res = await axios[submitData.method](submitData.url, {
        ...formData,
        coAuthors: formData.coAuthors || [],
      });
      console.log(res.data);
      clearDraft();
      setShow(true);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className="form-wrapper"
      style={{
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <p>Stage {stage} of 5</p>

      {stage === 1 && (
        <Stage1 data={formData} updateForm={updateForm} nextStage={nextStage} />
      )}

      {stage === 2 && (
        <Stage2
          data={formData}
          updateForm={updateForm}
          nextStage={nextStage}
          prevStage={prevStage}
        />
      )}

      {stage === 3 && (
        <Stage3
          data={formData}
          updateForm={updateForm}
          nextStage={nextStage}
          prevStage={prevStage}
        />
      )}

      {stage === 4 && (
        <Stage4
          formData={formData}
          setFormData={setFormData}
          onNext={nextStage}
          prevStage={prevStage}
        />
      )}

      {stage === 5 && (
        <Stage5
          formData={formData}
          id={id}
          prevStage={prevStage}
          isEdit={isEdit}
          setStage={setStage}
          error={error}
          show={show}
          setShow={setShow}
          submitting={submitting}
          handleFinalSubmit={handleFinalSubmit}
          updateForm={updateForm}
        />
      )}
    </div>
  );
};

export default ManuscriptForm;
