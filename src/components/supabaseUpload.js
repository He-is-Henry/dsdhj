import axios from "../api/axios";
const API = "/supabase";

const uploadPdf = async (file) => {
  if (!file) return { error: "No file selected" };

  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axios.post(`${API}/upload`, formData);

    return {
      url: data.url,
      path: data.path,
    };
  } catch (err) {
    return {
      error: err?.response?.data?.error || "Upload failed",
    };
  }
};

const deletePdf = async (filePath) => {
  try {
    const { data } = await axios.post(`${API}/delete`, {
      filePath,
    });

    if (data?.error) return { error: data.error };

    return { success: true };
  } catch (err) {
    return {
      error: err?.response?.data?.error || "Delete failed",
    };
  }
};
const getPdfUrl = async (filePath) => {
  try {
    const { data } = await axios.post(`${API}/url`, {
      filePath,
    });

    return data.url;
  } catch (err) {
    return null;
  }
};

export { uploadPdf, deletePdf, getPdfUrl };
