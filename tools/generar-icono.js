/*
 * Generador del ícono personalizado "logo_productos".
 * Crea un PNG 192x192 con un diseño propio (no copiado de terceros):
 * fondo verde, anillo blanco y disco azul central.
 *
 * Uso:  node tools/generar-icono.js
 * Escribe el PNG en las rutas de imágenes de App_Resources (Android e iOS).
 */
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

const SIZE = 192

function rgba(r, g, b, a) {
  return [r, g, b, a]
}

// Construye el buffer de píxeles RGBA del diseño del logo.
function buildPixels() {
  const cx = SIZE / 2
  const cy = SIZE / 2
  const rows = []
  for (let y = 0; y < SIZE; y++) {
    const row = [0] // filter byte (0 = none) por cada fila del PNG
    for (let x = 0; x < SIZE; x++) {
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      let color
      if (d < 42) {
        color = rgba(0, 122, 255, 255) // disco azul (iOS blue)
      } else if (d < 70) {
        color = rgba(255, 255, 255, 255) // anillo blanco
      } else {
        color = rgba(61, 220, 132, 255) // fondo verde (Android green)
      }
      row.push(color[0], color[1], color[2], color[3])
    }
    rows.push(Buffer.from(row))
  }
  return Buffer.concat(rows)
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

// Tabla CRC32 estándar de PNG.
const CRC_TABLE = (() => {
  const t = []
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function buildPng() {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(SIZE, 0)
  ihdr.writeUInt32BE(SIZE, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace
  const idat = zlib.deflateSync(buildPixels())
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const png = buildPng()
const targets = [
  path.join(
    __dirname,
    '..',
    'App_Resources',
    'Android',
    'src',
    'main',
    'res',
    'drawable-nodpi',
    'logo_productos.png'
  ),
  path.join(
    __dirname,
    '..',
    'App_Resources',
    'iOS',
    'Assets.xcassets',
    'logo_productos.imageset',
    'logo_productos.png'
  ),
]

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, png)
  console.log('Escrito:', target)
}
