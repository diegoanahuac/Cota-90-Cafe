import { getChatResponse, predefinedResponses } from '../chat'

// Arrange tipo 1: inicializar entradas y parámetros
describe('getChatResponse', () => {
  test('UT-06 detecta la palabra clave sin importar mayúsculas', () => {
    // Arrange
    const message = '¿Cuánto cuesta el ENVIO?'

    // Act
    const response = getChatResponse(message)

    // Assert
    expect(response).toBe(predefinedResponses.envio)
  })

  test('UT-07 responde con el mensaje por defecto si no hay palabra clave', () => {
    // Arrange
    const message = 'hola'

    // Act
    const response = getChatResponse(message)

    // Assert
    expect(response).toBe(predefinedResponses.default)
  })

  test('UT-08 no responde a un mensaje vacío', () => {
    // Arrange
    const message = '   '

    // Act
    const response = getChatResponse(message)

    // Assert
    expect(response).toBeNull()
  })
})
