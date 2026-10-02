import { jest } from '@jest/globals'
import { placeOrder } from '../../pedido'
import { fetchGranos } from '../../granos'

// Aserción 7 – Asíncronas y mocks (dificultad 7/7): resolves, rejects,
// toHaveBeenCalledTimes, toHaveBeenCalledWith, not.toHaveBeenCalled
describe('7. Asíncronas y mocks', () => {
  let paymentGateway

  beforeEach(() => {
    paymentGateway = { charge: jest.fn().mockResolvedValue({ id: 'PAY-001' }) }
  })

  test('A7-01 cobra el total correcto y confirma el pedido', async () => {
    // Arrange
    const lines = [{ price: '$320', quantity: 2 }]

    // Act
    const promise = placeOrder(lines, paymentGateway)

    // Assert
    await expect(promise).resolves.toMatchObject({ orderId: 'PAY-001', status: 'pagado', total: 640 })
    expect(paymentGateway.charge).toHaveBeenCalledTimes(1)
    expect(paymentGateway.charge).toHaveBeenCalledWith(640)
  })

  test('A7-02 propaga el error si la pasarela rechaza el pago', async () => {
    // Arrange
    const lines = [{ price: '$320', quantity: 1 }]
    paymentGateway.charge.mockRejectedValueOnce(new Error('Tarjeta rechazada'))

    // Act
    const promise = placeOrder(lines, paymentGateway)

    // Assert
    await expect(promise).rejects.toThrow('Tarjeta rechazada')
    expect(paymentGateway.charge).toHaveBeenCalledWith(419)
  })

  test('A7-03 no cobra nada si el pedido es inválido', async () => {
    // Arrange
    const emptyOrder = []

    // Act
    const promise = placeOrder(emptyOrder, paymentGateway)

    // Assert
    await expect(promise).rejects.toThrow('El pedido está vacío')
    expect(paymentGateway.charge).not.toHaveBeenCalled()
  })

  test('A7-04 carga el catálogo con un cliente HTTP falso', async () => {
    // Arrange
    const granos = [{ id: 1, name: 'Colombia Huila Supremo' }]
    const httpClient = { get: jest.fn().mockResolvedValue({ data: granos }) }

    // Act
    const promise = fetchGranos(httpClient)

    // Assert
    await expect(promise).resolves.toEqual(granos)
    expect(httpClient.get).toHaveBeenCalledWith('/granos.json')
  })
})
