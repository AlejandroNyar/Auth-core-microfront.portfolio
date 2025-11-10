<a href= "./README.md"> english version</a>

# Auth Core Microfrontend

Un microfrontend de autenticación modular construido con Angular 20, Firebase Authentication y Angular Material.
Este proyecto proporciona una capa de autenticación lista para usar (Inicio de sesión / Registro / Google Sign-In) que puede integrarse fácilmente en múltiples frontends o arquitecturas basadas en microfrontends.

# Características
## Autenticación con Firebase

* Inicio de sesión y registro con correo electrónico y contraseña

* Inicio de sesión con Google

* Gestión de sesión en tiempo real entre diferentes aplicaciones

## Inyección automática de JWT mediante AuthInterceptor personalizado
## Sistema de temas personalizado con Angular Material + SCSS

* Cambio sencillo entre temas de color mediante variables SCSS

* Archivos centralizados de variables y mixins para un estilo coherente

## Soporte de modo oscuro

## Internacionalización (i18n) basada en archivos JSON dinámicos

* Idiomas incluidos: Español, Inglés y Alemán

* Uso de signals para actualizaciones reactivas de traducción

## Animaciones

* Transiciones suaves entre inicio de sesión y registro

* Efecto 3D tipo “flip-card” para cambiar entre formularios

## Pestaña de ajustes rápidos

* Pestaña lateral para alternar el modo oscuro y el idioma

* Botón de acceso directo al diálogo de configuración

## Diseñado para arquitecturas de microfrontends

* Puede integrarse en otras aplicaciones Angular o no-Angular

* Comparte el estado de sesión de Firebase entre subdominios

# Estructura del proyecto
```graphql
src/
 ├─ app/
 │   ├─ components/
 │   │   ├─ auth-shell/          # Contenedor principal de autenticación
 │   │   ├─ login/               # Formulario de inicio de sesión
 │   │   ├─ register/            # Formulario de registro
 │   │   ├─ dialog-privacy/      # Diálogo de política de privacidad
 │   │   ├─ dialog-settings/     # Diálogo de configuración
 │   │   └─ quick-settings-tab/  # Pestaña lateral de ajustes rápidos
 │   ├─ services/
 │   │   ├─ translate.service.ts # Gestión de traducción e idioma
 │   │   ├─ settings.service.ts  # Gestión de temas y modo oscuro
 │   │   └─ user-session.service.ts # Datos de sesión reactivos del usuario
 │   └─ interceptors/
 │       └─ auth.interceptor.ts  # Adjunta el token JWT a las peticiones HTTP
 ├─ assets/i18n/                 # Archivos JSON de traducción (es, en, de)
 ├─ styles/
 │   ├─ _variables.scss          # Variables de color y mapas de tema
 │   ├─ _mixins.scss             # Mixins SCSS reutilizables
 │   └─ theme.scss               # Lógica principal de temas
 └─ main.ts
```

# Inicio rápido
## Instalar dependencias
```bash
npm install
```

## Configurar Firebase

Edita tu archivo de entorno (src/environments/environment.ts) y añade tu configuración de Firebase:
```ts
export const environment = {
  firebase: {
    apiKey: "YOUR_KEY",
    authDomain: "yourapp.firebaseapp.com",
    projectId: "yourapp-id",
    storageBucket: "yourapp-id.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
  },
};
```

## Ejecutar la aplicación
```bash
npm start
```

## Integración con otros microfrontends

* Cualquier otro microfrontend que necesite autenticación puede reutilizar el mismo proyecto y sesión de Firebase.

* Inicializa Firebase con la misma configuración.

* Usa UserSessionService o onAuthStateChanged() de Firebase para acceder al usuario actual.

* La sesión se comparte automáticamente entre subdominios.

* Para peticiones seguras al backend, usa el AuthInterceptor incluido para adjuntar el token JWT a cada solicitud HTTP.

# Tecnologías utilizadas
| <span style="font-weight:700">Categoría</span>  |	<span style="font-weight:700">Tecnología</span>|
|:-----------------:|:------------------------------------------------:|	
|  Framework        |	Angular 20 (componentes standalone + signals)  |
|     UI            |	Angular Material                               |
|  Autenticación    | 	Firebase Authentication                        |
| Gestión de estado |	Signals (sin NgRx)                             |
|     Idiomas       |	i18n con carga dinámica de archivos JSON       |
|     Estilos       | 	SCSS con variables de tema y mixins            |


# Mejoras futuras

- [ ] Añadir soporte para autenticación con GitHub y Microsoft

- [ ] Integrar edición de perfil de usuario

- [ ] Guardar las preferencias de idioma/tema en los metadatos del usuario de Firebase

- [ ] Integración opcional con un backend Node.js para extender la información del usuario

# Autor
## Alejandro P. B.

Frontend Developer | Arquitectura de Microfrontends | Especialista en Angular

## Contacto:

 * Email: alejandropb@gmail.com
 * linked-in: https://www.linkedin.com/in/alejandro-nyar/
 * github: https://github.com/AlejandroNyar
