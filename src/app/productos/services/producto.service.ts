import { Injectable } from '@angular/core'
import { Producto } from '../models/producto.model'

/**
 * Servicio de Angular registrado a nivel global mediante `providedIn: 'root'`.
 *
 * Al estar provisto en la raíz, Angular crea una única instancia (singleton)
 * disponible para toda la aplicación a través de inyección de dependencias.
 * Cualquier componente puede recibirlo en su constructor sin necesidad de
 * declararlo en los `providers` de un módulo concreto.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  // Fuente de datos en memoria que simula la información de un backend.
  // Los íconos usan glifos de Font Awesome (clase .fas) mediante su código Unicode.
  private readonly productos: Producto[] = [
    {
      id: 1,
      nombre: 'Teclado Mecánico',
      descripcion: 'Teclado mecánico retroiluminado con switches azules.',
      precio: 49.99,
      icono: '', // keyboard
      disponible: true,
    },
    {
      id: 2,
      nombre: 'Mouse Inalámbrico',
      descripcion: 'Mouse ergonómico inalámbrico de 1600 DPI.',
      precio: 19.99,
      icono: '', // mouse
      disponible: true,
    },
    {
      id: 3,
      nombre: 'Auriculares',
      descripcion: 'Auriculares con cancelación de ruido y micrófono.',
      precio: 79.5,
      icono: '', // headphones
      disponible: false,
    },
    {
      id: 4,
      nombre: 'Cámara Web HD',
      descripcion: 'Cámara web 1080p ideal para videollamadas.',
      precio: 34.0,
      icono: '', // camera
      disponible: true,
    },
    {
      id: 5,
      nombre: 'Disco SSD 1TB',
      descripcion: 'Unidad de estado sólido de alta velocidad.',
      precio: 89.99,
      icono: '', // hdd
      disponible: true,
    },
  ]

  // Devuelve la lista completa de productos.
  getProductos(): Producto[] {
    return this.productos
  }

  // Devuelve un producto por su identificador (o undefined si no existe).
  getProductoPorId(id: number): Producto | undefined {
    return this.productos.find((producto) => producto.id === id)
  }

  // Cantidad de productos disponibles en el catálogo.
  getCantidadDisponibles(): number {
    return this.productos.filter((producto) => producto.disponible).length
  }
}
