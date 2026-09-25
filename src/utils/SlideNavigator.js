// Navegación circular del carrusel (extraída de Carousel.jsx)
export default class SlideNavigator {
  constructor(total, start = 0) {
    if (!Number.isInteger(total) || total < 1) {
      throw new RangeError('El carrusel necesita al menos una diapositiva')
    }
    this.total = total
    this.current = 0
    this.goTo(start)
  }

  next() {
    this.current = (this.current + 1) % this.total
    return this.current
  }

  prev() {
    this.current = (this.current - 1 + this.total) % this.total
    return this.current
  }

  goTo(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.total) {
      throw new RangeError(`Índice fuera de rango: ${index}`)
    }
    this.current = index
    return this.current
  }
}
