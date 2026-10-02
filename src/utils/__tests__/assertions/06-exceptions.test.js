import { getIntensityBeans } from '../../granos'
import { parsePrice, calculateOrderTotal } from '../../pedido'
import SlideNavigator from '../../SlideNavigator'

// Aserción 6 – Excepciones (dificultad 6/7): toThrow con tipo y mensaje
describe('6. Excepciones', () => {
  test('A6-01 rechaza una intensidad mayor a 5', () => {
    // Arrange
    const intensity = 7

    // Act
    const act = () => getIntensityBeans(intensity)

    // Assert
    expect(act).toThrow(RangeError)
    expect(act).toThrow('entre 0 y 5')
  })

  test('A6-02 rechaza precios mal escritos', () => {
    // Arrange
    const badPrices = ['320', '$3.2.0', '', null]

    // Act
    const acts = badPrices.map((price) => () => parsePrice(price))

    // Assert
    for (const act of acts) {
      expect(act).toThrow(TypeError)
    }
  })

  test('A6-03 rechaza pedidos vacíos o con cantidades inválidas', () => {
    // Arrange
    const emptyOrder = []
    const zeroQuantity = [{ price: '$320', quantity: 0 }]

    // Act
    const actEmpty = () => calculateOrderTotal(emptyOrder)
    const actZero = () => calculateOrderTotal(zeroQuantity)

    // Assert
    expect(actEmpty).toThrow('El pedido está vacío')
    expect(actZero).toThrow(RangeError)
  })

  test('A6-04 una excepción no cambia el estado del carrusel', () => {
    // Arrange
    const navigator = new SlideNavigator(5, 2)

    // Act
    const act = () => navigator.goTo(9)

    // Assert
    expect(act).toThrow(/fuera de rango/)
    expect(navigator.current).toBe(2)
  })
})
