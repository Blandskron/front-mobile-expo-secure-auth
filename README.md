# React Native For Android

Una aplicación móvil profesional, segura y elegante construida sobre **React Native** y **Expo 51**. Este proyecto implementa una arquitectura limpia, componentes de interfaz premium reutilizables con soporte nativo para **Modo Claro y Oscuro**, gestión de estado reactivo global, y un flujo seguro y protegido de autenticación de usuario.

---

## 🚀 Características Principales

### 🎨 Diseño de Interfaz de Alta Fidelidad (UI/UX)
- **Componentes Personalizados**: Entrada de texto ([CustomInput](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/app-android/components/ui/CustomInput.tsx)) y botones interactivos ([CustomButton](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/app-android/components/ui/CustomButton.tsx)) construidos desde cero.
- **Micro-interacciones**: Animaciones dinámicas de enfoque de bordes y efectos físicos elásticos (`spring`) al presionar elementos.
- **Transiciones Fluidas**: Animaciones nativas de entrada (`fade-in` y desplazamiento elástico `slide-up`) usando la API `Animated` al montar las pantallas de Login y Dashboard.
- **Soporte de Temas**: Integración nativa con el esquema de colores del sistema operativo (Modo Claro/Modo Oscuro) en todas las pantallas.
- **Diseño Responsivo**: Optimización de formularios utilizando `KeyboardAvoidingView` y `ScrollView` para prevenir superposición del teclado en cualquier pantalla.

### 🔒 Autenticación y Seguridad Avanzada
- **Gestión de Estado Reactivo**: Uso de un [AuthContext](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/app-android/context/AuthContext.tsx) global para centralizar y difundir reactivamente el estado de la sesión (`userToken`, `isLoading`, `login`, `logout`).
- **Rutas Protegidas**: Renderizado condicional en [App.tsx](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/app-android/app/App.tsx) basado en el contexto de autenticación; si el usuario no tiene token, la pantalla de Home está excluida del navegador, haciendo físicamente imposible el acceso no autorizado.
- **Persistencia de Sesión**: Integración con `expo-secure-store` para guardar los tokens de sesión de manera cifrada a nivel de hardware (Keychain/Keystore).
- **Inicio de Sesión Automático (Auto-Login)**: Comprobación automática del token guardado al iniciar la app para redirigir directamente al Dashboard.
- **Visibilidad de Contraseña**: Opción de ocultar y mostrar la clave interactivamente con iconos vectoriales.

### 🌐 Conectividad e Integración Corporativa
- **Variables de Entorno**: Soporte prioritario para `process.env.EXPO_PUBLIC_API_URL` en [Config.ts](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/app-android/constants/Config.ts) para la configuración limpia del backend en entornos de producción y pruebas.
- **Resolución Automática de IP**: Detección automática para redirigir peticiones en emuladores Android (`10.0.2.2:8000`) o iOS/Web (`localhost:8000`) si no se definen variables de entorno.

---

## 📁 Estructura del Proyecto

El código fuente de la aplicación se organiza dentro de la carpeta `app-android`:

```text
app-android/
├── app/                  # Registros de entrada y controladores principales
│   ├── App.tsx           # Configuración del Stack Navigator y lógica de Auto-Login
│   └── index.js          # Punto de entrada de la aplicación Expo
├── context/              # Contextos globales de React (gestión de sesión global)
│   └── AuthContext.tsx   # Proveedor de estado reactivo y persistencia segura
├── components/           # Componentes funcionales y vistas
│   ├── Home/             # Pantalla de Dashboard principal
│   ├── Login/            # Pantalla de Inicio de Sesión
│   ├── ui/               # Componentes atómicos reutilizables (Inputs, Buttons)
│   └── __tests__/        # Pruebas unitarias de Jest
├── constants/            # Variables globales, constantes de color y configuración de API
├── hooks/                # Custom React Hooks (manejo de temas)
├── assets/               # Recursos de imagen, iconos y fuentes
└── package.json          # Script de compilación y dependencias
```

---

## 🛠️ Requisitos de Instalación

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y el SDK de [Expo Go](https://expo.dev/go) en tu teléfono o un emulador de Android/iOS listo.

### 1. Clonar el repositorio e ingresar a la carpeta del proyecto:
```bash
cd app-android
```

### 2. Instalar las dependencias de NPM:
```bash
npm install
```

### 3. Levantar el servidor de desarrollo de Metro:
```bash
npm run start
```

---

## 🧪 Pruebas y Calidad de Código

### Ejecutar Pruebas Unitarias
```bash
npx jest
```

### Ejecutar Verificación de Linter
```bash
npm run lint
```

---

## 📄 Licencia

Este proyecto está distribuido bajo la **Licencia MIT**. Consulta el archivo [LICENSE](file:///c:/Users/BlandskronNotebook/Documents/updatesGitHubs/ReactNativeForAndroid/LICENSE) para obtener más información.
