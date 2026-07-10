"use client"

import { useEffect, useState } from "react";
import "../../styles/manuscriptForm.css";
import axios from "@/lib/axios";
import Stage1 from "@/components/manuscript/Stage1";
import Stage2 from "@/components/manuscript/Stage2";
import Stage3 from "@/components/manuscript/Stage3";
import Stage4 from "@/components/manuscript/Stage4";
import Stage5 from "@/components/manuscript/Stage5";
import { AxiosError } from "axios";

const initialDataTemplate: InitialManuscript = {
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
  slug: "",

  coAuthors: [{ name: "", email: "" }],
  file: "",
};


type Props = {
  id?: string
}

const ManuscriptForm = ({ id }: Props) => {
  const isEdit = !!id;
  const [stage, setStage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<InitialManuscript>(() => {
    if (isEdit || typeof window === "undefined") return initialDataTemplate;

    const saved = localStorage.getItem("manuscriptDraft");
    return saved ? JSON.parse(saved) : initialDataTemplate;
  });
  useEffect(() => {
    const fetchManuscript = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/manuscripts/${id}`);
        setFormData(res.data);
      } catch (e) {
        const err = e as AxiosError<{ error: string }>
        if (err?.response?.status === 404) {
          setError("Manuscript does not exist");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit) fetchManuscript();
  }, [id, isEdit]);

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

  const updateForm = (field: Field, value: Value) => {
    setFormData((prev: InitialManuscript) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      type SubmitData = {
        method: "patch" | "post",
        url: string
      }
      const submitData: SubmitData = isEdit
        ? { method: "patch", url: `/manuscripts/${formData._id}` }
        : { url: "/manuscripts", method: "post" };
      const res = await axios[submitData.method](submitData.url, {
        ...formData,
        coAuthors: formData.coAuthors || [],
      });
      console.log(res.data);
      clearDraft();
      setShow(true);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
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
