import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import "./Reviewresume.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {/* Left Column (Form) */}
      <form onSubmit={onSubmitHandler} className="form-left">
        <div className="form-header">
          <Sparkles className="icon orange" />
          <h1 className="title">Resume Review</h1>
        </div>

        <p className="label">Upload Resume</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="application/pdf"
          className="input-file"
          required
        />
        <p className="note">Supports PDF resume olny</p>

        <button disabled={loading} type="submit" className="btn-submit">
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <FileText className="icon" />
          )}
          Review Resume
        </button>
      </form>

      {/* Right Colum */}
      <div className="output-right">
        <div className="form-header">
          <FileText className="icon orange" />
          <h1 className="title">Analysis Results</h1>
        </div>

        {!content ? (
          <div className="placeholder">
            <div className="placeholder-content">
              <FileText className="icon-large" />
              <p>
                Upload an resume and click <b>"Review Resume"</b> to get
                started
              </p>
            </div>
          </div>
        ) : (
          <div className="content-box">
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
