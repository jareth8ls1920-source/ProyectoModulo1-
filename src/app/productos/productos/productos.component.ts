import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

import { Producto } from '../models/producto.model'
import { ProductoService } from '../services/producto.service'

@Component({
  selector: 'Productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  // Lista que alimenta el *ngFor de la vista.
  productos: Producto[] = []

  // Cantidad de productos disponibles, calculada por el servicio.
  disponibles = 0

  // Etiqueta del sistema operativo. Por defecto asumimos iOS y solo se
  // reasigna a 'Android' cuando la app corre en Android (ver ngOnInit).
  plataforma = 'iOS'

  // El servicio se obtiene por INYECCIÓN DE DEPENDENCIAS (singleton global).
  constructor(
    private productoService: ProductoService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.getProductos()
    this.disponibles = this.productoService.getCantidadDisponibles()

    // Requisito: asignar un valor a una variable únicamente cuando se
    // está ejecutando en Android.
    if (isAndroid) {
      this.plataforma = 'Android'
    }
  }

  // Navega al submódulo de detalle pasando el id del producto seleccionado.
  onProductoTap(producto: Producto): void {
    this.routerExtensions.navigate(['/productos', producto.id])
  }

  // Abre el side drawer preexistente desde el botón del ActionBar.
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
