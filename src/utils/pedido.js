// Lógica de pedidos: precios, envío, mayoreo y pago

export const FREE_SHIPPING_MIN = 500
export const SHIPPING_COST = 99
export const WHOLESALE_MIN_UNITS = 10
export const WHOLESALE_DISCOUNT = 0.1

const roundCents = (amount) => Math.round(amount * 100) / 100

// "$1,250.50" -> 1250.5
export const parsePrice = (price) => {
  if (typeof price !== 'string' || !/^\$\d{1,3}(,\d{3})*(\.\d{1,2})?$/.test(price.trim())) {
    throw new TypeError(`Precio inválido: ${price}`)
  }
  return Number(price.trim().slice(1).replaceAll(',', ''))
}

// Envío gratis en compras mayores a $500
export const qualifiesForFreeShipping = (subtotal) => subtotal > FREE_SHIPPING_MIN

// lines: [{ price: '$320', quantity: 2 }]
export const calculateOrderTotal = (lines) => {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error('El pedido está vacío')
  }

  let units = 0
  let subtotal = 0
  for (const { price, quantity } of lines) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError(`Cantidad inválida: ${quantity}`)
    }
    units += quantity
    subtotal += parsePrice(price) * quantity
  }

  subtotal = roundCents(subtotal)
  const discount = units >= WHOLESALE_MIN_UNITS ? roundCents(subtotal * WHOLESALE_DISCOUNT) : 0
  const afterDiscount = roundCents(subtotal - discount)
  const shipping = qualifiesForFreeShipping(afterDiscount) ? 0 : SHIPPING_COST

  return {
    units,
    subtotal,
    discount,
    shipping,
    total: roundCents(afterDiscount + shipping),
  }
}

// La pasarela de pago se inyecta (un mock en las pruebas)
export const placeOrder = async (lines, paymentGateway) => {
  const summary = calculateOrderTotal(lines)
  const payment = await paymentGateway.charge(summary.total)

  return {
    orderId: payment.id,
    status: 'pagado',
    ...summary,
  }
}
