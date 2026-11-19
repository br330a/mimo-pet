import { readFile, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'

const baseline = JSON.parse(await readFile(new URL('./legacy-sha256.json', import.meta.url)))
const root = new URL('../', import.meta.url)
for (const [relative, expectedHash] of Object.entries(baseline)) {
  const file = new URL(relative, root)
  try {
    const original = await readFile(file)
    const currentHash = createHash('sha256').update(original).digest('hex')
    if (expectedHash !== currentHash) {
      console.log(`Preservado (arquivo modificado): ${relative}`)
      continue
    }
    await rm(file)
    console.log(`Removido (legado, não usado): ${relative}`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}
console.log('Limpeza segura concluída. Não altera branches, commits ou arquivos modificados.')
