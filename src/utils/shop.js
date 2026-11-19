// Funções puras do catálogo fictício: facilitam a manutenção e os testes.
export const MAX_PRODUCT_QTY = 20

export function changeCartQuantity(cart, id, delta) {
  const current = cart[id] ?? 0
  return { ...cart, [id]: Math.max(0, Math.min(MAX_PRODUCT_QTY, current + delta)) }
}

export function cartItems(products, cart) {
  return products.filter((product) => (cart[product.id] ?? 0) > 0)
    .map((product) => ({ ...product, quantity: cart[product.id] }))
}

export function cartTotals(items) {
  return {
    count: items.reduce((count, item) => count + item.quantity, 0),
    total: items.reduce((total, item) => total + item.price * item.quantity, 0),
  }
}

export function searchProducts(products, categories, filter, query) {
  const needle = query.trim().toLocaleLowerCase('pt-BR')
  return products.filter((product) => {
    if (filter !== 'todos' && filter !== product.category) return false
    const group = categories.find((category) => category.id === product.category)?.label ?? ''
    return `${product.name} ${product.detail} ${group}`.toLocaleLowerCase('pt-BR').includes(needle)
  })
}
