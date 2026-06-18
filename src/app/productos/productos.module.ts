import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { ProductosRoutingModule } from './productos-routing.module'
import { ProductosComponent } from './productos/productos.component'
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component'

// Nuevo módulo de funcionalidad (feature) para el catálogo de productos.
// Declara sus dos componentes y enlaza su propio submódulo de ruteo.
@NgModule({
  imports: [NativeScriptCommonModule, ProductosRoutingModule],
  declarations: [ProductosComponent, ProductoDetalleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductosModule {}
