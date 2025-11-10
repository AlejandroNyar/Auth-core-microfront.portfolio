# Auth Core Microfrontend

A modular authentication microfrontend built with Angular 20, Firebase Authentication, and Angular Material.
This project provides a ready-to-use authentication layer (Login / Register / Google Sign-In) that can be easily integrated into multiple frontends or microfront-based architectures.

# Features

## Authentication with Firebase

* Email & password login / registration

* Google Sign-In support

* Real-time session management across apps

## JWT auto-injection via custom AuthInterceptor

## Angular Material + SCSS custom theme system

* Easily switch between color themes using SCSS variables

* Centralized color & mixin files for consistent styling

## Dark mode support

## Internationalization (i18n) with dynamic JSON-based translation system

* Languages included: Spanish, English, and German

* Uses signals for reactive translation updates

## Animations

* Smooth transitions between login and registration

* 3D flip-card effect for form switching

## Quick Settings Tab

* Side tab for toggling dark mode and language

* Shortcut to open full settings dialog

## Designed for microfront architecture

* Can be embedded into other Angular or non-Angular apps

* Shares Firebase session state across subdomains

# Project Structure
```graphql
src/
 ├─ app/
 │   ├─ components/
 │   │   ├─ auth-shell/          # Main authentication container
 │   │   ├─ login/               # Login form
 │   │   ├─ register/            # Register form
 │   │   ├─ dialog-privacy/      # Privacy policy modal
 │   │   ├─ dialog-settings/     # Settings modal
 │   │   └─ quick-settings-tab/  # Side panel for quick settings
 │   ├─ services/
 │   │   ├─ translate.service.ts # Translation & language management
 │   │   ├─ settings.service.ts  # Theme and dark mode management
 │   │   └─ user-session.service.ts # Reactive user session data
 │   └─ interceptors/
 │       └─ auth.interceptor.ts  # Attaches JWT token to outgoing requests
 ├─ assets/i18n/                 # Translation JSON files (es, en, de)
 ├─ styles/
 │   ├─ _variables.scss          # Color variables and theme maps
 │   ├─ _mixins.scss             # Common reusable SCSS mixins
 │   └─ theme.scss               # Main theme logic
 └─ main.ts
```

# Quick Start
## Install dependencies
```bash
npm install
```
## Configure Firebase

Edit your environment file (src/environments/environment.ts) and add your Firebase configuration:
* enviroment.ts
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

## Run the application
```bash
npm start
```

## Integrating with Other Microfrontends

* Any other microfrontend that needs authentication can reuse the same Firebase project and session:

* Initialize Firebase with the same config.

* Use the UserSessionService or Firebase’s onAuthStateChanged() to access the current user.

* The session is automatically shared between subdomains.

* For secure backend requests, use the provided AuthInterceptor to attach the user’s Firebase JWT token to all HTTP requests.

# Technologies Used

|     <b>Category </b>    |	                 <b>Technology</b>                     |
|:----------------:|:------------------------------------------------:|
|     Framework    |   Angular 20 (standalone components + signals)   | 
|        UI        |                 Angular Material                 |
|       Auth       |              Firebase Authentication             |
| State management |             Signals (no NgRx required)           |
|     Language     |           i18n with dynamic JSON loading         |
|      Styling     |       SCSS with theme variables and mixins       |


# Future Improvements

- [ ] Add support for GitHub and Microsoft authentication

- [ ] Integrate user profile editing

- [ ] Store theme/language preferences in Firebase user metadata

- [ ] Optional integration with a Node.js backend for extended user data

# Author

## Alejandro P. B.
Frontend Developer | Microfrontend Architecture | Angular Specialist
📧 alejandropb@gmail.com
