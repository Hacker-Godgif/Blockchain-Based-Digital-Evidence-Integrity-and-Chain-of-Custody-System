import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [evidenceId, setEvidenceId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file || !evidenceId) {
      setMessage("Please enter Evidence ID and select a file");
      setStatus("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("evidenceId", evidenceId);

    try {
      await axios.post("http://localhost:5000/upload", formData);
      setMessage("Evidence uploaded successfully ✅");
      setStatus("success");
      setEvidenceId("");
      setFile(null);
    } catch (err) {
      setMessage("Upload failed ❌");
      setStatus("error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Evidence Integrity System</h2>
        <p className="subtitle">
          Blockchain-based Digital Evidence Storage
        </p>

        <input
          type="text"
          placeholder="Enter Evidence ID"
          value={evidenceId}
          onChange={(e) => setEvidenceId(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>Upload Evidence</button>

        {message && (
          <p className={`message ${status}`}>{message}</p>
        )}

        <div className="footer">
          © Blockchain Forensics Project
        </div>
      </div>
    </div>
  );
}

export default App;
