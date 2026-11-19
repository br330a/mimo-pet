import test from 'node:test'
import assert from 'node:assert/strict'
import { MAX_PRODUCT_QTY, changeCartQuantity, cartItems, cartTotals, searchProducts } from '../src/utils/shop.js'
const products = [
  { id: 'a', name: 'Blend do Dia', detail: 'Ração canina', category: 'caes', price: 23.50 },
  { id: 'b', name: 'Varinha', detail: 'Brinquedo felino', category: 'gatos', price: 11.90 },
]
const categories = [{ id: 'caes', label: 'Cães' }, { id: 'gatos', label: 'Gatos' }]

test('quantidade respeita limites de 0 a 20', () => {
  assert.equal(changeCartQuantity({}, 'a', -5).a, 0)
  assert.equal(changeCartQuantity({}, 'a', 90).a, MAX_PRODUCT_QTY)
  assert.equal(changeCartQuantity({ a: 2 }, 'a', -1).a, 1)
})
test('carrinho soma quantidade e subtotal corretamente', () => {
  const items = cartItems(products, { a: 2, b: 1 })
  assert.deepEqual(cartTotals(items), { count: 3, total: 58.90 })
  assert.equal(cartItems(products, { a: 0 }).length, 0)
})
test('filtros e busca ignoram caixa e espaços', () => {
  assert.equal(searchProducts(products, categories, 'todos', '   RaÇãO  ').length, 1)
  assert.equal(searchProducts(products, categories, 'gatos', '').length, 1)
  assert.equal(searchProducts(products, categories, 'caes', 'Varinha').length, 0)
})
