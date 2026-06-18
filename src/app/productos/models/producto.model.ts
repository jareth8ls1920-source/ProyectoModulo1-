// Modelo de datos que representa un Producto del catálogo.
export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  // Glifo de Font Awesome usado como ícono representativo del producto.
  icono: string
  disponible: boolean
}
