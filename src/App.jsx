import { useEffect, useRef, useState } from 'react'
import './App.css'

const services = [
  {
    id: 'banho', number: '01', icon: 'bath', title: 'Banho & cheirinho',
    subtitle: 'Um banho de carinho, do focinho ao rabinho.',
    description: 'Uma pausa gostosa para cuidar da higiene e deixar o pelo macio e leve.',
    includes: ['Higienização delicada', 'Secagem cuidadosa', 'Finalização perfumada'],
    tint: 'peach',
  },
  {
    id: 'tosa', number: '02', icon: 'scissors', title: 'Tosa com cuidado',
    subtitle: 'Beleza com conforto em primeiro lugar.',
    description: 'Um cuidado pensado para o tipo de pelagem e a rotina de cada pet.',
    includes: ['Conversa sobre o estilo', 'Cuidados com a pelagem', 'Acabamento caprichado'],
    tint: 'sage',
  },
  {
    id: 'hidratacao', number: '03', icon: 'drop', title: 'Hidratação',
    subtitle: 'Pelo bonito também é pelo bem cuidado.',
    description: 'Um momento extra de atenção para pelagens que pedem um toque de maciez.',
    includes: ['Avaliação da pelagem', 'Cuidado hidratante', 'Finalização suave'],
    tint: 'lilac',
  },
  {
    id: 'patinhas', number: '04', icon: 'paw', title: 'Spa das patinhas',
    subtitle: 'Até os passinhos merecem um mimo.',
    description: 'Pequenos cuidados de higiene e bem-estar para completar a experiência.',
    includes: ['Higiene das patinhas', 'Cuidados pontuais', 'Atenção aos detalhes'],
    tint: 'butter',
  },
]

const gallery = [
  { id: 1, title: 'Sorriso de orelha a orelha', type: 'caes', label: 'Cães', image: '/illustrations/dog-happy.svg', color: 'peach' },
  { id: 2, title: 'Elegância felina', type: 'gatos', label: 'Gatos', image: '/illustrations/cat-curious.svg', color: 'lilac' },
  { id: 3, title: 'Dia de autocuidado', type: 'caes', label: 'Cães', image: '/illustrations/dog-spa.svg', color: 'sage' },
  { id: 4, title: 'Um pequeno descanso', type: 'gatos', label: 'Gatos', image: '/illustrations/cat-cozy.svg', color: 'butter' },
]

const faqs = [
  ['Como funciona o agendamento?', 'Nesta demonstração você pode escolher os cuidados e montar uma solicitação fictícia. Nenhuma reserva é realizada ou enviada. Em um projeto real, poderíamos integrar WhatsApp ou a agenda usada pelo estabelecimento.'],
  ['Quais serviços são oferecidos?', 'Banho, tosa, hidratação e cuidados especiais são exemplos de serviços apresentados no conceito MIMO. O catálogo real seria definido pelo estabelecimento contratante.'],
  ['O site funciona bem no celular?', 'Sim. A experiência foi pensada primeiro para telas menores, com navegação acessível, botões confortáveis e layout que se adapta.'],
  ['O MIMO. é uma empresa real?', 'Não. MIMO. é uma marca fictícia criada como projeto demonstrativo de desenvolvimento web. As ilustrações, descrições e o agendamento são conceituais.'],
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
  }
  return <svg {...shared}>{paths[name] ?? paths.paw}</svg>
}

function Mark({ small = false }) {
  return <a className={`brand ${small ? 'brand-small' : ''}`} href="#inicio" aria-label="MIMO., voltar ao início">mimo<span className="brand-period">.</span><span className="brand-paw" aria-hidden="true"><Icon name="paw" size={14} strokeWidth={2} /></span></a>
}

function ServiceCard({ item, selected, onSelect }) {
  return <button className={`service-card tone-${item.tint} ${selected ? 'is-selected' : ''}`} type="button" onClick={() => onSelect(item.id)} aria-pressed={selected}>
    <span className="service-top"><span>{item.number} / CUIDADO ESPECIAL</span><span className="service-icon"><Icon name={item.icon} size={26}/></span></span>
    <span className="service-card-bottom"><strong>{item.title}</strong><span>{item.subtitle}</span></span>
    <span className="service-arrow"><Icon name="northeast" size={20}/></span>
  </button>
}

