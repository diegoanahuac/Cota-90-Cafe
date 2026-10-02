import { getRegion } from '../../granos'

describe('1. Igualdad – getRegion', () => {
  test('A1-01 regresa el país de un origen', () => {
    const origin = 'Panamá – Chiriquí'

    const result = getRegion(origin)

    expect(result).toBe('Panamá')
  })
})
