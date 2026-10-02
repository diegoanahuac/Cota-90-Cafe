import { getIntensityBeans } from '../../granos'
import { parsePrice, calculateOrderTotal } from '../../pedido'
import SlideNavigator from '../../SlideNavigator'

describe('6. Excepciones', () => {
  test('A6-01 rechaza una intensidad mayor a 5', () => {
    const intensity = 7

    const act = () => getIntensityBeans(intensity)

    expect(act).toThrow(RangeError)
    expect(act).toThrow('entre 0 y 5')
  })

  test('A6-02 rechaza precios mal escritos', () => {
    const badPrices = ['320', '$3.2.0', '', null]

    const acts = badPrices.map((price) => () => parsePrice(price))

    for (const act of acts) {
      expect(act).toThrow(TypeError)
    }
  })

  test('A6-03 rechaza pedidos vacíos o con cantidades inválidas', () => {
    const emptyOrder = []
    const zeroQuantity = [{ price: '$320', quantity: 0 }]

    const actEmpty = () => calculateOrderTotal(emptyOrder)
    const actZero = () => calculateOrderTotal(zeroQuantity)

    expect(actEmpty).toThrow('El pedido está vacío')
    expect(actZero).toThrow(RangeError)
  })

  test('A6-04 una excepción no cambia el estado del carrusel', () => {
    const navigator = new SlideNavigator(5, 2)

    const act = () => navigator.goTo(9)

    expect(act).toThrow(/fuera de rango/)
    expect(navigator.current).toBe(2)
  })
})