const initialForm = { tutor: '', pet: '', kind: 'Cão', size: 'Pequeno', service: 'banho', period: 'Manhã' }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState('banho')
  const [galleryFilter, setGalleryFilter] = useState('todos')
  const [form, setForm] = useState(initialForm)
  const [summary, setSummary] = useState(false)
  const summaryRef = useRef(null)
  const active = services.find((service) => service.id === activeService)
  const filteredGallery = galleryFilter === 'todos' ? gallery : gallery.filter((item) => item.type === galleryFilter)

  useEffect(() => { if (summary) summaryRef.current?.focus() }, [summary])
  useEffect(() => {
    function closeOnEscape(event) { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function selectService(id) {
    setActiveService(id)
    setForm((previous) => ({ ...previous, service: id }))
    setSummary(false)
  }
  function updateForm(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    setSummary(false)
  }
  function submitForm(event) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSummary(true)
  }
  function closeMenu() { setMenuOpen(false) }

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <div className="demo-banner"><span className="demo-dot"/> Projeto demonstrativo · marca fictícia · nenhum agendamento real</div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Mark />
        <nav id="main-nav" aria-label="Menu principal" className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`}>
          <a onClick={closeMenu} href="#sobre">Nosso jeito</a>
          <a onClick={closeMenu} href="#servicos">Cuidados</a>
          <a onClick={closeMenu} href="#galeria">Galeria</a>
          <a onClick={closeMenu} href="#duvidas">Dúvidas</a>
          <a onClick={closeMenu} className="nav-mobile-cta" href="#agendar">Simular visita <Icon name="northeast" size={16}/></a>
        </nav>
        <div className="nav-actions"><a className="button button-dark nav-cta" href="#agendar">Simular visita <Icon name="northeast" size={17}/></a>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)} type="button"><Icon name={menuOpen ? 'close' : 'menu'} size={23}/></button>
        </div>
      </div>
    </header>

    <main id="conteudo">
      <section id="inicio" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-icon"><Icon name="paw" size={15}/></span> UM LUGARZINHO ESPECIAL PARA ELES</div>
            <h1>Mais carinho.<br/>Mais <span className="hero-word">rabinhos <span className="underline-swoosh" aria-hidden="true"/></span><br/>felizes.</h1>
            <p>Um conceito de pet care feito para transformar cada cuidado em um momento leve, tranquilo e cheio de afeto.</p>
            <div className="hero-actions"><a className="button button-dark" href="#agendar">Quero conhecer <Icon name="arrow" size={18}/></a><a className="button button-quiet" href="#servicos">Explorar cuidados <Icon name="northeast" size={17}/></a></div>
            <div className="hero-footnote"><Icon name="spark" size={18}/> Cada pet tem seu jeitinho. Cada cuidado também.</div>
          </div>
          <div className="hero-art" aria-label="Ilustração de um cachorro sorridente, identidade visual MIMO.">
            <span className="hero-asterisk" aria-hidden="true">✳</span><span className="hero-scribble" aria-hidden="true">✦</span>
            <div className="hero-picture"><img src="/illustrations/dog-happy.svg" alt="Ilustração de um cachorro feliz" fetchPriority="high" /></div>
            <div className="hero-float hero-float-top"><Icon name="heart" size={17}/> feito com carinho</div>
            <div className="hero-float hero-float-bottom"><Icon name="paw" size={24}/> cuidado do nosso jeitinho</div>
            <span className="hero-art-caption">BEM-VINDOS AO UNIVERSO MIMO. <span>↗</span></span>
          </div>
        </div>
        <div className="container hero-bottom-line"><span>01 / 05</span><span>ROLAR PARA DESCOBRIR <Icon name="arrow" size={15}/></span></div>
      </section>

      <section id="sobre" className="intro-section section-pad">
        <div className="container intro-layout"><div className="section-kicker"><span className="tiny-square"/> O NOSSO JEITO</div><div><h2>Cuidar é prestar atenção <em>nos pequenos detalhes.</em></h2><p>Da primeira cheirada ao último carinho, cada pet merece se sentir à vontade. No MIMO., imaginamos um universo de cuidados simples, gentis e cheios de personalidade.</p><div className="intro-chips"><span><Icon name="heart" size={18}/> Com afeto</span><span><Icon name="shield" size={18}/> Com atenção</span><span><Icon name="spark" size={18}/> Com leveza</span></div></div></div>
      </section>

      <section id="servicos" className="services-section section-pad"><div className="container">
        <div className="section-heading"><div><div className="section-kicker"><span className="tiny-square"/> NOSSOS CUIDADOS</div><h2>Um mimo para <em>cada momento.</em></h2></div><p>Escolha um cuidado para ver os detalhes e experimentar a interação.</p></div>
        <div className="services-layout"><div className="services-grid">{services.map((item) => <ServiceCard key={item.id} item={item} selected={activeService === item.id} onSelect={selectService}/>)}</div>
          <div className="service-details" aria-live="polite"><div className="detail-header"><span>SELECIONADO PARA EXPLORAR</span><Icon name="spark" size={21}/></div><div className="detail-icon"><Icon name={active.icon} size={36}/></div><h3>{active.title}</h3><p>{active.description}</p><ul>{active.includes.map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul><a className="button button-light" href="#agendar" onClick={() => selectService(active.id)}>Simular este cuidado <Icon name="arrow" size={18}/></a><small>Experiência ilustrativa, sem preços ou agendamento real.</small></div></div>
      </div></section>

      <section className="statement-section"><div className="container statement-wrap"><Icon name="paw" size={38}/><p>Grandes amizades merecem <em>pequenos grandes cuidados.</em></p><span>MIMO. · PET CARE</span></div></section>

      <section id="galeria" className="gallery-section section-pad"><div className="container"><div className="section-heading"><div><div className="section-kicker"><span className="tiny-square"/> PEQUENOS PROTAGONISTAS</div><h2>Uma galeria de <em>fofura.</em></h2></div><p>Ilustrações originais feitas para apresentar o universo visual desta marca fictícia.</p></div>
        <div className="gallery-toolbar" role="group" aria-label="Filtrar ilustrações">{[['todos', 'Todos'], ['caes','Cães'], ['gatos', 'Gatos']].map(([id, label]) => <button type="button" key={id} aria-pressed={galleryFilter === id} className={`filter-button ${galleryFilter === id ? 'filter-active' : ''}`} onClick={() => setGalleryFilter(id)}>{label}</button>)}</div>
        <div className="gallery-grid" aria-live="polite">{filteredGallery.map((item) => <article className={`gallery-card gallery-${item.color}`} key={item.id}><div className="gallery-image"><img src={item.image} alt={`Ilustração: ${item.title}`} loading="lazy" decoding="async" /></div><div className="gallery-caption"><div><span>{item.label.toUpperCase()}</span><h3>{item.title}</h3></div><span className="gallery-star" aria-hidden="true">✳</span></div></article>)}</div>
      </div></section>

      <section id="agendar" className="booking-section section-pad"><div className="container booking-grid"><div className="booking-copy"><div className="section-kicker"><span className="tiny-square"/> UMA EXPERIÊNCIA PARA TESTAR</div><h2>Vamos pensar no próximo <em>mimo?</em></h2><p>Experimente como um cliente poderia montar uma solicitação de serviço com poucos passos, direto pelo site.</p><div className="booking-note"><Icon name="spark" size={23}/><div><strong>É só uma demonstração.</strong><span>Nenhuma informação é enviada, salva em servidor ou transformada em reserva.</span></div></div><div className="booking-decor"><img src="/illustrations/cat-cozy.svg" alt="Ilustração de gatinho descansando" loading="lazy" /></div></div>
          <div className="booking-panel"><div className="booking-panel-top"><span>SIMULAÇÃO DE SOLICITAÇÃO</span><span>01 — 01</span></div>
            {!summary ? <form className="booking-form" onSubmit={submitForm}><h3>Conte sobre seu pet <span>♡</span></h3><div className="form-row"><label>Seu primeiro nome<input name="tutor" type="text" autoComplete="given-name" maxLength="45" placeholder="Ex.: Ana" required value={form.tutor} onChange={updateForm}/></label><label>Nome do pet<input name="pet" type="text" maxLength="45" placeholder="Ex.: Mel" required value={form.pet} onChange={updateForm}/></label></div>
              <div className="field-group"><span className="field-label">Seu companheiro é um...</span><div className="choice-group">{['Cão', 'Gato'].map((kind) => <button type="button" className={form.kind === kind ? 'is-active' : ''} aria-pressed={form.kind === kind} onClick={() => {setForm({ ...form, kind }); setSummary(false)}} key={kind}>{kind === 'Cão' ? '🐶' : '🐱'} {kind}</button>)}</div></div>
              <div className="form-row"><label>Porte do pet<select name="size" value={form.size} onChange={updateForm}><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label><label>Cuidado desejado<select name="service" value={form.service} onChange={updateForm}>{services.map((service) => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label></div>
              <div className="field-group"><span className="field-label">Período de preferência</span><div className="choice-group">{['Manhã', 'Tarde', 'Indiferente'].map((period) => <button type="button" className={form.period === period ? 'is-active' : ''} aria-pressed={form.period === period} onClick={() => {setForm({ ...form, period }); setSummary(false)}} key={period}>{period}</button>)}</div></div>
              <button type="submit" className="button button-dark booking-submit">Gerar resumo da simulação <Icon name="arrow" size={18}/></button><p className="form-footnote">Seus dados ficam apenas nesta tela enquanto você interage.</p>
            </form> : <div className="booking-summary" ref={summaryRef} tabIndex="-1"><div className="summary-icon"><Icon name="check" size={30}/></div><h3>Olha só o mimo da {form.pet}!</h3><p>Este seria o resumo da sua solicitação:</p><dl><div><dt>Responsável</dt><dd>{form.tutor}</dd></div><div><dt>Pet</dt><dd>{form.pet} · {form.kind} · {form.size}</dd></div><div><dt>Cuidado</dt><dd>{services.find((service) => service.id === form.service)?.title}</dd></div><div><dt>Período</dt><dd>{form.period}</dd></div></dl><div className="summary-notice">Demonstração concluída: nenhum agendamento foi realizado ou enviado.</div><button type="button" onClick={() => setSummary(false)} className="button button-dark booking-submit">Editar solicitação <Icon name="arrow" size={18}/></button></div>}
          </div>
        </div></section>

      <section id="duvidas" className="faq-section section-pad"><div className="container faq-grid"><div><div className="section-kicker"><span className="tiny-square"/> DÚVIDAS FREQUENTES</div><h2>Antes do primeiro <em>au-au.</em></h2><p>Um espaço para esclarecer dúvidas e mostrar como a experiência poderia funcionar.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} className="faq-item"><summary><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="bottom-cta"><div className="container bottom-cta-inner"><div className="section-kicker">PROJETOS DEIXAM RASTROS BONITOS</div><h2>O próximo carinho<br/>começa por aqui. <span>✳</span></h2><p>Explore a experiência, teste os cuidados e descubra o que um site pode fazer por uma marca.</p><a className="button button-cream" href="#agendar">Testar agendamento <Icon name="northeast" size={19}/></a></div></section>
    </main>

    <footer className="footer"><div className="container footer-top"><Mark small/><span>Um universo de cuidado e personalidade.</span><a href="#inicio" className="back-top">Voltar ao topo ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MIMO. · Conceito fictício para portfólio.</span><span>Projeto demonstrativo · sem atendimentos reais</span></div></footer>
  </>
}

export default App
