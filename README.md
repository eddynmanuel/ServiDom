# ServiDom - Plataforma de Servicios a Domicilio

**ServiDom** es una plataforma web innovadora diseñada para conectar a profesionales de oficios (como electricistas, carpinteros, plomeros, limpieza, entre otros) con clientes que requieren servicios a domicilio. La aplicación ofrece una experiencia de usuario moderna, rápida y muy intuitiva.

## 🚀 Tecnologías (Tech Stack)

Este proyecto está construido con un stack tecnológico enfocado en la velocidad y el rendimiento en el Frontend:

- **HTML5:** Para la estructura semántica de todas las páginas de la plataforma.
- **CSS3 Puro (Vanilla CSS):** Estilos modernos, responsivos y con soporte para *Modo Oscuro/Claro* sin dependencias de frameworks externos pesados. Uso de variables CSS para el sistema de diseño.
- **JavaScript Puro (Vanilla JS):** Lógica de interacción en el lado del cliente, manipulación del DOM y control de estado (como el tema de color) sin necesidad de librerías extra.
- **Despliegue:** Vercel (Configurado a través de `vercel.json` para rutas limpias).

## 📁 Estructura del Proyecto (Patrón MVC Frontend)

El proyecto está organizado utilizando una aproximación al patrón **Modelo-Vista-Controlador (MVC)**, optimizado para un entorno Frontend. Esto garantiza que el código sea limpio, escalable y muy fácil de mantener.

```text
ServiDom/
├── Modelo/
│   # (Carpeta preparada para la futura integración con Bases de Datos o APIs backend)
│
├── Vista/
│   # Contiene la Interfaz de Usuario (UI). Aquí conviven estrechamente los archivos:
│   # - .html (Estructura de cada página)
│   # - .css  (Estilos específicos de cada página)
│   # Ej: catalogo.html y catalogo.css
│
├── Controlador/
│   # Contiene la Lógica de Negocio y de Interfaz.
│   # - .js (Scripts que le dan vida a las vistas: eventos, modales, modo oscuro, etc.)
│
├── img/
│   # Todos los recursos gráficos (imágenes, fotos de perfiles, banners, etc.)
│
├── index.html   # Punto de entrada principal (Redirige al catálogo)
└── vercel.json  # Configuración de rutas amigables para el servidor
```

## 🛠️ ¿Cómo funciona?

1. **Vistas Independientes:** Cada pantalla principal de la aplicación (Login, Registro, Catálogo, Perfil, etc.) tiene su propia dupla de archivos `.html` y `.css` en la carpeta `Vista/`. 
2. **Controladores:** La carpeta `Controlador/` inyecta la interactividad a cada vista. Por ejemplo, `catalogo.js` maneja los filtros y búsquedas del catálogo, mientras que `tema-global.js` persiste tu preferencia de *Modo Oscuro/Claro* utilizando `localStorage` en toda la aplicación.
3. **Despliegue de Vercel:** Gracias al archivo `vercel.json`, los usuarios pueden acceder a rutas limpias (ej. `servi-dom.vercel.app/catalogo`) en lugar de ver la extensión `.html` completa en el navegador.

## 🔗 Demo en Vivo

Puedes explorar y probar la plataforma funcionando en vivo en el siguiente enlace:

**👉 [https://servi-dom.vercel.app/](https://servi-dom.vercel.app/)**