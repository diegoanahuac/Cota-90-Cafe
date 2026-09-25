import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Carousel from './components/Carousel'
import GranosGrid from './components/GranosGrid'
import ContactForm from './components/ContactForm'
import ChatWidget from './components/ChatWidget'
import { TODOS, getRegions, filterByRegion, fetchGranos } from './utils/granos'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState(TODOS)

  useEffect(() => {
    const fetchItems = async () => {
      const granos = await fetchGranos(axios)
      setItems(granos)
      setIsLoading(false)
    }

    fetchItems()
  }, [])

  const regions = getRegions(items)
  const filteredItems = filterByRegion(items, filter)

  return (
    <div className="container">
      <Header />
      <Carousel />

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