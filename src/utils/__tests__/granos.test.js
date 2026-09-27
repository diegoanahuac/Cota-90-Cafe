import { jest } from '@jest/globals'
import { filterByRegion, fetchGranos } from '../granos'

// Arrange tipo 3: configurar dependencias con mocks (inyección de dependencias)
describe('fetchGranos', () => {
  test('UT-02 obtiene los granos a través del cliente HTTP inyectado', async () => {
    // Arrange
    const granos = [{ id: 1, name: 'Colombia Huila Supremo' }]
    const httpClient = { get: jest.fn().mockResolvedValue({ data: granos }) }

    // Act
    const result = await fetchGranos(httpClient)

    // Assert
    expect(result).toEqual(granos)
    expect(httpClient.get).toHaveBeenCalledWith('/granos.json')
  })
})

// Arrange tipo 4: preparar el estado requerido (catálogo de prueba)
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
    // Arrange
    const filter = 'México'

    // Act
    const result = filterByRegion(catalog, filter)

    // Assert
    expect(result.map((item) => item.id)).toEqual([7, 8])
  })
})
