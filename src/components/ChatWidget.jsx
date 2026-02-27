import React, { useState } from 'react'

const predefinedResponses = {
  horario:
    'Atendemos pedidos en línea 24/7. Nuestro tostador despacha de Lunes a Viernes de 8:00am a 6:00pm.',
  envio:
    'Enviamos a todo México. Envío gratis en compras mayores a $500. Tiempo de entrega: 3-5 días hábiles.',
  granos:
    'Tenemos 16 orígenes disponibles: Colombia, Etiopía, Guatemala, Kenia, Brasil, Panamá, México (Chiapas, Veracruz, Oaxaca), Costa Rica, Rwanda, Perú, Yemen, Indonesia, Honduras y nuestro Blend de la Casa.',
  tueste:
    'Tostamos artesanalmente en lotes pequeños. Ofrecemos tueste ligero, medio, medio-oscuro y oscuro. Todos nuestros granos se tuestan máximo 5 días antes del envío.',
  mayoreo:
    '¡Claro! Ofrecemos precios especiales para cafeterías, restaurantes y oficinas. Llena el formulario de contacto con el asunto "Pedido al mayoreo".',
  suscripcion:
    'Nuestra suscripción mensual te envía granos frescos cada mes. Puedes elegir el origen, tueste y frecuencia. Escríbenos por el formulario de contacto.',
  molienda:
    'Vendemos en grano entero para máxima frescura. Si necesitas molido, indícalo en tu pedido y lo molemos al momento según tu método de preparación.',
  default:
    '¡Gracias por tu mensaje! Esto es un chat de demostración. Para pedidos y consultas detalladas, usa nuestro formulario de contacto. Prueba: granos, envio, tueste, mayoreo, suscripcion, molienda u horario.',
}

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
    const keyword = input.toLowerCase().trim()

    let botResponse = predefinedResponses.default
    for (const key of Object.keys(predefinedResponses)) {
      if (keyword.includes(key)) {
        botResponse = predefinedResponses[key]
        break
      }
    }

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