import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, FileBox, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [evidenceId, setEvidenceId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const container = useRef();

  useGSAP(() => {
    gsap.from('.upload-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, { scope: container });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(""); // Clear errors
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file || !evidenceId) {
      setMessage("Please enter Evidence ID and select a file");
      setStatus("error");
      return;
    }

    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("evidenceId", evidenceId);

    try {
      await axios.post("http://localhost:5000/upload", formData);
      setMessage("Evidence secured on blockchain successfully");
      setStatus("success");
      setEvidenceId("");
      setFile(null);
    } catch (err) {
      setMessage("Upload failed. Ensure backend is running.");
      setStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="upload" className="upload-section" ref={container}>
      <div className="upload-card">
        <div className="upload-header">
          <h2>Secure Evidence</h2>
          <p>Upload files to anchor their cryptographic hash to the blockchain</p>
        </div>

        <div className="form-group">
          <label>Evidence ID</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. CASE-2026-X89"
            value={evidenceId}
            onChange={(e) => setEvidenceId(e.target.value)}
          />
        </div>

        {!file ? (
          <div 
            className={`file-drop-area ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="file-icon" />
            <div className="file-drop-text">Drag & Drop file here</div>
            <div className="file-drop-subtext">or click to browse from device</div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
           <div className="selected-file-info">
             <FileBox size={24} className="text-accent-primary" style={{color: 'var(--accent-primary)'}} />
             <span className="selected-file-name">{file.name}</span>
             <button 
                onClick={() => setFile(null)} 
                style={{background: 'none', border:'none', color: '#ef4444', cursor:'pointer', fontSize: '0.875rem'}}
              >
               Remove
             </button>
           </div>
        )}

        <button 
          className="btn-upload" 
          onClick={handleUpload}
          disabled={isUploading || !file || !evidenceId}
        >
          {isUploading ? (
            <><Loader2 className="animate-spin" style={{animation: 'spin 1s linear infinite'}} size={20} /> Processing...</>
          ) : (
            <>Upload to Network</>
          )}
        </button>

        {message && (
          <div className={`message ${status}`}>
            {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
