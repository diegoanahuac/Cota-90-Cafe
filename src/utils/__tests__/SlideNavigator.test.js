import SlideNavigator from '../SlideNavigator'

// Arrange tipo 2: instanciar objetos del SUT
describe('SlideNavigator', () => {
  test('UT-09 avanza a la siguiente diapositiva', () => {
    // Arrange
    const navigator = new SlideNavigator(5)

    // Act
    const index = navigator.next()

    // Assert
    expect(index).toBe(1)
  })

  test('UT-10 regresa a la primera después de la última', () => {
    // Arrange
    const navigator = new SlideNavigator(5, 4)

    // Act
    const index = navigator.next()

    // Assert
    expect(index).toBe(0)
  })

  test('UT-11 va a la última al retroceder desde la primera', () => {
    // Arrange
    const navigator = new SlideNavigator(5)

    // Act
    const index = navigator.prev()

    // Assert
    expect(index).toBe(4)
  })

  test('UT-12 rechaza un índice fuera de rango', () => {
    // Arrange
    const navigator = new SlideNavigator(5)

    // Act
    const act = () => navigator.goTo(9)

    // Assert
    expect(act).toThrow(RangeError)
    expect(navigator.current).toBe(0)
  })
})
