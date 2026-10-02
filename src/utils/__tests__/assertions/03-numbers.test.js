import { parsePrice, calculateOrderTotal, SHIPPING_COST } from '../../pedido'

describe('3. Números', () => {
  test('A3-01 convierte un precio con comas y centavos en número', () => {
    const price = '$1,250.50'

    const result = parsePrice(price)

    expect(result).toBeGreaterThan(1250)
    expect(result).toBeLessThan(1251)
  })

  test('A3-02 suma precios con centavos y agrega el envío', () => {
    const lines = [{ price: '$19.99', quantity: 3 }]

    const order = calculateOrderTotal(lines)

    expect(order.subtotal).toBeCloseTo(59.97, 2)
    expect(order.shipping).toBe(SHIPPING_COST)
    expect(order.total).toBeCloseTo(158.97, 2)
  })

  test('A3-03 aplica 10 % de descuento de mayoreo desde 10 piezas', () => {
    const lines = [{ price: '$345.50', quantity: 10 }]

    const order = calculateOrderTotal(lines)

    expect(order.discount).toBeCloseTo(345.5, 2)
    expect(order.total).toBeLessThan(order.subtotal)
    expect(order.total).toBeCloseTo(3109.5, 2)
  })
})
