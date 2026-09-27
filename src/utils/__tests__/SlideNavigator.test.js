import SlideNavigator from '../SlideNavigator'

// Arrange tipo 2: instanciar objetos del SUT
describe('SlideNavigator', () => {
  test('UT-03 regresa a la primera después de la última', () => {
    // Arrange
    const navigator = new SlideNavigator(5, 4)

    // Act
    const index = navigator.next()

    // Assert
    expect(index).toBe(0)
  })
})
