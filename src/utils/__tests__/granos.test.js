import { jest } from '@jest/globals'
import {
  getRegion,
  getRegions,
  filterByRegion,
  getIntensityBeans,
  fetchGranos,
} from '../granos'

// Arrange tipo 1: inicializar entradas y parámetros
describe('getIntensityBeans', () => {
  test('UT-01 convierte la intensidad 3 en 3 fuegos y 2 círculos', () => {
    // Arrange
    const intensity = 3

    // Act
    const result = getIntensityBeans(intensity)

    // Assert
    expect(result).toBe('🔥🔥🔥⚪⚪')
  })

  test('UT-02 acepta los límites 0 y 5', () => {
    // Arrange
    const min = 0
    const max = 5

    // Act
    const empty = getIntensityBeans(min)
    const full = getIntensityBeans(max)

    // Assert
    expect(empty).toBe('⚪⚪⚪⚪⚪')
    expect(full).toBe('🔥🔥🔥🔥🔥')
  })

  test('UT-03 rechaza intensidades fuera de rango', () => {
    // Arrange
    const tooHigh = 7
    const negative = -1

    // Act
    const actHigh = () => getIntensityBeans(tooHigh)
    const actNegative = () => getIntensityBeans(negative)

    // Assert
    expect(actHigh).toThrow(RangeError)
    expect(actNegative).toThrow(RangeError)
  })
})

describe('getRegion', () => {
  test('UT-04 devuelve el país de un origen "País – Zona"', () => {
    // Arrange
    const origin = 'Colombia – Huila'

    // Act
    const region = getRegion(origin)

    // Assert
    expect(region).toBe('Colombia')
  })

  test('UT-05 devuelve el texto completo si no hay separador', () => {
    // Arrange
    const origin = '  Blend de la Casa '

    // Act
    const region = getRegion(origin)

    // Assert
    expect(region).toBe('Blend de la Casa')
  })
})

// Arrange tipo 3: configurar dependencias con mocks (inyección de dependencias)
describe('fetchGranos', () => {
  test('UT-13 obtiene los granos a través del cliente HTTP inyectado', async () => {
    // Arrange
    const granos = [{ id: 1, name: 'Colombia Huila Supremo' }]
    const httpClient = { get: jest.fn().mockResolvedValue({ data: granos }) }

    // Act
    const result = await fetchGranos(httpClient)

    // Assert
    expect(result).toEqual(granos)
    expect(httpClient.get).toHaveBeenCalledTimes(1)
    expect(httpClient.get).toHaveBeenCalledWith('/granos.json')
  })

  test('UT-14 propaga el error si la petición falla', async () => {
    // Arrange
    const error = new Error('Network Error')
    const httpClient = { get: jest.fn().mockRejectedValue(error) }

    // Act
    const promise = fetchGranos(httpClient)

    // Assert
    await expect(promise).rejects.toThrow('Network Error')
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

  test('UT-15 genera "Todos" más cada región sin repetir', () => {
    // Arrange: catálogo preparado en beforeEach

    // Act
    const regions = getRegions(catalog)

    // Assert
    expect(regions).toEqual(['Todos', 'Colombia', 'México', 'Etiopía'])
  })

  test('UT-16 devuelve solo los granos de la región seleccionada', () => {
    // Arrange
    const filter = 'México'

    // Act
    const result = filterByRegion(catalog, filter)

    // Assert
    expect(result.map((item) => item.id)).toEqual([7, 8])
  })

  test('UT-17 devuelve todo el catálogo con el filtro "Todos"', () => {
    // Arrange
    const filter = 'Todos'

    // Act
    const result = filterByRegion(catalog, filter)

    // Assert
    expect(result).toHaveLength(4)
    expect(result).toEqual(catalog)
  })
})
