# Cota 90 Café – HW06: Unit Testing con Jest y patrón AAA

Tienda en línea de café de especialidad hecha con **React + Vite**. En esta
entrega se agregan pruebas unitarias con **Jest**, siguiendo lo visto en la
presentación de clase *"Unit Testing and AAA pattern"* (Unidad 4, temas 4.1 y
4.2; archivo `SQU4C12_Unit_Testing_AAA_Pattern.pdf`).

Las referencias a diapositivas de este documento usan el número de página del PDF.

---

## 1. ¿Qué es una prueba unitaria? (diap. 4–6)

La presentación define la prueba unitaria como una técnica que valida **una
porción pequeña del código** (un método, clase, módulo o función), que debe ser
**automática**, dar retroalimentación **rápida y precisa** y ser **independiente
de servicios o bases de datos** (diap. 6).

La **pirámide de pruebas** de Mike Cohn (diap. 4) indica que las pruebas
unitarias son la base: deben ser las más numerosas, y las pruebas de más alto
nivel, cada vez menos. La tabla de Capers Jones (diap. 5) muestra que las
pruebas unitarias detectan en promedio un 40 % de los defectos.

**Cómo se aplica en este proyecto:** la lógica estaba dentro de los componentes
de React, que dependen del navegador y de la red. Para poder probarla como
"una porción pequeña" e independiente, se movió a funciones de JavaScript en
`src/utils/`:

| Sistema bajo prueba (SUT) | Archivo | Sacado de |
| --- | --- | --- |
| `fetchGranos(httpClient)` | `src/utils/granos.js` | `App.jsx` |
| `filterByRegion(items, filter)` | `src/utils/granos.js` | `App.jsx` |
| `class SlideNavigator` | `src/utils/SlideNavigator.js` | `Carousel.jsx` |

## 2. Características de una buena prueba unitaria (diap. 7–8)

| Característica (PDF) | Cómo se cumple aquí |
| --- | --- |
| **Fast** (milisegundos) | Las pruebas corren en menos de 2 segundos en total. |
| **Isolated** (sin API ni base de datos) | `fetchGranos` recibe un cliente HTTP falso; nunca se hace una petición real. |
| **Deterministic** (mismo resultado siempre) | Los datos de prueba son fijos; no hay fechas, azar ni red. |
| **Repeatable** | El catálogo se vuelve a crear antes de cada prueba con `beforeEach`. |
| **Self-checking** (PASS o FAIL) | Cada prueba termina en `expect(...)`, así que Jest decide solo si pasa o falla. |
| **Timely** | Se escribieron junto con la extracción de cada función. |

## 3. Patrón AAA: Arrange, Act, Assert (diap. 11)

La presentación divide cada prueba en tres pasos:

- **Arrange:** preparar entradas y objetivos.
- **Act:** ejecutar el comportamiento que se quiere probar.
- **Assert:** comprobar el resultado esperado.

**Cómo se usa:** cada prueba tiene los comentarios `// Arrange`, `// Act` y
`// Assert` para que se vea cada paso.

## 4. Funciones de Jest usadas (diap. 13)

La diapositiva 13 presenta las funciones principales de Jest, y todas se usan
en las pruebas:

| Función (PDF) | Para qué sirve | Dónde se usa |
| --- | --- | --- |
| `describe` | Agrupa pruebas (test suite) | `describe('fetchGranos')`, `describe('SlideNavigator')`, `describe('filtro por región')` |
| `test` / `it` | Define una prueba individual | Todas las pruebas |
| `expect(actual)` | Recibe el valor obtenido | Todas las pruebas |
| `.toBe(esperado)` | Compara valores simples | UT-03 |
| Otros matchers | `.toEqual`, `.toHaveBeenCalledWith` | UT-02, UT-04 |

## 5. Plan de pruebas y tipos de Arrange (diap. 13–16)

La presentación explica **cuatro usos comunes del Arrange**. Cada una de las 4
pruebas usa uno distinto:

| ID | Autor | Tipo de Arrange (PDF) | Diap. | Qué se prueba | Archivo |
| --- | --- | --- | --- | --- | --- |
| UT-01 | Alumno | 1. Inicializar entradas y parámetros | 13 | *(la completa el alumno)* | *(la completa el alumno)* |
| UT-02 | Con IA | 3. Configurar dependencias con mocks (inyección de dependencias) | 15 | `fetchGranos` regresa los datos del cliente HTTP | `src/utils/__tests__/granos.test.js` |
| UT-03 | Con IA | 2. Instanciar objetos del SUT | 14 | `SlideNavigator` vuelve a la primera diapositiva después de la última | `src/utils/__tests__/SlideNavigator.test.js` |
| UT-04 | Con IA | 4. Preparar el estado requerido | 16 | `filterByRegion` regresa solo los granos de México | `src/utils/__tests__/granos.test.js` |

### UT-01: Inicializar entradas y parámetros (diap. 13), del alumno

> *Sección para completar por el alumno: función probada, entradas usadas,
> resultado esperado y qué se tomó de la diapositiva 13.*

### UT-02: Dependencias con mocks (diap. 15)

- **Qué dice el PDF:** en el Arrange se configuran las dependencias con mocks,
  usando inyección de dependencias.
- **Cómo se usó:** `fetchGranos` no importa axios directamente, sino que lo
  recibe como parámetro (`httpClient`). En la app se le pasa axios; en la prueba
  se le pasa un objeto falso creado con `jest.fn().mockResolvedValue(...)`.
- **Qué se comprueba:** que regresa los datos del mock y que pidió
  `/granos.json`. Esto también cumple con **Isolated** (diap. 7), porque no se
  usa la red.

### UT-03: Instanciar objetos del SUT (diap. 14)

- **Qué dice el PDF:** en el Arrange se crean instancias de los objetos del
  sistema bajo prueba.
- **Cómo se usó:** la lógica del carrusel se convirtió en la clase
  `SlideNavigator`. El Arrange crea `new SlideNavigator(5, 4)` (5 diapositivas,
  empezando en la última).
- **Qué se comprueba:** al llamar `next()` regresa a la primera (índice 0).

### UT-04: Preparar el estado requerido (diap. 16)

- **Qué dice el PDF:** en el Arrange se prepara el estado necesario (base de
  datos o entorno) antes de probar.
- **Cómo se usó:** en lugar de una base de datos real, `beforeEach` crea un
  catálogo de 4 granos antes de cada prueba, así cada prueba empieza con el
  mismo estado (**Repeatable**, diap. 8).
- **Qué se comprueba:** al filtrar por `"México"` quedan solo los granos 7 y 8.

## 6. Cómo correr las pruebas (diap. 13)

La diapositiva 13 indica instalar Jest y ejecutar `npm test`:

```bash
npm install
npm test
```

Para correr un solo archivo:

```bash
npm test -- granos.test.js
```

Como el proyecto usa módulos ES (`"type": "module"`), el script `test` ejecuta
Jest con `--experimental-vm-modules`.

## 7. Uso de IA

Las pruebas UT-02, UT-03 y UT-04, la extracción de funciones a `src/utils/` y
este README se hicieron con ayuda de IA (Claude). UT-01 es del alumno.

## 8. Entrega

Antes de comprimir el proyecto, borrar la carpeta `node_modules/`, como lo
pide la actividad (ya está excluida en `.gitignore`).
