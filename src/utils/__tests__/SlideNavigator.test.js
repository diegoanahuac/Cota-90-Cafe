import SlideNavigator from '../SlideNavigator'

describe('SlideNavigator', () => {
  test('UT-03 regresa a la primera después de la última', () => {
    const navigator = new SlideNavigator(5, 4)

    const index = navigator.next()

    expect(index).toBe(0)
  })
})
