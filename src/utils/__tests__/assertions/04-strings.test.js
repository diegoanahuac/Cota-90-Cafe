import { getIntensityBeans } from '../../granos'
import { getChatResponse } from '../../chat'

describe('4. Cadenas de texto', () => {
  test('A4-01 la intensidad 4 son cuatro fuegos seguidos de un círculo', () => {
    const intensity = 4

    const result = getIntensityBeans(intensity)

    expect(result).toMatch(/^(🔥){4}⚪$/u)
  })

  test('A4-02 la respuesta de envío menciona el envío gratis y el monto', () => {
    const message = '¿Cuánto cuesta el ENVIO?'

    const response = getChatResponse(message)

    expect(response).toMatch(/envío gratis/i)
    expect(response).toMatch(/\$500/)
    expect(response).not.toMatch(/mayoreo/i)
  })
})
