# ProyectoModulo1 — NativeScript + Angular (Side Drawer)

Aplicación móvil construida con **NativeScript + Angular** a partir del template oficial
[`template-drawer-navigation-ng`](https://github.com/NativeScript/nativescript-app-templates/tree/main/packages/template-drawer-navigation-ng)
(navegación lateral / *side drawer*).

Sobre la base del template se incorporó un **nuevo módulo de funcionalidad: `Productos`**,
con su propio submódulo de ruteo, dos componentes, un servicio global inyectable, una vista
con `*ngFor`, estilos personalizados por sistema operativo y un ícono propio en `App_Resources`.

---

## ▶️ Cómo ejecutar

```bash
npm install
ns run android   # o:  ns run ios
```

> Requiere el [entorno de NativeScript](https://docs.nativescript.org/setup/) configurado
> (`npm i -g nativescript`). Para regenerar los íconos del launcher:
> `ns resources generate icons App_Resources/Android/src/main/res/drawable-nodpi/logo_productos.png`.

---

## ✅ Cumplimiento de requisitos

| # | Requisito | Dónde se cumple |
|---|-----------|-----------------|
| 1 | Proyecto basado en el template `template-drawer-navigation-ng` con enrutador modularizado en *features* | `src/app/app-routing.module.ts` (rutas con `loadChildren`) + `src/app/app.component.html` (RadSideDrawer) |
| 2 | Al menos 2 componentes nuevos | `ProductosComponent` y `ProductoDetalleComponent` en `src/app/productos/` |
| 3 | Un nuevo módulo de funcionalidad | `src/app/productos/productos.module.ts` (`ProductosModule`) |
| 4 | Submódulo de ruteo específico del nuevo módulo | `src/app/productos/productos-routing.module.ts` (`forChild`) |
| 5 | Navegación integrada al side drawer preexistente | Ítem **Productos** en `src/app/app.component.html` |
| 6 | Nuevo service de Angular usado por inyección de dependencias global | `src/app/productos/services/producto.service.ts` (`@Injectable({ providedIn: 'root' })`) |
| 7 | Al menos una vista con `*ngFor` | `src/app/productos/productos/productos.component.html` (lista de productos) |
| 8 | Archivo de estilos con sobrecarga de nombres Android/iOS | `productos.component.android.css` / `productos.component.ios.css` y `src/app.android.scss` / `src/app.ios.scss` |
| 9 | Ícono personalizado en `App_Resources` (recursos de imágenes) | `App_Resources/Android/.../drawable-nodpi/logo_productos.png` y `App_Resources/iOS/Assets.xcassets/logo_productos.imageset/` |
| 10 | Código que asigna valor a una variable solo en Android | `src/app/productos/productos/productos.component.ts` → `if (isAndroid) { this.plataforma = 'Android' }` |

---

## 🧭 Estructura del nuevo módulo

```
src/app/productos/
├── productos.module.ts              # (3) nuevo módulo de feature
├── productos-routing.module.ts      # (4) submódulo de ruteo (forChild)
├── models/
│   └── producto.model.ts            # interfaz Producto
├── services/
│   └── producto.service.ts          # (6) servicio global providedIn:'root'
├── productos/                       # (2) componente 1: listado
│   ├── productos.component.ts       # (10) asignación solo-Android + (7) datos para *ngFor
│   ├── productos.component.html     # (7) *ngFor sobre productos
│   ├── productos.component.android.css  # (8) estilos Android
│   └── productos.component.ios.css      # (8) estilos iOS
└── producto-detalle/                # (2) componente 2: detalle
    ├── producto-detalle.component.ts
    └── producto-detalle.component.html
```

## 🎨 Sobrecarga de estilos por plataforma

NativeScript selecciona automáticamente el archivo según el sufijo de plataforma:

- `*.android.css` → solo Android (paleta verde Material).
- `*.ios.css` → solo iOS (paleta azul del sistema).

Esto se aplica tanto a nivel de componente (`productos.component.{android,ios}.css`)
como a nivel global de la app (`app.android.scss` / `app.ios.scss`).

## 🖼️ Ícono personalizado

El logo `logo_productos` (anillo blanco con disco azul sobre fondo verde) fue generado por
código (`tools/generar-icono.js`) y se ubica en los recursos de imágenes de cada plataforma.
Se usa en la cabecera del side drawer mediante `src="res://logo_productos"`.
