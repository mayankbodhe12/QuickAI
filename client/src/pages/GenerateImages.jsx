import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import "./GenerateImages.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
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
    <div className="generate-container">
      {/* Left Column*/}
      <form onSubmit={onSubmitHandler} className="left-box">
        <div className="form-header">
          <Sparkles className="icon-green" />
          <h1 className="form-title">AI Image Generator</h1>
        </div>

        <p className="label">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="input-box"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="label">Style</p>
        <div className="style-container">
          {imageStyle.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(item)}
              className={`style-option ${
                selectedStyle === item ? "selected" : ""
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="toggle-container">
          <label className="toggle">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
            />
            <span className="slider"></span>
          </label>
          <p className="toggle-text">Make this image Public</p>
        </div>

        <button disabled={loading} className="btn-submit">
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <Image className="btn-icon" />
          )}
          Generate Image
        </button>
      </form>

      {/* Right Column */}
      <div className="right-box">
        <div className="form-header">
          <Image className="icon-green" />
          <h1 className="form-title">Generated Image</h1>
        </div>

        {!content ? (
          <div className="output-content">
            <Image className="output-icon" />
            <p>
              Enter a topic and click <b>"Generate Image"</b> to get started
            </p>
          </div>
        ) : (
          <div className="image-container">
            <img src={content} alt="image" className="image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
