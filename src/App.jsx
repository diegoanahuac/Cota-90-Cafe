import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import GranosGrid from './components/GranosGrid'
import ContactForm from './components/ContactForm'
import ChatWidget from './components/ChatWidget'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    const fetchItems = async () => {
      const resultado = await axios.get('/granos.json')
      console.log(resultado.data)
      setItems(resultado.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [])

  const regions = [
    'Todos',
    ...new Set(items.map((item) => item.origin.split('–')[0].trim())),
  ]

  const filteredItems =
    filter === 'Todos'
      ? items
      : items.filter((item) => item.origin.split('–')[0].trim() === filter)

  return (
    <div className="container">
      <Header />

      <section className="filter-section">
        <h2 className="section-title">Nuestros Granos</h2>
        <p className="section-subtitle">
          Café de especialidad tostado artesanalmente. Selecciona por origen.
        </p>
        <div className="filter-buttons">
          {regions.map((region) => (
            <button
              key={region}
              className={`btn-filter ${filter === region ? 'active' : ''}`}
              onClick={() => setFilter(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      <GranosGrid isLoading={isLoading} items={filteredItems} />
      <ContactForm />
      <ChatWidget />

      <footer className="footer">
        <p>&copy; 2026 Café Aroma – Granos de Especialidad. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#granos">Granos</a>
          <a href="#contacto">Contacto</a>
          <a href="#chat">Chat</a>
        </div>
      </footer>
    </div>
  )
}

export default App