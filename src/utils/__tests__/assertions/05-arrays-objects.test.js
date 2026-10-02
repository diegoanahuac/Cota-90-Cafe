import { getRegions } from '../../granos'
import { calculateOrderTotal } from '../../pedido'

describe('5. Arreglos y objetos', () => {
  let catalog

  beforeEach(() => {
    catalog = [
      { id: 7, origin: 'México – Chiapas' },
      { id: 8, origin: 'México – Veracruz' },
      { id: 15, origin: 'México – Oaxaca' },
      { id: 4, origin: 'Kenia – Nyeri' },
    ]
  })

  test('A5-01 genera los botones del filtro sin repetir regiones', () => {
    const regions = getRegions(catalog)

    expect(regions).toHaveLength(3)
    expect(regions).toContain('México')
    expect(regions).not.toContain('Oaxaca')
    expect(regions).toEqual(['Todos', 'México', 'Kenia'])
  })

  test('A5-02 el resumen del pedido tiene todos los campos esperados', () => {
    const lines = [
      { price: '$320', quantity: 1 },
      { price: '$380', quantity: 2 },
    ]

    const order = calculateOrderTotal(lines)

    expect(order).toHaveProperty('total')
    expect(order).toMatchObject({ units: 3, subtotal: 1080, shipping: 0 })
    expect(order).toEqual({ units: 3, subtotal: 1080, discount: 0, shipping: 0, total: 1080 })
  })
})
