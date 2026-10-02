import { getRegion } from '../../granos'

// Aserción 1 – Igualdad (dificultad 1/7): toBe
describe('1. Igualdad – getRegion', () => {
  test('A1-01 regresa el país de un origen', () => {
    // Arrange
    const origin = 'Panamá – Chiriquí'

    // Act
    const result = getRegion(origin)

    // Assert
    expect(result).toBe('Panamá')
  })
})
