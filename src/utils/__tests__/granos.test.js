import { jest } from '@jest/globals'
import { filterByRegion, fetchGranos } from '../granos'

describe('fetchGranos', () => {
  test('UT-02 obtiene los granos a través del cliente HTTP inyectado', async () => {
    const granos = [{ id: 1, name: 'Colombia Huila Supremo' }]
    const httpClient = { get: jest.fn().mockResolvedValue({ data: granos }) }

    const result = await fetchGranos(httpClient)

    expect(result).toEqual(granos)
    expect(httpClient.get).toHaveBeenCalledWith('/granos.json')
  })
})

describe('filtro por región', () => {
  let catalog

  beforeEach(() => {
    catalog = [
      { id: 1, name: 'Colombia Huila Supremo', origin: 'Colombia – Huila' },
      { id: 7, name: 'México Chiapas Altura', origin: 'México – Chiapas' },
      { id: 8, name: 'México Veracruz Coatepec', origin: 'México – Veracruz' },
      { id: 2, name: 'Etiopía Sidamo Natural', origin: 'Etiopía – Sidamo' },
    ]
  })

  test('UT-04 devuelve solo los granos de la región seleccionada', () => {
    const filter = 'México'

    const result = filterByRegion(catalog, filter)

    expect(result.map((item) => item.id)).toEqual([7, 8])
  })
})
