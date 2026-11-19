import test from 'node:test'
import assert from 'node:assert/strict'
import { createAvailableDays, dateKey, slotsForDay, validateBooking } from '../src/utils/booking.js'

const days = createAvailableDays(new Date(2026, 10, 19))
const services = [
  { id: 'banho', species: ['Cão', 'Gato'] },
  { id: 'tosa', species: ['Cão'] },
]
const firstDay = days[0].id
const freeTime = slotsForDay(firstDay).find((slot) => slot.available).time
const valid = { tutor: 'Ana', pet: 'Mel', kind: 'Cão', service: 'banho', date: firstDay, time: freeTime }

test('datas usam calendário local, ignorando domingos', () => {
  assert.equal(dateKey(new Date(2026, 10, 19)), '2026-11-19')
  assert.equal(days.length, 8)
  assert.ok(days.every((day) => new Date(`${day.id}T12:00:00`).getDay() !== 0))
})
test('horários desabilitados não podem ser agendados', () => {
  const blocked = slotsForDay(firstDay).find((slot) => !slot.available)
  assert.ok(blocked)
  assert.equal(validateBooking({ ...valid, time: blocked.time }, days, services).ok, false)
})
test('nome vazio ou contendo só espaços é rejeitado', () => {
  assert.equal(validateBooking({ ...valid, tutor: '   ' }, days, services).ok, false)
  assert.equal(validateBooking({ ...valid, pet: '\t' }, days, services).ok, false)
})
test('agendamento impede serviço incompatível, data inventada ou hora desconhecida', () => {
  assert.equal(validateBooking(valid, days, services).ok, true)
  assert.equal(validateBooking({ ...valid, kind: 'Gato', service: 'tosa' }, days, services).ok, false)
  assert.equal(validateBooking({ ...valid, date: '2030-01-01' }, days, services).ok, false)
  assert.equal(validateBooking({ ...valid, time: '03:00' }, days, services).ok, false)
})
