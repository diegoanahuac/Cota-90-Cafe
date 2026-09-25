# HW06 – Unit Test Plan (Jest + AAA)

## System Under Test (SUT)

**Cota 90 Café**: a React + Vite storefront for specialty coffee beans. The
business logic currently lives inside React components, so it is extracted into
plain JavaScript modules under `src/utils/` so it can be unit tested without a
browser, network or React.

| Module | Function / Class | Extracted from | What it does |
| --- | --- | --- | --- |
| `src/utils/granos.js` | `getRegion(origin)` | `App.jsx` | Returns the country part of an origin (`"Colombia – Huila"` → `"Colombia"`). |
| `src/utils/granos.js` | `getRegions(items)` | `App.jsx` | Builds the filter buttons: `"Todos"` plus each unique region. |
| `src/utils/granos.js` | `filterByRegion(items, filter)` | `App.jsx` | Returns the beans for the selected region (all beans for `"Todos"`). |
| `src/utils/granos.js` | `getIntensityBeans(intensity)` | `GranoItem.jsx` | Renders intensity 0–5 as `🔥` / `⚪` icons. |
| `src/utils/granos.js` | `fetchGranos(httpClient)` | `App.jsx` | Loads `/granos.json` through an injected HTTP client (axios in the app). |
| `src/utils/chat.js` | `getChatResponse(message)` | `ChatWidget.jsx` | Chooses the bot's answer from keywords in the user's message. |
| `src/utils/SlideNavigator.js` | `class SlideNavigator` (`next`, `prev`, `goTo`) | `Carousel.jsx` | Wrap-around index logic for the carousel. |

The components are updated to import these functions, so the app behaves
exactly as before.

## Arrange types covered

| # | Arrange type (from class) | Test file | Test cases |
| --- | --- | --- | --- |
| 1 | **Initializing inputs & parameters** | `granos.test.js`, `chat.test.js` | `getIntensityBeans`, `getRegion`, `getChatResponse` |
| 2 | **Instantiating objects of the SUT** | `SlideNavigator.test.js` | `new SlideNavigator(5)`, then `next` / `prev` / `goTo` |
| 3 | **Configuring dependencies with mocks (DI)** | `granos.test.js` | `fetchGranos` with a `jest.fn()` HTTP client (no network) |
| 4 | **Preparing required state** | `granos.test.js` | `beforeEach` builds a catalog fixture for `getRegions` / `filterByRegion` |

## Test cases

| ID | Function | Arrange | Act | Assert |
| --- | --- | --- | --- | --- |
| UT-01 | `getIntensityBeans` | intensity = 3 | call function | `"🔥🔥🔥⚪⚪"` |
| UT-02 | `getIntensityBeans` | intensity = 0 and 5 (limits) | call function | 5 `⚪` / 5 `🔥` |
| UT-03 | `getIntensityBeans` | intensity = 7 and -1 (invalid) | call function | throws `RangeError` |
| UT-04 | `getRegion` | origin `"Colombia – Huila"` | call function | `"Colombia"` |
| UT-05 | `getRegion` | origin without `–` (`"Blend de la Casa"`) | call function | same text, trimmed |
| UT-06 | `getChatResponse` | message `"¿Cuánto cuesta el ENVIO?"` | call function | shipping answer (case-insensitive) |
| UT-07 | `getChatResponse` | unknown message `"hola"` | call function | default answer |
| UT-08 | `getChatResponse` | blank message `"   "` | call function | `null` (nothing is sent) |
| UT-09 | `SlideNavigator` | `new SlideNavigator(5)` | `next()` | index 1 |
| UT-10 | `SlideNavigator` | navigator at last slide (4) | `next()` | wraps to 0 |
| UT-11 | `SlideNavigator` | navigator at slide 0 | `prev()` | wraps to 4 |
| UT-12 | `SlideNavigator` | navigator | `goTo(9)` | throws `RangeError` |
| UT-13 | `fetchGranos` | mock client resolving `{ data: [...] }` | call function | returns data; client called once with `/granos.json` |
| UT-14 | `fetchGranos` | mock client rejecting | call function | rejects with the same error |
| UT-15 | `getRegions` | catalog state (4 beans, 2 from México) | call function | `["Todos", "Colombia", "México", "Etiopía"]`, no duplicates |
| UT-16 | `filterByRegion` | catalog state | filter `"México"` | only the 2 Mexican beans |
| UT-17 | `filterByRegion` | catalog state | filter `"Todos"` | the full catalog |

## How to run

```bash
npm install
npm test
```

Test files live in `src/utils/__tests__/`.

**Draft deliverable ("1 unit test implementation"):** UT-13, `fetchGranos` with
a mocked HTTP client, in `src/utils/__tests__/granos.test.js`.

> Delete `node_modules/` before zipping the project for submission (it is
> already excluded by `.gitignore`).
