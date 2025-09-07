import React, { useState } from 'react'
import Markdown from 'react-markdown'
import './CreationItem.css'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="creation-item" onClick={() => setExpanded(!expanded)}>
      <div className="creation-header">
        <div>
          <h2 className="creation-prompt">{item.prompt}</h2>
          <p className="creation-meta">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="creation-type-btn">{item.type}</button>
      </div>

      {expanded && (
        <div className="creation-content">
          {item.type === 'image' ? (
            <div>
              <img
                src={item.content}
                alt="creation"
                className="creation-image"
              />
            </div>
          ) : (
            <div className="creation-text">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
