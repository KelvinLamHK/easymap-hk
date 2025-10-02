import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'
import appLogo from './assets/iTunesArtwork@3x.png'

// Ensure favicon uses the provided PNG logo
const existingFavicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
const faviconLink = existingFavicon ?? document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/png'
faviconLink.href = appLogo
if (!existingFavicon) {
  document.head.appendChild(faviconLink)
}

// Derive brand color palette from logo at runtime (simple average approach)
function extractAverageColorFromImage(src: string): Promise<{ r: number; g: number; b: number }> {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) {
        resolve({ r: 14, g: 165, b: 233 })
        return
      }
      const width = (canvas.width = 64)
      const height = (canvas.height = 64)
      context.drawImage(image, 0, 0, width, height)
      const { data } = context.getImageData(0, 0, width, height)
      let rTotal = 0, gTotal = 0, bTotal = 0, count = 0
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]
        if (alpha < 200) continue
        rTotal += data[i]
        gTotal += data[i + 1]
        bTotal += data[i + 2]
        count++
      }
      if (count === 0) {
        resolve({ r: 14, g: 165, b: 233 })
      } else {
        resolve({ r: Math.round(rTotal / count), g: Math.round(gTotal / count), b: Math.round(bTotal / count) })
      }
    }
    image.onerror = () => resolve({ r: 14, g: 165, b: 233 })
    image.src = src
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function createShades({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (v: number) => v.toString(16).padStart(2, '0')
  const hex = (rr: number, gg: number, bb: number) => `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`
  const lighten = (pct: number) => hex(
    clamp(Math.round(r + (255 - r) * pct), 0, 255),
    clamp(Math.round(g + (255 - g) * pct), 0, 255),
    clamp(Math.round(b + (255 - b) * pct), 0, 255)
  )
  const darken = (pct: number) => hex(
    clamp(Math.round(r * (1 - pct)), 0, 255),
    clamp(Math.round(g * (1 - pct)), 0, 255),
    clamp(Math.round(b * (1 - pct)), 0, 255)
  )
  return {
    50: lighten(0.9),
    100: lighten(0.8),
    200: lighten(0.6),
    300: lighten(0.4),
    400: lighten(0.2),
    500: hex(r, g, b),
    600: darken(0.15),
    700: darken(0.3),
    800: darken(0.45),
    900: darken(0.6),
    950: darken(0.75),
  }
}

extractAverageColorFromImage(appLogo).then((rgb) => {
  const shades = createShades(rgb)
  const root = document.documentElement
  Object.entries(shades).forEach(([k, v]) => root.style.setProperty(`--brand-${k}`, v))
  // Update theme-color meta to match primary
  const themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
  if (themeColorMeta) themeColorMeta.content = shades["500"] as string
}).catch(() => {
  // no-op, keep fallback
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Pointer gradient spotlight for hover glow in cards
document.addEventListener('pointermove', (event) => {
  const target = event.target as HTMLElement | null
  if (!target) return
  const host = target.closest('[class*="surface-card"]') as HTMLElement | null
  if (!host) return
  const rect = host.getBoundingClientRect()
  const mx = ((event.clientX - rect.left) / rect.width) * 100
  const my = ((event.clientY - rect.top) / rect.height) * 100
  host.style.setProperty('--mx', `${mx}%`)
  host.style.setProperty('--my', `${my}%`)
})
