import React, { useState, useEffect } from 'react'

const slides = [
  {
    img: 'https://images.pexels.com/photos/29799573/pexels-photo-29799573.jpeg',
    title: 'Del Origen a Tu Taza',
    subtitle: 'Granos de especialidad tostados artesanalmente',
  },
  {
    img: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1200&h=500&fit=crop',
    title: 'Café de Chiapas',
    subtitle: 'Cultivado por comunidades indígenas a 1,300 msnm',
  },
  {
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=500&fit=crop',
    title: 'Colombia Huila Supremo',
    subtitle: 'Notas de chocolate amargo, nuez y caramelo',
  },
  {
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1200&h=500&fit=crop',
    title: 'Panamá Geisha Boquete',
    subtitle: 'La variedad más codiciada del mundo – Edición limitada',
  },
  {
    img: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg',
    title: 'Sumatra Mandheling',
    subtitle: 'Proceso Giling Basah – Cuerpo como terciopelo líquido',
  },
]

const Carousel = () => {
  const [current, setCurrent] = useState(0)

  // Autoplay cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => setCurrent(index)
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
  const next = () => setCurrent((current + 1) % slides.length)

  return (
    <section className="carousel">
      <div className="carousel-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === current ? 'active' : ''}`}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="carousel-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones prev/next */}
      <button className="carousel-btn carousel-btn-prev" onClick={prev}>
        ‹
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={next}>
        ›
      </button>

      {/* Indicadores */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel