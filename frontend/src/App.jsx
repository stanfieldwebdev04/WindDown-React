import { useState } from 'react'
import './App.css'

export default function App() {
  // Preloaded with one example thought
  const [thoughts, setThoughts] = useState([
    {
      id: 1,
      content: 'Research mechanical keyboard switches at 2 AM instead of sleeping',
      tag: 'hyperfocus',
      createdAt: '11:58 PM'
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedTag, setSelectedTag] = useState('hyperfocus');

  const handleCapture = (e) => {
    e.preventDefault();
    if(!inputText.trim()) return;

    const newThought = {
      id: Date.now(), // Temp unique ID until Postgres generates real SERIAL IDs
      content: inputText.trim(),
      tag: selectedTag,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThoughts([newThought, ...thoughts]);
    setInputText('');
  };

  const handleDelete = (idToRemove) => {
    setThoughts(thoughts.filter((item) => item.id !== idToRemove));
  };

  const [username, setUsername] = useState('User');

  return (
    <main className="app-main" >
      <header className="app-header">
        <h1>WindDown</h1>
        <p>Welcome, {username}. What interest awaits your self-indulgement?</p>
      </header>

      <section
        className="thoughts-list"
        style={{
          backgroundColor: thoughts.length === 0
            ? 'var(--bg-main)'
            : '',

          border: thoughts.length === 0
          ? '1px solid var(--border-color)'
          : 'none',
        }}
      >
        {thoughts.map((thought) => (
          <div key={thought.id} className="thought-card">
            <div className="thought-card-header">
              <span className={`thought-tag ${thought.tag}`}>{thought.tag}</span>
              <span className="thought-timestamp">{thought.createdAt}</span>
            </div>
            <p>{thought.content}</p>
            <div className="thought-card-actions">
              <button className="delete-btn" onClick={() => handleDelete(thought.id)}>Delete</button>
              <button className="edit-btn">Edit</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}