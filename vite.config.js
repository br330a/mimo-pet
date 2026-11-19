import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function publicSeoPlugin() {
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/+$/, '')
  let url
  try {
    if (siteUrl) {
      url = new URL(siteUrl)
      if (url.protocol !== 'https:' || !url.hostname || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
        throw new Error('SITE_URL precisa ser a raiz HTTPS do site, sem caminho ou parâmetros.')
      }
    }
  } catch (error) {
    throw new Error(`SITE_URL inválida: ${error.message}`, { cause: error })
  }
  const publicUrl = url?.origin ?? null
  const escapeAttr = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
  return {
    name: 'mimo-public-seo',
    transformIndexHtml(html) {
      if (!publicUrl) return html.replace('<!-- SEO_PUBLIC_URL -->', '<!-- Configure SITE_URL na compilação do deploy para gerar sitemap, canonical e imagem social absoluta. -->')
      return html.replace('<!-- SEO_PUBLIC_URL -->', `
    <link rel="canonical" href="${escapeAttr(publicUrl)}/" />
    <meta property="og:url" content="${escapeAttr(publicUrl)}/" />
    <meta property="og:image" content="${escapeAttr(publicUrl)}/social-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="MIMO. Pet Care & Shop — projeto demonstrativo" />
    <meta name="twitter:image" content="${escapeAttr(publicUrl)}/social-preview.png" />`)
    },
    generateBundle() {
      const robots = publicUrl
        ? `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`
        : 'User-agent: *\nAllow: /\n'
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (publicUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${publicUrl}/</loc></url>\n</urlset>\n` })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), publicSeoPlugin()],
})
