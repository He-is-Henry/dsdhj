import { useState } from "react";

const TagInput = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {value.map((tag, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#e0f2f1",
              padding: "5px 8px",
              borderRadius: "15px",
              color: "black",
            }}
          >
            <span style={{ marginRight: "6px" }}>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(i)}
              style={{
                border: "none",
                background: "transparent",
                fontWeight: "bold",
                color: "black",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add keyword..."
        style={{
          width: "90%",
          border: "none",
          outline: "none",
          borderTop: "1px solid #ddd",
          paddingTop: "6px",
        }}
      />
    </div>
  );
};

export default TagInput;
