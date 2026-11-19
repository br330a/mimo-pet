import { useEffect, useRef, useState } from 'react'
import './App.css'
import ShopSection from './components/ShopSection'

const photos = {
  hero: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=85',
  story: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
  dogOne: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=850&q=82',
  catOne: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=850&q=82',
  dogTwo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=850&q=82',
  catTwo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=850&q=82',
}

const services = [
  { id: 'banho', number: '01', icon: 'bath', title: 'Banho & cuidado', species: ['Cão', 'Gato'], subtitle: 'Um banho de carinho, do focinho ao rabinho.', description: 'Higiene suave e uma rotina de cuidado feita no ritmo do pet.', includes: ['Produtos escolhidos para a pelagem', 'Secagem com atenção', 'Finalização delicada'], tint: 'peach' },
  { id: 'tosa', number: '02', icon: 'scissors', title: 'Tosa & acabamento', species: ['Cão'], subtitle: 'Beleza que respeita cada pelagem.', description: 'Acabamento pensado para o conforto e o estilo de cada cão.', includes: ['Conversa sobre o corte', 'Tosa adequada à pelagem', 'Acabamento cuidadoso'], tint: 'sage' },
  { id: 'hidratacao', number: '03', icon: 'drop', title: 'Hidratação de pelo', species: ['Cão', 'Gato'], subtitle: 'Um toque extra de maciez.', description: 'Rotina complementar de hidratação com atenção ao tipo de pelagem.', includes: ['Avaliação visual da pelagem', 'Cuidado hidratante', 'Finalização suave'], tint: 'lilac' },
  { id: 'patinhas', number: '04', icon: 'paw', title: 'Patinhas & higiene', species: ['Cão', 'Gato'], subtitle: 'Os detalhes também importam.', description: 'Cuidados pontuais de higiene e bem-estar, com manuseio respeitoso.', includes: ['Higiene das patinhas', 'Limpeza delicada', 'Atenção às particularidades'], tint: 'butter' },
  { id: 'primeiro', number: '05', icon: 'heart', title: 'Primeiro banho', species: ['Cão'], subtitle: 'Um começo tranquilo para filhotes.', description: 'Experiência de adaptação, com rotina de cuidado gentil.', includes: ['Apresentação gradual do ambiente', 'Pausas sempre que necessário', 'Experiência acolhedora'], tint: 'sage' },
  { id: 'desembaraco', number: '06', icon: 'spark', title: 'Desembaraço suave', species: ['Cão', 'Gato'], subtitle: 'Conforto em cada escovada.', description: 'Escovação e desembaraço com foco no bem-estar e na pelagem.', includes: ['Escovação cuidadosa', 'Atenção aos nós', 'Finalização leve'], tint: 'lilac' },
  { id: 'felino', number: '07', icon: 'paw', title: 'Rotina felina', species: ['Gato'], subtitle: 'Cada gato tem seu próprio tempo.', description: 'Atendimento conceitual pensado para respeitar a sensibilidade dos gatos.', includes: ['Ambiente mais tranquilo', 'Manuseio gentil', 'Pausas conforme necessidade'], tint: 'peach' },
  { id: 'higienica', number: '08', icon: 'scissors', title: 'Tosa higiênica', species: ['Cão', 'Gato'], subtitle: 'Praticidade para o dia a dia.', description: 'Cuidados de higiene em regiões específicas, conforme o pet.', includes: ['Avaliação do cuidado necessário', 'Acabamento delicado', 'Orientações básicas de rotina'], tint: 'butter' },
]

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'caes', label: 'Cães' },
  { id: 'gatos', label: 'Gatos' },
  { id: 'aves', label: 'Aves' },
  { id: 'pequenos', label: 'Pequenos pets' },
  { id: 'peixes', label: 'Peixes' },
]

