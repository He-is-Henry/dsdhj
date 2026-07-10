"use client"
import { useEffect, useState } from "react";
import "@/styles/manuscriptForm.css";
import axios from "@/lib/axios";
import Stage1 from "@/components/manuscript/Stage1";
import Stage2 from "@/components/manuscript/Stage2";
import Stage3 from "@/components/manuscript/Stage3";
import Stage4 from "@/components/manuscript/Stage4";
import Stage5 from "@/components/manuscript/Stage5";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
  slug: "",
  volume: "",
  issue: "",
};

type Props = {
  slug?: string
}

const AdminUploadManuscript = ({ slug }: Props) => {
  const { user } = useAuth();
  const isEdit = !!slug;
  console.log(slug);
  const [stage, setStage] = useState(1);
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(isEdit);
  const [formData, setFormData] = useState<InitialManuscript>(() => {
    if (isEdit) return null;
    const saved = localStorage.getItem("adminManuscriptDraft");
    return saved ? JSON.parse(saved) : initialDataTemplate;
  });

  const router = useRouter();

  useEffect(() => {
    if (!isEdit) return;

    const fetchManuscript = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/published/${slug}`);
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

    fetchManuscript();
  }, [slug, isEdit]);

  if (loading && isEdit)
    return <p>Fetching Manuscript, please wait a minute</p>;
  if (isEdit && !formData && !loading) {
    console.log("Unable to get manuscript");
    return <h2>{error}</h2>;
  }

  const nextStage = () => {
    saveDraft();
    setStage((prev) => prev + 1);
  };

  const prevStage = () => {
    saveDraft();
    setStage((prev) => prev - 1);
  };

  const saveDraft = () => {
    if (!isEdit)
      localStorage.setItem("adminManuscriptDraft", JSON.stringify(formData));
  };

  const clearDraft = () => {
    localStorage.removeItem("adminManuscriptDraft");
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
        ? { method: "patch", url: `/published/${formData._id}` }
        : { method: "post", url: "/published" };

      const res = await axios[submitData.method](submitData.url, {
        ...formData,
        coAuthors: formData.coAuthors || [],
        author: formData.author || user?._id,
      });
      setFormData(res.data);
      clearDraft();
      setShow(true);
    } catch (e) {
      const err = e as AxiosError<{ error: string }>
      toast.error(err?.response?.data?.error || "Failed to fetch current issue");
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
          prevStage={prevStage}
          isEdit={isEdit}
          setStage={setStage}
          error={error}
          show={show}
          setShow={setShow}
          submitting={submitting}
          handleFinalSubmit={handleFinalSubmit}
          updateForm={updateForm}
          id={slug}
          onConfirm={() => {
            setShow(false);
            router.push(`/manuscript/${formData.slug}`);
          }}
        />
      )}
    </div>
  );
};

export default AdminUploadManuscript;
