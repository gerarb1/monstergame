# 🗺️ Monster Game (Expo + TypeScript)

Prototipo de juego móvil 2D ligero desarrollado con **React Native**, **Expo** y **TypeScript**.

Diseñado bajo una filosofía minimalista: sin motores de física pesados, sin generación procedural ni assets complejos. Toda la lógica se gestiona con hooks nativos de React (`useState`, `useMemo`), componentes táctiles estilizados y sprites basados en emojis.

---

## 🎮 Características y Mecánicas

- **Mapa estático en cuadrícula (10x10)**: Definido mediante una matriz numérica 2D (`0 = pasto`, `1 = árboles/paredes`, `2 = agua`), renderizado mediante un doble `.map()` sobre componentes `<View>` coloreados.
- **Movimiento con D-Pad**: Cruceta direccional táctil con 4 botones (▲, ◀, ▶, ▼) que desplaza al jugador casilla por casilla, validando límites del mapa y bloqueando el paso a través de obstáculos o agua.
- **6 Monstruos en posiciones fijas**: Criaturas representadas por emojis (`👾`, `👻`, `🦇`, `🦊`, `🐲`, `🦄`) distribuidas en celdas transitables.
- **Detección por adyacencia y captura**: Al colocarse en una casilla inmediatamente contigua a un monstruo (distancia Manhattan = 1), aparece el botón interactivo **"🎯 ¡Atrapar a [Nombre]!"**. La captura tiene éxito garantizado y el monstruo desaparece del mapa.
- **HUD e Inventario en tiempo real**: Contador fijo en la parte superior (`Atrapados: X / 6`) y una bandeja horizontal de colección que lista los monstruos capturados.
- **Condición de victoria y reinicio**: Al atrapar a todas las criaturas se activa un modal de felicitaciones con el botón **"🔄 Reiniciar Juego"** para volver a jugar inmediatamente.
- **Soporte Safe Area universal**: Integración completa con `react-native-safe-area-context` para respetar notches, barras de estado y barras gestuales inferiores.

---

## 🚀 Requisitos Previos

1. **Node.js** (versión 18 o superior recomendada).
2. Para probar en dispositivo móvil:
   - **Android**: Instalar [Expo Go desde Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
   - **iOS**: Instalar [Expo Go desde la App Store](https://apps.apple.com/app/expo-go/id982107779).

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/gerarb1/monstergame.git
   cd monstergame
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## 🕹️ Cómo Probar la Demo

### Opción 1: En tu celular con Expo Go (Recomendado)

Inicia el servidor de desarrollo en modo túnel (evita problemas de firewall o redes distintas):

```bash
npx expo start --tunnel
```

#### Cómo escanear:
* **En Android**: Abre la app **Expo Go** en tu celular, pulsa el botón **"Scan QR code"** y apunta a la terminal.
* **En iPhone**: Abre la app nativa de **Cámara**, apunta al código QR y pulsa en la notificación amarilla emergente **"Abrir en Expo Go"**.

> 💡 **Nota si tienes adaptadores virtuales o VPNs en Windows (Radmin VPN, VirtualBox, etc.)**:  
> Si prefieres usar la red local (LAN) en vez del túnel, define tu IP local antes de arrancar:
> ```powershell
> # En PowerShell:
> $env:REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.5"
> npm start
> ```
> O escribe manualmente la dirección en Expo Go usando **"Enter URL manually"** (ej. `exp://192.168.1.5:8081`).

---

### Opción 2: En el Navegador Web (PC)

Puedes ejecutar el juego directamente en tu navegador web de escritorio:

```bash
npm run web
```
O si ya tienes `npm start` en ejecución, presiona la tecla **`w`** en la terminal.

---

## 📁 Estructura del Proyecto

```text
├── App.tsx                  # Componente principal y ciclo de vida del juego
├── types.ts                 # Definición de interfaces TypeScript mínimas
├── constants/
│   └── gameData.ts          # Mapa 10x10, posiciones iniciales y monstruos
├── components/
│   ├── GridMap.tsx          # Renderizado de la cuadrícula, jugador y sprites
│   ├── Dpad.tsx             # Cruceta direccional táctil (4 botones)
│   ├── CatchButton.tsx      # Botón contextual de captura por adyacencia
│   ├── HUD.tsx              # Barra superior con contador y colección
│   └── VictoryModal.tsx     # Modal de fin de juego y botón de reinicio
├── app.json                 # Configuración del proyecto Expo
└── package.json             # Dependencias y scripts
```

---

## 🛠️ Tecnologías

- [Expo](https://expo.dev/) (SDK 57)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
