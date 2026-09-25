import React from 'react'
import { getIntensityBeans } from '../utils/granos'

const GranoItem = ({ item }) => {
  const intensityBeans = getIntensityBeans(item.intensity)

  return (
    <div className="card">
      <div className="card-inner">
        {/* FRENTE */}
        <div className="card-front">
          <img src={item.img} alt={item.name} />
          <div className="card-price-tag">{item.price} · {item.weight}</div>
          <div className="card-name-overlay">
            <h2>{item.name}</h2>
            <span className="card-origin-small">{item.origin}</span>
          </div>
        </div>

        {/* REVERSO */}
        <div className="card-back">
          <h3>{item.name}</h3>
          <ul>
            <li><strong>Origen:</strong> {item.origin}</li>
            <li><strong>Región:</strong> {item.region}</li>
            <li><strong>Altitud:</strong> {item.altitude}</li>
            <li><strong>Variedad:</strong> {item.variety}</li>
            <li><strong>Proceso:</strong> {item.process}</li>
            <li><strong>Tueste:</strong> {item.roast}</li>
            <li><strong>Notas:</strong> {item.notes.join(', ')}</li>
            <li><strong>Intensidad:</strong> {intensityBeans}</li>
            <li><strong>Acidez:</strong> {item.acidity}</li>
            <li><strong>Cuerpo:</strong> {item.body}</li>
          </ul>
          {item.certification.length > 0 && (
            <div className="certifications">
              {item.certification.map((cert, i) => (
                <span key={i} className="cert-badge">{cert}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GranoItem