import { jest } from '@jest/globals'
import { placeOrder } from '../../pedido'
import { fetchGranos } from '../../granos'

describe('7. Asíncronas y mocks', () => {
  let paymentGateway

  beforeEach(() => {
    paymentGateway = { charge: jest.fn().mockResolvedValue({ id: 'PAY-001' }) }
  })

  test('A7-01 cobra el total correcto y confirma el pedido', async () => {
    const lines = [{ price: '$320', quantity: 2 }]

    const promise = placeOrder(lines, paymentGateway)

    await expect(promise).resolves.toMatchObject({ orderId: 'PAY-001', status: 'pagado', total: 640 })
    expect(paymentGateway.charge).toHaveBeenCalledTimes(1)
    expect(paymentGateway.charge).toHaveBeenCalledWith(640)
  })

  test('A7-02 propaga el error si la pasarela rechaza el pago', async () => {
    const lines = [{ price: '$320', quantity: 1 }]
    paymentGateway.charge.mockRejectedValueOnce(new Error('Tarjeta rechazada'))

    const promise = placeOrder(lines, paymentGateway)

    await expect(promise).rejects.toThrow('Tarjeta rechazada')
    expect(paymentGateway.charge).toHaveBeenCalledWith(419)
  })

  test('A7-03 no cobra nada si el pedido es inválido', async () => {
    const emptyOrder = []

    const promise = placeOrder(emptyOrder, paymentGateway)

    await expect(promise).rejects.toThrow('El pedido está vacío')
    expect(paymentGateway.charge).not.toHaveBeenCalled()
  })

  test('A7-04 carga el catálogo con un cliente HTTP falso', async () => {
    const granos = [{ id: 1, name: 'Colombia Huila Supremo' }]
    const httpClient = { get: jest.fn().mockResolvedValue({ data: granos }) }

    const promise = fetchGranos(httpClient)

    await expect(promise).resolves.toEqual(granos)
    expect(httpClient.get).toHaveBeenCalledWith('/granos.json')
  })
})
