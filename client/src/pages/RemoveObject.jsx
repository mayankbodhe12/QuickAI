import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import "./RemoveObject.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (object.split(' ').length > 1) {
        return toast("Please enter only one object name");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
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
    <div className="remove-object-container">
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className="form-container">
        <div className="heading">
          <Sparkles className="icon blue" />
          <h1>Object Removal</h1>
        </div>

        <p className="label">Upload image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="input-field"
          required
        />

        <p className="label">Describe object name to remove</p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="textarea-field"
          placeholder="e.g., watch or spoon , Only single object name"
          required
        />

        <button disabled={loading} className="submit-btn">
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <Scissors className="icon small" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right Column */}
      <div className="output-container">
        <div className="heading">
          <Scissors className="icon blue small" />
          <h1>Processed Image</h1>
        </div>

        {!content ? (
          <div className="output-placeholder">
            <Scissors className="icon large" />
            <p>
              Upload an image and click <b>"Remove Object"</b> to get started
            </p>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
