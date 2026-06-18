import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ProductosComponent } from './productos/productos.component'
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component'

// Submódulo de ruteo específico del módulo Productos.
// Se registra con forChild porque es un módulo de funcionalidad cargado
// de forma diferida (lazy loading) desde el enrutador raíz.
const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: ':id', component: ProductoDetalleComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ProductosRoutingModule {}