const products = [
  { id: 'blend', name: 'Blend do Dia', detail: 'Alimento seco • 2 kg', category: 'caes', price: 129.90, type: 'bag', tint: 'sage', tag: 'Popular' },
  { id: 'bolinha', name: 'Bola Play', detail: 'Brinquedo emborrachado', category: 'caes', price: 34.90, type: 'ball', tint: 'peach' },
  { id: 'guia', name: 'Guia Passeio', detail: 'Coleira e guia ajustável', category: 'caes', price: 89.90, type: 'leash', tint: 'butter' },
  { id: 'sache', name: 'Receita Felina', detail: 'Alimento úmido • 85 g', category: 'gatos', price: 12.90, type: 'pouch', tint: 'lilac', tag: 'Novidade' },
  { id: 'varinha', name: 'Varinha de Brincar', detail: 'Brinquedo com pena', category: 'gatos', price: 29.90, type: 'wand', tint: 'sage' },
  { id: 'arranhador', name: 'Arranhador Ninho', detail: 'Arranhador compacto', category: 'gatos', price: 119.90, type: 'scratcher', tint: 'peach' },
  { id: 'sementes', name: 'Mix de Sementes', detail: 'Mistura para aves • 500 g', category: 'aves', price: 26.90, type: 'bag', tint: 'butter' },
  { id: 'balanco', name: 'Balanço Natural', detail: 'Acessório para aves', category: 'aves', price: 44.90, type: 'swing', tint: 'sage' },
  { id: 'feno', name: 'Feno do Campo', detail: 'Feno selecionado • 500 g', category: 'pequenos', price: 32.90, type: 'hay', tint: 'peach' },
  { id: 'casinha', name: 'Casinha Cozy', detail: 'Abrigo para roedores', category: 'pequenos', price: 68.90, type: 'house', tint: 'lilac' },
  { id: 'flocos', name: 'Flocos Tropicais', detail: 'Alimento para peixes • 60 g', category: 'peixes', price: 28.90, type: 'jar', tint: 'butter' },
  { id: 'aquario', name: 'Pedras do Rio', detail: 'Decoração para aquário', category: 'peixes', price: 39.90, type: 'stones', tint: 'sage' },
]

const formatMoney = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const availableDays = (() => {
  const days = []
  const today = new Date()
  for (let offset = 1; offset <= 15 && days.length < 8; offset += 1) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    if (day.getDay() !== 0) days.push({ id: dateKey(day), weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(day).replace('.', ''), day: new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(day), month: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(day).replace('.', '') })
  }
  return days
})()
const slotHours = ['09:00', '10:30', '11:30', '13:30', '15:00', '16:30']
// Disponibilidade 100% fictícia: apenas uma amostra para demonstrar a interface.
const slotsForDay = (id) => slotHours.map((time, index) => ({ time, available: ((Number(id.slice(-2)) + index * 3) % 5) !== 0 }))

const gallery = [
  { id: 1, title: 'Beleza em cada detalhe', type: 'caes', label: 'Cães', image: photos.dogOne, color: 'peach' },
  { id: 2, title: 'Um mundo de descobertas', type: 'gatos', label: 'Gatos', image: photos.catOne, color: 'lilac' },
  { id: 3, title: 'Cuidado com personalidade', type: 'caes', label: 'Cães', image: photos.dogTwo, color: 'sage' },
  { id: 4, title: 'Momentos tranquilos', type: 'gatos', label: 'Gatos', image: photos.catTwo, color: 'butter' },
]

const faqs = [
  ['Os horários mostrados estão livres de verdade?', 'Não. Datas e horários são totalmente ilustrativos. A seleção apenas demonstra como seria uma agenda integrada a um sistema real. Nenhuma reserva é realizada.'],
  ['Quais cuidados estão disponíveis?', 'A demonstração inclui oito cuidados para cães e gatos. A oferta real precisaria ser definida por uma equipe de atendimento e respeitar as características de cada animal.'],
  ['O site funciona bem no celular?', 'Sim. A experiência foi pensada primeiro para telas menores, com navegação acessível, botões confortáveis e layout que se adapta.'],
  ['Posso comprar os produtos?', 'Não. A loja, os preços e o carrinho são demonstrativos. É possível explorar produtos e simular um pedido, mas nenhum pagamento, entrega ou compra acontece.'],
  ['O MIMO. é uma empresa real?', 'Não. MIMO. é uma marca fictícia criada para um portfólio. Serviços, produtos, preços e agendamentos são ilustrativos.'],
]

