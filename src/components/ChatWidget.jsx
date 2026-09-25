import React, { useState } from 'react'
import { getChatResponse } from '../utils/chat'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Bienvenido a Cota 90 Café. ¿En qué puedo ayudarte? Prueba: granos, envio, tueste, mayoreo, suscripcion, molienda u horario.',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    const botResponse = getChatResponse(input)

    const botMessage = { sender: 'bot', text: botResponse }
    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput('')
  }

  return (
    <div id="chat" className="chat-widget">
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat con nosotros"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span> Chat Cota 90 Café</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.sender === 'bot' ? 'bot' : 'user'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatWidget