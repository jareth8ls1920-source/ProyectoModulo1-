import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

import { Producto } from '../models/producto.model'
import { ProductoService } from '../services/producto.service'

@Component({
  selector: 'ProductoDetalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['../productos/productos.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | undefined

  // Se inyecta el mismo servicio global y la ruta activa para leer el :id.
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    // Lee el parámetro de ruta ':id' definido en el submódulo de ruteo.
    const id = +this.route.snapshot.params['id']
    this.producto = this.productoService.getProductoPorId(id)
  }

  // Regresa al listado de productos.
  onBackTap(): void {
    this.routerExtensions.back()
  }
}
