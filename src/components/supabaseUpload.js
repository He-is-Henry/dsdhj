import { supabase } from "../api/supabase";

const uploadPdf = async (file) => {
  if (!file) return { error: "No file selected" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("archive")
    .upload(filePath, file);

  if (uploadError) return { error: uploadError.message };

  const { data } = supabase.storage.from("archive").getPublicUrl(filePath);
  console.log(data);
  const { publicUrl } = data;
  console.log(publicUrl);
  return { url: publicUrl, path: filePath };
};

const deletePdf = async (filePath) => {
  const response = await supabase.storage.from("archive").remove([filePath]);
  console.log(response);
  const { error } = response;
  if (error) return { error: error.message };
  return { success: true };
};

const getPdfUrl = (filePath) => {
  const { data } = supabase.storage.from("archive").getPublicUrl(filePath);
  console.log(data);
  const { publicUrl } = data;
  return publicUrl;
};

export { uploadPdf, deletePdf, getPdfUrl };
