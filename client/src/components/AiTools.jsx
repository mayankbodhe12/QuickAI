import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "./AiTools.css";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="ai-tools">
      <div className="ai-tools-header">
        <h2>Powerful AI Tools</h2>
        <p>
          Everything you need to create, enhance, and optimize your content with <br />
          cutting-edge AI technology.
        </p>
      </div>

      <div className="ai-tools-grid">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="ai-tool-card"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="ai-tool-icon"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
