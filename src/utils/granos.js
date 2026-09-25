// Lógica de negocio del catálogo de granos (extraída de App.jsx y GranoItem.jsx)

export const TODOS = 'Todos'
export const MAX_INTENSITY = 5

// "Colombia – Huila" -> "Colombia"
export const getRegion = (origin) => origin.split('–')[0].trim()

// Botones del filtro: "Todos" + cada región sin repetir
export const getRegions = (items) => [
  TODOS,
  ...new Set(items.map((item) => getRegion(item.origin))),
]

export const filterByRegion = (items, filter) =>
  filter === TODOS
    ? items
    : items.filter((item) => getRegion(item.origin) === filter)

// Intensidad 0-5 en iconos: 3 -> "🔥🔥🔥⚪⚪"
export const getIntensityBeans = (intensity) => {
  if (!Number.isInteger(intensity) || intensity < 0 || intensity > MAX_INTENSITY) {
    throw new RangeError(`La intensidad debe ser un entero entre 0 y ${MAX_INTENSITY}`)
  }
  return '🔥'.repeat(intensity) + '⚪'.repeat(MAX_INTENSITY - intensity)
}

// El cliente HTTP se inyecta (axios en la app, un mock en las pruebas)
export const fetchGranos = async (httpClient) => {
  const resultado = await httpClient.get('/granos.json')
  return resultado.data
}
