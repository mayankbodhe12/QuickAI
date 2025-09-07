import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import './WriteArticle.css'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
 
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try  {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${setSelectedLength.text}`

      const {data} = await axios.post('/api/ai/generate-article', {
        prompt, length:selectedLength.length},{
          headers: {Authorization: `Bearer ${await getToken()}`}
        })
        if(data.success){
          setContent(data.content)
        } else {
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="write-container">
      {/* Left column */}
      <form onSubmit={onSubmitHandler} className="form-box">
        <div className="header">
          <Sparkles className="icon" />
          <h1>Article Configuration</h1>
        </div>

        <p className="label">Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="label">Article Length</p>
        <div className="length-options">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`length-btn ${selectedLength.text === item.text ? 'active' : ''}`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button disabled={loading} type="submit" className="generate-btn">
          {
            loading ? <span className="spinner"></span>
            : <Edit className="btn-icon" />
          }
  
          Generate article
        </button>
      </form>

      {/* Right column */}
      <div className="output-box">
        <div className="header">
          <Edit className="icon" />
          <h1>Generated article</h1>
        </div>

        {!content ? (
           <div className="output-content">
          <Edit className="large-icon" />
          <p>Enter a topic and click "Generate article" to get started</p>
        </div>
        ) : (
        <div className="content-box">
          <div className='.reset-tw'>
            <Markdown>{content}</Markdown>
          </div>
        </div>
        )}
    
      </div>
    </div>
  )
}

export default WriteArticle
