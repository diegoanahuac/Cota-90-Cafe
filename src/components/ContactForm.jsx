import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado (estático):', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contacto" className="contact-section">
      <h2 className="section-title">📧 Contáctanos</h2>
      <p className="section-subtitle">
        ¿Preguntas sobre nuestros granos, pedidos al mayoreo o suscripciones?
        Escríbenos y te responderemos pronto.
      </p>

      {submitted && (
        <div className="success-message">
          ✅ ¡Gracias! Tu mensaje ha sido recibido. Te contactaremos pronto.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un asunto</option>
            <option value="info-granos">Información sobre un grano</option>
            <option value="mayoreo">Pedido al mayoreo</option>
            <option value="suscripcion">Suscripción mensual</option>
            <option value="envios">Envíos y entregas</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            placeholder="Escribe tu mensaje aquí..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-send">
          📩 Enviar Mensaje
        </button>
      </form>
    </section>
  )
}

export default ContactForm