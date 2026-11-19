import { readFile, mkdir, writeFile, stat, rename, rm } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

const photos = JSON.parse(await readFile(new URL('./photo-sources.json', import.meta.url), 'utf8'))
const target = new URL('../public/images/pets/', import.meta.url)
await mkdir(target, { recursive: true })

let completed = 0
for (const photo of photos) {
  const destination = new URL(photo.name, target)
  try {
    const file = await stat(destination)
    if (file.size > 1500) {
      console.log(`✓ Já existe: ${photo.name}`)
      completed += 1
      continue
    }
  } catch { /* primeira sincronização */ }
  console.log(`↓ Baixando ${photo.name}...`)
  const response = await fetch(photo.downloadUrl, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'MIMO-PetCare-Portfolio/1.0' } })
  if (!response.ok) throw new Error(`Falha ao baixar ${photo.name}: HTTP ${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  // A URL solicita WebP; confirmar o formato evita gravar HTML de erro como imagem.
  const isWebp = bytes.length > 1500 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
  if (!isWebp) throw new Error(`Formato inesperado em ${photo.name}: ${response.headers.get('content-type')}`)
  const temporary = new URL(`${photo.name}.tmp`, target)
  try { await writeFile(temporary, bytes); await rename(temporary, destination) }
  finally { await rm(temporary, { force: true }) }
  console.log(`✓ ${photo.name}: ${(bytes.length / 1024).toFixed(0)} KiB`)
  completed += 1
}
console.log(`Fotos prontas: ${completed}/${photos.length}. Arquivos locais em public/images/pets/.`)
