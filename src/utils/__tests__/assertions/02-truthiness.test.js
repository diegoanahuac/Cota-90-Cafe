import { qualifiesForFreeShipping } from '../../pedido'
import { getChatResponse } from '../../chat'

// Aserción 2 – Veracidad (dificultad 2/7): toBeTruthy, toBeFalsy, toBeNull, toBeDefined
describe('2. Veracidad', () => {
  test('A2-01 una compra de $650 tiene envío gratis', () => {
    // Arrange
    const subtotal = 650

    // Act
    const result = qualifiesForFreeShipping(subtotal)

    // Assert
    expect(result).toBeTruthy()
  })

  test('A2-02 una compra de exactamente $500 no tiene envío gratis', () => {
    // Arrange
    const subtotal = 500

    // Act
    const result = qualifiesForFreeShipping(subtotal)

    // Assert
    expect(result).toBeFalsy()
  })

  test('A2-03 el chat no responde a un mensaje vacío, pero sí a uno con texto', () => {
    // Arrange
    const empty = '   '
    const question = 'tueste'

    // Act
    const emptyResponse = getChatResponse(empty)
    const questionResponse = getChatResponse(question)

    // Assert
    expect(emptyResponse).toBeNull()
    expect(questionResponse).toBeDefined()
  })
})
