import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import './BlogTitles.css'   
import axios from 'axios'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food', 'Industry']
  
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

      const { data } = await axios.post('/api/ai/generate-blog-title', {prompt},
        {headers: {Authorization: `Bearer ${await getToken()}`}})

        if(data.success) {
          setContent(data.content)
        }else{
          toast.error(data.message)
        }
    } catch (error){
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="blog-container">
      
      {/* Left Column (Form) */}
      <form onSubmit={onSubmitHandler} className="blog-form">
        <div className="blog-header">
          <Sparkles className="icon purple" />
          <h1>AI Title Generator</h1>
        </div>

        <p className="label">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="input-box"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="label">Category</p>
        <div className="category-container">
          {blogCategories.map((item, index) => (
            <span
              onClick={() => setSelectedCategory(item)}
              key={index}
              className={`category-chip ${selectedCategory === item ? 'active' : ''}`}
            >
              {item}
            </span>
          ))}
        </div>

        <button disabled={loading} className="generate-btn">
          {loading ? <span className='load'></span> : <Hash className="icon" />}
          Generate title
        </button>
      </form>

      {/* Right Column (Generated Titles) */}
      <div className="blog-output">
        <div className="blog-header">
          <Hash className="icon purple" />
          <h1>Generated titles</h1>
        </div>
        {
          !content ? (
            
        <div className="output-placeholder">
          <div>
            <Hash className="big-icon" />
            <p>
              Enter a topic and click <b>"Generate title"</b> to get started
            </p>
          </div>
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

export default BlogTitles
