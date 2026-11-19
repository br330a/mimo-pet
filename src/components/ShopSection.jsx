import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cartItems, cartTotals, changeCartQuantity, searchProducts } from '../utils/shop'
import ProductArtwork from './ProductArtwork'
import './ShopSection.css'

export default function ShopSection({ products, categories, formatMoney, Icon }) {
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)
  const [review, setReview] = useState(false)
  const [toast, setToast] = useState(null)
  const reviewHeadingRef = useRef(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const returnRef = useRef(null)
  const items = searchProducts(products, categories, filter, search)
  const selected = cartItems(products, cart)
  const { count, total } = cartTotals(selected)

  function changeQty(id, delta) {
    setCart((previous) => changeCartQuantity(previous, id, delta))
    if (delta > 0) setToast({ name: products.find((product) => product.id === id)?.name ?? 'Produto' })
    setReview(false)
  }
  function showCart() {
    returnRef.current = document.activeElement
    setOpen(true)
    setReview(false)
    setToast(null)
  }
  const hideCart = useCallback(() => {
    setOpen(false)
    setReview(false)
    requestAnimationFrame(() => returnRef.current?.focus?.())
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    if (open && review) reviewHeadingRef.current?.focus()
  }, [open, review])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const root = document.getElementById('root')
    const previousInert = root?.inert ?? false
    document.body.style.overflow = 'hidden'
    // O modal é renderizado no body (portal); o conteúdo da página não recebe foco.
    if (root) root.inert = true
    closeRef.current?.focus()
    const focusables = () => [...(panelRef.current?.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])]
      .filter((node) => node.getClientRects().length > 0)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); hideCart(); return }
      if (event.key !== 'Tab') return
      const nodes = focusables()
      if (!nodes.length) { event.preventDefault(); closeRef.current?.focus(); return }
      const first = nodes[0]
      const last = nodes.at(-1)
      if (!panelRef.current?.contains(document.activeElement)) { event.preventDefault(); first.focus(); return }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      if (root) root.inert = previousInert
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, hideCart])

  return <>
    <section id="loja" className="shop-section section-pad">
      <div className="container">
        <div className="shop-heading">
          <div><div className="section-kicker"><span className="tiny-square"/> MIMO. SHOP / ESCOLHAS ESPECIAIS</div><h2>Coisas boas para <em>todos os pets.</em></h2><p>De cães e gatos a aves, peixes e pequenos companheiros. Explore uma loja conceito feita para escolher com facilidade.</p></div>
          <button className="shop-cart-trigger" type="button" onClick={showCart} aria-label={`Abrir sacola, ${count} itens`}><Icon name="bag" size={20}/><span>Minha sacola</span><b>{count}</b></button>
        </div>
        <div className="shop-feature"><div className="shop-feature-copy"><span>CURADORIA MIMO. / CONCEITO</span><h3>O cuidado também mora nas <em>pequenas escolhas.</em></h3><p>Alimentos, brinquedos e acessórios para transformar a rotina de cada companheiro.</p><a href="#produtos" className="shop-feature-link">Descobrir produtos <Icon name="arrow" size={17}/></a></div><div className="shop-feature-art" aria-hidden="true"><span className="shop-feature-circle"/><span className="shop-feature-bag">mimo<span>.</span><small>para todos os pets</small></span><span className="shop-feature-ball"/></div></div>
        <div id="produtos" className="shop-filters"><div className="shop-tabs" role="group" aria-label="Filtrar produtos por animal">{categories.map((category) => <button key={category.id} type="button" aria-pressed={filter === category.id} className={filter === category.id ? 'active' : ''} onClick={() => setFilter(category.id)}>{category.label}</button>)}</div><div className="shop-search"><Icon name="search" size={18}/><label className="shop-sr-status" htmlFor="mimo-product-search">Buscar produtos</label><input id="mimo-product-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produtos" aria-label="Buscar produtos"/>{search && <button className="shop-clear-search" type="button" onClick={() => setSearch('')} aria-label="Limpar busca"><Icon name="close" size={16}/></button>}</div></div>
        <div className="shop-result-line"><span>{items.length} {items.length === 1 ? 'produto' : 'produtos'}</span><span>Valores ilustrativos · sem compras reais</span></div>
        <div className="product-grid" aria-live="polite">{items.map((product) => <article className="product-card" key={product.id}>
          <div className={`product-visual tone-${product.tint}`}><ProductArtwork type={product.type} name={product.name}/>{product.tag && <span className="product-tag">{product.tag}</span>}</div>
          <div className="product-details"><span className="product-kind">{categories.find((category) => category.id === product.category)?.label}</span>{cart[product.id] > 0 && <span className="product-in-bag">{cart[product.id]} na sacola</span>}<h3>{product.name}</h3><p>{product.detail}</p><div className="product-bottom"><strong>{formatMoney(product.price)}</strong><button type="button" onClick={() => changeQty(product.id, 1)} disabled={cart[product.id] >= 20} aria-label={`Adicionar ${product.name} à sacola`} title="Adicionar à sacola"><Icon name="plus" size={21}/></button></div></div>
        </article>)}</div>
        {!items.length && <div className="shop-empty-search"><strong>Nenhum produto encontrado.</strong><p>Experimente outro termo ou escolha uma categoria diferente.</p><button type="button" onClick={() => {setSearch('');setFilter('todos')}}>Ver todos os produtos</button></div>}
        
        <p className="shop-disclaimer">Produtos, nomes, ilustrações e preços são fictícios. Esta seção demonstra um catálogo e carrinho, sem pagamentos, estoque ou entregas reais.</p>
      </div>
    </section>

    {toast && !open && <div className="shop-toast" role="status" aria-live="polite"><span className="shop-toast-icon"><Icon name="check" size={18}/></span><div><strong>Adicionado à sacola</strong><small>{toast.name}</small></div><button className="shop-toast-view" type="button" onClick={showCart}>Ver sacola</button><button className="shop-toast-close" type="button" onClick={() => setToast(null)} aria-label="Dispensar aviso"><Icon name="close" size={15}/></button></div>}
    {count > 0 && !open && <button className="cart-floating" type="button" onClick={showCart} aria-label={`Ver sacola com ${count} itens`}><Icon name="bag" size={19}/><span>Ver sacola</span><b>{count}</b></button>}
    {open && createPortal(<div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) hideCart() }}><aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="cart-drawer" ref={panelRef}>
      <div className="cart-header"><div><span>MIMO. / SHOP</span><h2 id="cart-title">{review ? 'Resumo da simulação' : 'Sua sacola'}</h2><small className="cart-header-count">{count} {count === 1 ? "item" : "itens"} · sem compras reais</small></div><button ref={closeRef} type="button" onClick={hideCart} aria-label="Fechar sacola"><Icon name="close" size={23}/></button></div>
      {review ? <div className="cart-review"><div className="cart-review-mark"><Icon name="check" size={32}/></div><h3 ref={reviewHeadingRef} tabIndex="-1">Tudo organizado!</h3><p>Veja como ficaria um resumo de pedido, antes de seguir para um checkout real.</p><ul>{selected.map((item) => <li key={item.id}><span>{item.quantity}× {item.name}</span><strong>{formatMoney(item.quantity * item.price)}</strong></li>)}</ul><div className="cart-review-total"><span>Total ilustrativo</span><strong>{formatMoney(total)}</strong></div><p className="cart-demo-note">Nenhuma compra foi realizada. Não há pagamentos, reservas de estoque nem envio de dados.</p><button className="button button-dark" type="button" onClick={() => setReview(false)}>Voltar à sacola <Icon name="arrow" size={16}/></button></div>
        : <><div className="cart-list">{selected.length ? selected.map((item) => <div className="cart-item" key={item.id}><div className={`cart-thumb tone-${item.tint}`}><ProductArtwork type={item.type} name={item.name}/></div><div className="cart-item-copy"><strong>{item.name}</strong><small>{item.detail}</small><span>{formatMoney(item.price)}</span><div className="cart-quantity"><button type="button" onClick={() => changeQty(item.id,-1)} aria-label={`Reduzir quantidade de ${item.name}`}><Icon name="minus" size={15}/></button><span aria-label={`${item.quantity} unidades`}>{item.quantity}</span><button type="button" onClick={() => changeQty(item.id,1)} disabled={item.quantity >= 20} aria-label={`Aumentar quantidade de ${item.name}`}><Icon name="plus" size={15}/></button></div></div><button type="button" className="cart-remove" onClick={() => changeQty(item.id,-item.quantity)} aria-label={`Remover ${item.name}`}><Icon name="trash" size={17}/></button></div>) : <div className="cart-empty"><Icon name="bag" size={33}/><h3>Sua sacola está vazia</h3><p>Adicione alguns favoritos e monte um pedido demonstrativo.</p><button type="button" className="button button-dark" onClick={hideCart}>Explorar produtos <Icon name="arrow" size={17}/></button></div>}</div>{selected.length > 0 && <div className="cart-footer"><div><span>Subtotal ilustrativo</span><strong>{formatMoney(total)}</strong></div><small>Sem frete, pagamento ou compra de verdade.</small><button className="button button-dark" disabled={!selected.length} type="button" onClick={() => {setReview(true);panelRef.current?.scrollTo({top:0,behavior:'smooth'})}}>Simular pedido <Icon name="arrow" size={18}/></button></div>}</>}
    </aside></div>, document.body)}
  </>
}
