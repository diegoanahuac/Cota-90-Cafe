import { parsePrice, calculateOrderTotal, SHIPPING_COST } from '../../pedido'

// Aserción 3 – Números (dificultad 3/7): toBeGreaterThan, toBeLessThan, toBeCloseTo
describe('3. Números', () => {
  test('A3-01 convierte un precio con comas y centavos en número', () => {
    // Arrange
    const price = '$1,250.50'

    // Act
    const result = parsePrice(price)

    // Assert
    expect(result).toBeGreaterThan(1250)
    expect(result).toBeLessThan(1251)
  })

  test('A3-02 suma precios con centavos y agrega el envío', () => {
    // Arrange
    const lines = [{ price: '$19.99', quantity: 3 }]

    // Act
    const order = calculateOrderTotal(lines)

    // Assert
    expect(order.subtotal).toBeCloseTo(59.97, 2)
    expect(order.shipping).toBe(SHIPPING_COST)
    expect(order.total).toBeCloseTo(158.97, 2)
  })

  test('A3-03 aplica 10 % de descuento de mayoreo desde 10 piezas', () => {
    // Arrange
    const lines = [{ price: '$345.50', quantity: 10 }]

    // Act
    const order = calculateOrderTotal(lines)

    // Assert
    expect(order.discount).toBeCloseTo(345.5, 2)
    expect(order.total).toBeLessThan(order.subtotal)
    expect(order.total).toBeCloseTo(3109.5, 2)
  })
})
