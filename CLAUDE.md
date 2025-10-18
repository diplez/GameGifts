# GameGifts - Documentación del Proyecto

## Descripción General
Proyecto HTML simple que combina dos conceptos independientes:
1. **Juego de la Flor Amarilla** (implementado y funcional)
2. **Sistema de Regalos con Corazones Animados** (código presente pero no integrado)

## Estructura de Archivos

```
GameGifts/
├── index.html      # Página principal con juego de flor amarilla
├── Games.js        # Sistema de corazones/regalos (NO INTEGRADO)
├── styles.css      # Estilos del proyecto
├── cambioV1.txt    # Notas de cambios (vacío)
└── cambioV2.txt    # Notas de cambios (vacío)
```

## Análisis Detallado

### 1. index.html - Juego de la Flor Amarilla

**Dependencias:**
- Bootstrap 5.3.2
- Animate.css 4.1.1

**Flujo del Juego:**
1. **Pantalla de introducción** (`#intro`):
   - Título: "Mi primer juego"
   - Descripción del juego "me quiere, no me quiere"
   - Botón "Jugar" que inicia el juego

2. **Pantalla de juego** (`#juego`):
   - Flor con 6 pétalos amarillos clickeables
   - Centro blanco con animación pulse infinita
   - Tallo verde y hoja con animación
   - Césped decorativo en la base
   - Post-it amarillo oculto con mensaje final

**Mecánica del Juego:**
- **Al hacer click en un pétalo:**
  - Cambia a color aleatorio RGB
  - Se desvanece con transición de opacidad (1s)
  - Desaparece completamente
  - Activa animación de la hoja (leaf-fall)
  - Contador de pétalos disminuye

- **Al eliminar los 6 pétalos:**
  - Aparece post-it amarillo de pantalla completa
  - Muestra mensaje: "FELICIDADES"
  - Mensaje romántico sobre septiembre y flor amarilla

**Funcionalidad "Me quiere, No me quiere":**
- Implementada en `asignarValores()` y `validarJugada()`
- **PROBLEMA:** Genera valores booleanos alternados para cada pétalo
- **PROBLEMA:** El mensaje visual no se muestra correctamente (falta elemento `#mensaje`)
- **Estado:** Parcialmente implementado pero no funcional

### 2. Games.js - Sistema de Corazones/Regalos

**Estado:** NO está vinculado en index.html (falta etiqueta `<script>`)

**Dependencias requeridas:**
- jQuery (NO incluida en index.html)

**Funcionalidad:**
1. **Animación de corazones:**
   - Crea 10 divs con iconos de corazón (`.las.la-heart`)
   - Cada corazón se mueve aleatoriamente por la pantalla
   - Colores aleatorios para cada corazón
   - Animación continua calculada por velocidad/distancia

2. **Sistema de Regalos:**
   - **API:** MockAPI (`https://62fe4c23a85c52ee483484f9.mockapi.io`)
   - **Endpoints:**
     - GET `/love/hearts/1` - Obtiene timestamp del último regalo
     - GET `/love/gift/{id}` - Obtiene regalo por ID
     - PUT `/love/hearts/1` - Actualiza timestamp

   - **Cooldown:** 24 horas entre reclamos
   - **Al hacer click en corazón:**
     - Verifica si han pasado 24h desde último regalo
     - Si sí: muestra alert con regalo ganado y actualiza timestamp
     - Si no: muestra alert con tiempo restante

3. **Funciones Auxiliares:**
   - `makeNewPosition()` - Calcula posición aleatoria
   - `calcSpeed()` - Calcula velocidad de animación
   - `getRandomColor()` - Genera color hexadecimal aleatorio
   - `API_Resource()` - Wrapper genérico para llamadas AJAX
   - `addHours()` - Suma horas a fecha

### 3. styles.css

**Estilos principales:**

**Juego:**
- `.petalo` - Pétalos amarillos (#e9ff70), 80x80px, border-radius 40px
- `#centro` - Centro blanco, 100x100px circular
- `#tallo` - Verde (#006c67), 15x150px
- `#hoja` - Verde (#006c67), 30x30px con border-radius asimétrico
- `#cesped` - Base con elementos rotados 45° simulando césped

**Animaciones:**
- `.animated-leaf` - Animación de hoja balanceándose (rotateY y translateX)
- Keyframes: 0% → 50% (45deg, -8px) → 100% (0deg, 0px)
- Duración: 1s, ease-out, loop infinito

**Interfaz:**
- `#intro` - Pantalla de inicio centrada
- `#mensaje` - Globo de diálogo (no usado correctamente)
- `#postit` - Post-it amarillo de pantalla completa
- `.hidden` / `.mostrar` - Toggle de visibilidad

## Problemas Identificados

1. **Games.js no integrado:**
   - Falta etiqueta `<script src="Games.js"></script>`
   - Falta jQuery
   - Falta elemento `.animatedDivs` en HTML

2. **Funcionalidad "me quiere, no me quiere":**
   - Variable `texto_mensaje` no definida en scope correcto (línea 63)
   - Elemento `#mensaje` no existe en HTML
   - La lógica está implementada pero nunca se ve

3. **Código duplicado/comentado:**
   - Bloque comentado en líneas 69-78 de index.html
   - Función `init()` alternativa sin uso

4. **Dependencias inconsistentes:**
   - Bootstrap cargado pero apenas usado
   - Animate.css usado solo para fadeIn y pulse
   - Games.js requiere jQuery que no está en index.html

5. **Variables globales:**
   - Contador `petalosTotal` como let global
   - Arrays `valores` y `petalos` en scope global

## Estado del Proyecto

**Funcional:**
- ✅ Juego de la flor amarilla básico
- ✅ Animaciones de pétalos
- ✅ Mensaje final al completar
- ✅ Estilos visuales correctos

**No funcional:**
- ❌ Sistema de corazones/regalos
- ❌ Mensaje "me quiere, no me quiere"
- ❌ Integración de Games.js
- ❌ Conexión con API MockAPI

## Commits Recientes
```
31f1ce9 - feat: Cambio: V2
51226d2 - feat: Cambio: V1
1341954 - floresAnarillasV1.1
5635742 - flores amarillas
```

## Posibles Mejoras Futuras

1. **Integración completa:**
   - Vincular Games.js al HTML
   - Agregar jQuery
   - Crear elementos necesarios para corazones

2. **Fix funcionalidad "me quiere, no me quiere":**
   - Agregar elemento `#mensaje` al HTML
   - Corregir scope de variables

3. **Optimización:**
   - Eliminar código comentado
   - Consolidar estilos de Bootstrap
   - Modularizar JavaScript en archivos separados

4. **UX:**
   - Agregar sonidos
   - Mejorar transiciones
   - Hacer responsive para móviles
   - Agregar botón de reinicio

## Autor
Código de Natalia Ortega (comentario en línea 111)
