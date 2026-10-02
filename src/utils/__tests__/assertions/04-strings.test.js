import { getIntensityBeans } from '../../granos'
import { getChatResponse } from '../../chat'

// Aserción 4 – Cadenas de texto (dificultad 4/7): toMatch con expresiones regulares
describe('4. Cadenas de texto', () => {
  test('A4-01 la intensidad 4 son cuatro fuegos seguidos de un círculo', () => {
    // Arrange
    const intensity = 4

    // Act
    const result = getIntensityBeans(intensity)

    // Assert
    expect(result).toMatch(/^(🔥){4}⚪$/u)
  })

  test('A4-02 la respuesta de envío menciona el envío gratis y el monto', () => {
    // Arrange
    const message = '¿Cuánto cuesta el ENVIO?'

    // Act
    const response = getChatResponse(message)

    // Assert
    expect(response).toMatch(/envío gratis/i)
    expect(response).toMatch(/\$500/)
    expect(response).not.toMatch(/mayoreo/i)
  })
})
