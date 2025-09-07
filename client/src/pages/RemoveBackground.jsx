import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import "./RemoveBackground.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

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
    <div className="rb-container">
      {/* Left: Form */}
      <form onSubmit={onSubmitHandler} className="rb-card rb-form">
        <div className="rb-header">
          <Sparkles className="rb-icon rb-icon-orange" />
          <h1 className="rb-title">Background Removal</h1>
        </div>

        <p className="rb-label">Upload image</p>
        <input
          onChange={(e) => setInput(e.target.files?.[0] ?? null)}
          type="file"
          accept="image/*"
          className="rb-input-file"
          required
        />
        <p className="rb-hint">Supports JPG, PNG, and other image formats</p>

        <button disabled={loading} type="submit" className="rb-button rb-button-orange">
          {
            loading ? <span className="spinner"></span>
            : <Eraser className="rb-button-icon" />
          }
          Remove background
        </button>
      </form>

      {/* Right: Output */}
      <div className="rb-card rb-output">
        <div className="rb-header">
          <Eraser className="rb-icon rb-icon-orange" />
          <h1 className="rb-title">Processed Image</h1>
        </div>
        {
          !content ? (
             <div className="rb-output-empty">
          <Eraser className="rb-empty-icon" />
          <p>
            Upload an image and click <b>"Remove Background"</b> to get started
          </p>
        </div>
          ) : (
            <img src={content} alt="image" className="custom-image" />
          )
        }

       
      </div>
    </div>
  );
};

export default RemoveBackground;
