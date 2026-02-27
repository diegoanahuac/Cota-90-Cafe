import React from 'react'
import Spinner from './Spinner'
import GranoItem from './GranoItem'

const GranosGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section id="granos" className="cards">
      {items.map((item) => (
        <GranoItem key={item.id} item={item} />
      ))}
    </section>
  )
}

export default GranosGrid