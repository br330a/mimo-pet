// Lógica pura e testável de agenda fictícia. Nenhum horário representa disponibilidade real.
export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function createAvailableDays(today = new Date()) {
  const days = []
  for (let offset = 1; offset <= 15 && days.length < 8; offset += 1) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    if (day.getDay() !== 0) {
      days.push({
        id: dateKey(day),
        weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(day).replace('.', ''),
        day: new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(day),
        month: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(day).replace('.', ''),
      })
    }
  }
  return days
}

export const slotHours = ['09:00', '10:30', '11:30', '13:30', '15:00', '16:30']
export const slotsForDay = (id) => slotHours.map((time, index) => ({
  time,
  available: ((Number(id.slice(-2)) + index * 3) % 5) !== 0,
}))

export function validateBooking(form, days, services) {
  if (!form.tutor?.trim() || !form.pet?.trim()) {
    return { ok: false, reason: 'Informe seu nome e o nome do pet para continuar.' }
  }
  if (!days.some((day) => day.id === form.date)) {
    return { ok: false, reason: 'Escolha uma das datas disponíveis nesta demonstração.' }
  }
  const care = services.find((service) => service.id === form.service)
  if (!care?.species.includes(form.kind)) {
    return { ok: false, reason: 'Selecione um cuidado compatível com o seu pet.' }
  }
  if (!slotsForDay(form.date).some((slot) => slot.time === form.time && slot.available)) {
    return { ok: false, reason: 'Selecione um dos horários apresentados como disponíveis.' }
  }
  return { ok: true, reason: '' }
}