function Icon({ name, size = 24, strokeWidth = 1.8 }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    northeast: <><path d="M7 17 17 7M8 7h9v9"/></>,
    menu: <><path d="M4 8h16M4 16h16"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>,
    paw: <><ellipse cx="12" cy="16.5" rx="5.5" ry="4"/><ellipse cx="4.6" cy="10" rx="1.6" ry="2.4" transform="rotate(-18 4.6 10)"/><ellipse cx="9" cy="6.3" rx="1.6" ry="2.4"/><ellipse cx="15" cy="6.3" rx="1.6" ry="2.4"/><ellipse cx="19.4" cy="10" rx="1.6" ry="2.4" transform="rotate(18 19.4 10)"/></>,
    spark: <><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z"/><path d="m19 17 .8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z"/></>,
    bath: <><path d="M4 11h16v4a8 8 0 0 1-16 0v-4ZM2 11h20M7 19l-1 2m11-2 1 2"/><path d="M7 7h.01M11 4h.01M17 7h.01"/></>,
    scissors: <><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.2 8.2 12 12M14 10l6-6M8.2 15.8l2.5-2.5"/></>,
    drop: <path d="M12 3c3 5 7 8.5 7 12a7 7 0 0 1-14 0c0-3.5 4-7 7-12Z"/>,
    check: <path d="m5 12 4.5 4.5L19 7"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    heart: <path d="M20.7 5.3a5.3 5.3 0 0 0-7.5 0L12 6.5l-1.2-1.2a5.3 5.3 0 0 0-7.5 7.5L12 21l8.7-8.2a5.3 5.3 0 0 0 0-7.5Z"/>,
    shield: <><path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    minus: <path d="M5 12h14"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/></>,
  }
  return <svg {...shared}>{paths[name] ?? paths.paw}</svg>
}

function Mark({ small = false }) {
  return <a className={`brand ${small ? 'brand-small' : ''}`} href="#inicio" aria-label="MIMO., voltar ao início">mimo<span className="brand-period">.</span><span className="brand-paw" aria-hidden="true"><Icon name="paw" size={14} strokeWidth={2} /></span></a>
}

function ServiceCard({ item, selected, onSelect }) {
  return <button className={`service-card tone-${item.tint} ${selected ? 'is-selected' : ''}`} type="button" onClick={() => onSelect(item.id, true)} aria-pressed={selected}>
    <span className="service-top"><span>{item.number} / CUIDADO ESPECIAL</span><span className="service-icon"><Icon name={item.icon} size={26}/></span></span>
    <span className="service-card-bottom"><strong>{item.title}</strong><span>{item.subtitle}</span><small>{item.species.join(' · ')}</small></span>
    <span className="service-arrow"><Icon name="northeast" size={20}/></span>
  </button>
}

