// Respuestas del chat de demostración (extraídas de ChatWidget.jsx)

export const predefinedResponses = {
  horario:
    'Atendemos pedidos en línea 24/7. Nuestro tostador despacha de Lunes a Viernes de 8:00am a 6:00pm.',
  envio:
    'Enviamos a todo México. Envío gratis en compras mayores a $500. Tiempo de entrega: 3-5 días hábiles.',
  granos:
    'Tenemos 16 orígenes disponibles: Colombia, Etiopía, Guatemala, Kenia, Brasil, Panamá, México (Chiapas, Veracruz, Oaxaca), Costa Rica, Rwanda, Perú, Yemen, Indonesia, Honduras y nuestro Blend de la Casa.',
  tueste:
    'Tostamos artesanalmente en lotes pequeños. Ofrecemos tueste ligero, medio, medio-oscuro y oscuro. Todos nuestros granos se tuestan máximo 5 días antes del envío.',
  mayoreo:
    '¡Claro! Ofrecemos precios especiales para cafeterías, restaurantes y oficinas. Llena el formulario de contacto con el asunto "Pedido al mayoreo".',
  suscripcion:
    'Nuestra suscripción mensual te envía granos frescos cada mes. Puedes elegir el origen, tueste y frecuencia. Escríbenos por el formulario de contacto.',
  molienda:
    'Vendemos en grano entero para máxima frescura. Si necesitas molido, indícalo en tu pedido y lo molemos al momento según tu método de preparación.',
  default:
    '¡Gracias por tu mensaje! Esto es un chat de demostración. Para pedidos y consultas detalladas, usa nuestro formulario de contacto. Prueba: granos, envio, tueste, mayoreo, suscripcion, molienda u horario.',
}

// Devuelve la respuesta del bot según la primera palabra clave encontrada,
// o null si el mensaje está vacío
export const getChatResponse = (message) => {
  const keyword = message.toLowerCase().trim()
  if (!keyword) return null

  for (const key of Object.keys(predefinedResponses)) {
    if (keyword.includes(key)) {
      return predefinedResponses[key]
    }
  }
  return predefinedResponses.default
}
