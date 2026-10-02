import { qualifiesForFreeShipping } from '../../pedido'
import { getChatResponse } from '../../chat'

describe('2. Veracidad', () => {
  test('A2-01 una compra de $650 tiene envío gratis', () => {
    const subtotal = 650

    const result = qualifiesForFreeShipping(subtotal)

    expect(result).toBeTruthy()
  })

  test('A2-02 una compra de exactamente $500 no tiene envío gratis', () => {
    const subtotal = 500

    const result = qualifiesForFreeShipping(subtotal)

    expect(result).toBeFalsy()
  })

  test('A2-03 el chat no responde a un mensaje vacío, pero sí a uno con texto', () => {
    const empty = '   '
    const question = 'tueste'

    const emptyResponse = getChatResponse(empty)
    const questionResponse = getChatResponse(question)

    expect(emptyResponse).toBeNull()
    expect(questionResponse).toBeDefined()
  })
})