const initialForm = { tutor: '', pet: '', kind: 'Cão', size: 'Pequeno', service: 'banho', date: availableDays[0]?.id ?? '', time: '' }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState('banho')
  const [serviceFilter, setServiceFilter] = useState('todos')
  const [galleryFilter, setGalleryFilter] = useState('todos')
  const [form, setForm] = useState(initialForm)
  const [summary, setSummary] = useState(false)
  const summaryRef = useRef(null)
  const serviceDetailsRef = useRef(null)
  const active = services.find((service) => service.id === activeService)
  const filteredServices = serviceFilter === 'todos' ? services : services.filter((service) => service.species.includes(serviceFilter))
  const bookingServices = services.filter((service) => service.species.includes(form.kind))
  const dateSlots = form.date ? slotsForDay(form.date) : []
  const freeSlots = dateSlots.filter((slot) => slot.available).length
  const selectedDay = availableDays.find((day) => day.id === form.date)
  const selectedCare = services.find((service) => service.id === form.service)
  const filteredGallery = galleryFilter === 'todos' ? gallery : gallery.filter((item) => item.type === galleryFilter)

  useEffect(() => { if (summary) summaryRef.current?.focus() }, [summary])
  useEffect(() => {
    function closeOnEscape(event) { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function selectService(id, showDetails = false) {
    const service = services.find((item) => item.id === id)
    if (!service) return
    setActiveService(id)
    setForm((previous) => ({ ...previous, service: id, kind: service.species.includes(previous.kind) ? previous.kind : service.species[0] }))
    setSummary(false)
    // No celular, o painel fica depois dos cards: revelar o conteúdo escolhido.
    if (showDetails && window.matchMedia('(max-width: 850px)').matches) {
      window.requestAnimationFrame(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        serviceDetailsRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      })
    }
  }
  function updateForm(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    setSummary(false)
  }
  function selectKind(kind) {
    setForm((previous) => ({
      ...previous,
      kind,
      service: services.find((service) => service.id === previous.service)?.species.includes(kind) ? previous.service : services.find((service) => service.species.includes(kind)).id,
    }))
    setSummary(false)
  }
  function selectDay(date) {
    setForm((previous) => ({ ...previous, date, time: '' }))
    setSummary(false)
  }
  function submitForm(event) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    if (!form.date || !form.time || !slotsForDay(form.date).some((slot) => slot.time === form.time && slot.available)) return
    setSummary(true)
  }
  function closeMenu() { setMenuOpen(false) }

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <div className="demo-banner"><span className="demo-dot"/> CONCEITO DIGITAL DE PET CARE · PROJETO DEMONSTRATIVO</div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Mark />
        <nav id="main-nav" aria-label="Menu principal" className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`}>
          <a onClick={closeMenu} href="#sobre">Nosso jeito</a>
          <a onClick={closeMenu} href="#servicos">Cuidados</a>
          <a onClick={closeMenu} href="#loja">Loja</a>
          <a onClick={closeMenu} href="#galeria">Galeria</a>
          <a onClick={closeMenu} href="#duvidas">Dúvidas</a>
          <a onClick={closeMenu} className="nav-mobile-cta" href="#agendar">Escolher horário <Icon name="northeast" size={16}/></a>
        </nav>
        <div className="nav-actions"><a className="button button-dark nav-cta" href="#agendar">Escolher horário <Icon name="northeast" size={17}/></a>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)} type="button"><Icon name={menuOpen ? 'close' : 'menu'} size={23}/></button>
        </div>
      </div>
    </header>

    <main id="conteudo">
      <section id="inicio" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> MIMO. PET CARE — UMA NOVA FORMA DE CUIDAR</div>
            <h1>O carinho está nos <em>detalhes.</em></h1>
            <p>Cuidado com propósito, atenção de verdade e momentos mais leves para quem faz parte da família.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#servicos">Conheça nossos cuidados <Icon name="northeast" size={17}/></a>
              <a className="button button-quiet" href="#loja">Explorar a loja <Icon name="arrow" size={17}/></a>
            </div>
            <div className="hero-footnote"><span className="hero-rule"/> UM ESPAÇO PARA O BEM-ESTAR DE CADA PET.</div>
          </div>
          <div className="hero-art">
            <img className="hero-main-photo" src={photos.hero} alt="Retrato fotográfico de um cão, representando o cuidado e o bem-estar animal" fetchPriority="high" />
            <div className="hero-photo-label"><span>01 / MIMO. PET CARE</span><strong>Um cuidado que faz sentir em casa.</strong></div>
          </div>
        </div>
        <div className="container hero-bottom-line"><span>PROJETO CONCEITUAL · 2026</span><a href="#servicos">DESCUBRA O MIMO. <Icon name="arrow" size={15}/></a></div>
      </section>

      <section id="sobre" className="intro-section section-pad">
        <div className="container intro-layout">
          <div className="intro-photo"><img src={photos.story} alt="Cães passeando ao ar livre, em um momento de tranquilidade" loading="lazy" decoding="async" /><span>MAIS QUE UM SERVIÇO. UMA RELAÇÃO DE CONFIANÇA.</span></div>
          <div className="intro-copy"><div className="section-kicker"><span className="tiny-square"/> O NOSSO JEITO</div><h2>Bem-estar é sentir-se <em>em boas mãos.</em></h2><p>No MIMO., imaginamos o cuidado como ele deve ser: tranquilo, individual e cheio de atenção. Um espaço pensado para respeitar o ritmo e a personalidade de cada pet.</p><div className="intro-chips"><span><Icon name="heart" size={18}/> Atenção individual</span><span><Icon name="shield" size={18}/> Respeito ao pet</span><span><Icon name="spark" size={18}/> Experiência acolhedora</span></div></div>
        </div>
      </section>

      <section id="servicos" className="services-section section-pad"><div className="container">
        <div className="section-heading"><div><div className="section-kicker"><span className="tiny-square"/> NOSSOS CUIDADOS</div><h2>Um cuidado para <em>cada necessidade.</em></h2></div><p>Explore nossos serviços e descubra o que está incluído em cada cuidado.</p></div>
        <div className="service-filter-bar" role="group" aria-label="Filtrar cuidados por animal">{[['todos','Todos os cuidados'],['Cão','Para cães'],['Gato','Para gatos']].map(([id,label]) => <button key={id} type="button" aria-pressed={serviceFilter === id} className={serviceFilter === id ? 'selected' : ''} onClick={() => {setServiceFilter(id);const first = id === 'todos' ? services[0] : services.find((item) => item.species.includes(id));setActiveService(first.id)}}>{label}</button>)}</div>
        <div className="services-layout"><div className="services-grid">{filteredServices.map((item) => <ServiceCard key={item.id} item={item} selected={activeService === item.id} onSelect={selectService}/>)}</div>
          <div className="service-details" ref={serviceDetailsRef} aria-live="polite" tabIndex="-1"><div className="detail-header"><span>SELECIONADO PARA EXPLORAR</span><Icon name="spark" size={21}/></div><div className="detail-icon"><Icon name={active.icon} size={36}/></div><h3>{active.title}</h3><p>{active.description}</p><ul>{active.includes.map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul><a className="button button-light" href="#agendar" onClick={() => selectService(active.id)}>Escolher cuidado e horário <Icon name="arrow" size={18}/></a><small>Seleção demonstrativa, sem confirmação de agendamento real.</small></div></div>
      </div></section>

      <ShopSection products={products} categories={categories} formatMoney={formatMoney} Icon={Icon}/>

      <section className="statement-section"><div className="container statement-wrap"><Icon name="paw" size={38}/><p>Para eles, o melhor cuidado é aquele que <em>se sente.</em></p><span>MIMO. · PET CARE</span></div></section>

      <section id="galeria" className="gallery-section section-pad"><div className="container"><div className="section-heading"><div><div className="section-kicker"><span className="tiny-square"/> PEQUENOS PROTAGONISTAS</div><h2>Pequenos momentos, <em>grandes histórias.</em></h2></div><p>Uma coleção de imagens ilustrativas que traduzem o universo afetivo do MIMO.</p></div>
        <div className="gallery-toolbar" role="group" aria-label="Filtrar fotos">{[['todos', 'Todos'], ['caes','Cães'], ['gatos', 'Gatos']].map(([id, label]) => <button type="button" key={id} aria-pressed={galleryFilter === id} className={`filter-button ${galleryFilter === id ? 'filter-active' : ''}`} onClick={() => setGalleryFilter(id)}>{label}</button>)}</div>
        <div className="gallery-grid" aria-live="polite">{filteredGallery.map((item) => <article className={`gallery-card gallery-${item.color}`} key={item.id}><div className="gallery-image"><img src={item.image} alt={`Fotografia ilustrativa: ${item.title}`} loading="lazy" decoding="async" /></div><div className="gallery-caption"><div><span>{item.label.toUpperCase()}</span><h3>{item.title}</h3></div><span className="gallery-star" aria-hidden="true">✳</span></div></article>)}</div>
      </div></section>

      <section id="agendar" className="booking-section section-pad"><div className="container booking-grid"><div className="booking-copy"><div className="section-kicker"><span className="tiny-square"/> UMA EXPERIÊNCIA PARA TESTAR</div><h2>Um cuidado especial <em>no seu tempo.</em></h2><p>Escolha o cuidado, uma data e um horário. Tudo de forma simples, como em uma agenda de verdade.</p><div className="booking-note"><Icon name="spark" size={23}/><div><strong>Agenda demonstrativa.</strong><span>Os horários são exemplos fictícios — não indicam vagas reais. Nenhuma informação é enviada ou salva em servidor.</span></div></div></div>
          <div className="booking-panel"><div className="booking-panel-top"><span>SIMULAÇÃO DE AGENDAMENTO</span><span>SEM RESERVA REAL</span></div>
            {!summary ? <form className="booking-form" onSubmit={submitForm}><div className="booking-steps" aria-label="Etapas desta simulação"><span><b>01</b> Seu pet</span><span><b>02</b> Cuidado</span><span><b>03</b> Data e hora</span></div><h3>Conte sobre seu pet <span>♡</span></h3><div className="form-row"><label>Seu primeiro nome<input name="tutor" type="text" autoComplete="given-name" maxLength="45" placeholder="Ex.: Ana" required value={form.tutor} onChange={updateForm}/></label><label>Nome do pet<input name="pet" type="text" maxLength="45" placeholder="Ex.: Mel" required value={form.pet} onChange={updateForm}/></label></div>
              <div className="field-group"><span className="field-label">Seu companheiro é um...</span><div className="choice-group">{['Cão', 'Gato'].map((kind) => <button type="button" className={form.kind === kind ? 'is-active' : ''} aria-pressed={form.kind === kind} onClick={() => selectKind(kind)} key={kind}>{kind === 'Cão' ? '🐶' : '🐱'} {kind}</button>)}</div></div>
              <div className="form-row"><label>Porte do pet<select name="size" value={form.size} onChange={updateForm}><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label><label>Cuidado desejado<select name="service" value={form.service} onChange={updateForm}>{bookingServices.map((service) => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label></div>
              <div className="field-group"><span className="field-label">Escolha um dia <small>(datas ilustrativas)</small></span><div className="booking-days" role="group" aria-label="Escolher data simulada">{availableDays.map((day) => <button key={day.id} type="button" className={form.date === day.id ? 'is-active' : ''} aria-pressed={form.date === day.id} aria-label={`Selecionar ${day.weekday}, ${day.day} de ${day.month} (data fictícia)`} onClick={() => selectDay(day.id)}><span>{day.weekday}</span><strong>{day.day}</strong><small>{day.month}</small></button>)}</div></div>
              <div className="field-group"><div className="booking-time-header"><span className="field-label">Escolha um horário <small>(disponibilidade fictícia)</small></span><span className="booking-free-count"><i aria-hidden="true" /> {freeSlots} {freeSlots === 1 ? "horário" : "horários"} nesta data</span></div><div className="booking-times" role="group" aria-label="Escolher horário simulado">{dateSlots.map((slot) => <button type="button" key={slot.time} disabled={!slot.available} aria-pressed={form.time === slot.time} aria-label={`${slot.time}${slot.available ? ' disponível nesta demonstração' : ' indisponível nesta demonstração'}`} className={form.time === slot.time ? 'is-active' : ''} onClick={() => {setForm((previous) => ({ ...previous, time: slot.time }));setSummary(false)}}>{slot.time}</button>)}</div><small className="time-caption">Horários riscados estão indisponíveis apenas nesta demonstração.</small></div>
              <div className="booking-recap" role="status" aria-live="polite"><span>RESUMO DA ESCOLHA</span><strong>{selectedCare?.title ?? "Cuidado"} · {form.kind}</strong><p>{form.time && selectedDay ? `${selectedDay.weekday}, ${selectedDay.day} de ${selectedDay.month} às ${form.time}` : "Escolha um horário para revisar a solicitação."}</p></div>
              <button type="submit" disabled={!form.time} className="button button-dark booking-submit">Revisar minha solicitação <Icon name="arrow" size={18}/></button><p className="form-footnote">Nenhum horário é reservado. Seus dados ficam apenas nesta tela.</p>
            </form> : <div className="booking-summary" ref={summaryRef} tabIndex="-1"><div className="summary-icon"><Icon name="check" size={30}/></div><h3>Um mimo especial para {form.pet}!</h3><p>Este seria o resumo da sua solicitação:</p><dl><div><dt>Responsável</dt><dd>{form.tutor}</dd></div><div><dt>Pet</dt><dd>{form.pet} · {form.kind} · {form.size}</dd></div><div><dt>Cuidado</dt><dd>{services.find((service) => service.id === form.service)?.title}</dd></div><div><dt>Data</dt><dd>{form.date.split('-').reverse().join('/')}</dd></div><div><dt>Horário</dt><dd>{form.time}</dd></div></dl><div className="summary-notice">Simulação concluída. Nenhuma reserva foi realizada, e este horário não corresponde a uma agenda real.</div><button type="button" onClick={() => setSummary(false)} className="button button-dark booking-submit">Editar solicitação <Icon name="arrow" size={18}/></button></div>}
          </div>
        </div></section>

      <section id="duvidas" className="faq-section section-pad"><div className="container faq-grid"><div><div className="section-kicker"><span className="tiny-square"/> DÚVIDAS FREQUENTES</div><h2>Tudo o que você <em>precisa saber.</em></h2><p>Um espaço para esclarecer dúvidas e mostrar como a experiência poderia funcionar.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} className="faq-item"><summary><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="bottom-cta"><div className="container bottom-cta-inner"><div className="section-kicker">UMA EXPERIÊNCIA FEITA COM INTENÇÃO</div><h2>O próximo cuidado<br/>começa aqui. <span>↗</span></h2><p>Escolha um cuidado, explore a loja e experimente uma jornada digital que coloca cada pet em primeiro lugar.</p><div className="bottom-buttons"><a className="button button-cream" href="#agendar">Testar agendamento <Icon name="northeast" size={19}/></a><a className="button button-cream-outline" href="#loja">Explorar a loja <Icon name="bag" size={19}/></a></div></div></section>
    </main>

    <footer className="footer"><div className="container footer-top"><Mark small/><span>Um universo de cuidado e personalidade.</span><a href="#inicio" className="back-top">Voltar ao topo ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MIMO. · Conceito fictício para portfólio.</span><span>Sem atendimentos, estoque ou compras reais</span></div></footer>
  </>
}

export default App
