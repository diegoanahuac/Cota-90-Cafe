# HW06 – Unit Test Plan (Jest + AAA)

## System Under Test (SUT)

**Cota 90 Café**: a React + Vite storefront for specialty coffee beans. The
logic under test was moved out of the React components into plain JavaScript
modules under `src/utils/`, so it can be tested without a browser, network or
React.

| Module | Function / Class | Extracted from | What it does |
| --- | --- | --- | --- |
| `src/utils/granos.js` | `fetchGranos(httpClient)` | `App.jsx` | Loads `/granos.json` through an injected HTTP client (axios in the app). |
| `src/utils/granos.js` | `filterByRegion(items, filter)` | `App.jsx` | Returns the beans for the selected region (all beans for `"Todos"`). |
| `src/utils/SlideNavigator.js` | `class SlideNavigator` | `Carousel.jsx` | Wrap-around index logic for the carousel. |

## Test cases

| ID | Author | Arrange type | Function | Arrange | Act | Assert |
| --- | --- | --- | --- | --- | --- | --- |
| UT-01 | Student | 1. Inputs & parameters | *(student's test)* | | | |
| UT-02 | AI-assisted | 3. Dependencies with mocks | `fetchGranos` | `jest.fn()` HTTP client resolving `{ data: [...] }` | call function | returns the data; client called with `/granos.json` |
| UT-03 | AI-assisted | 2. Instantiating the SUT | `SlideNavigator` | `new SlideNavigator(5, 4)` (last slide) | `next()` | wraps to 0 |
| UT-04 | AI-assisted | 4. Preparing required state | `filterByRegion` | catalog fixture in `beforeEach` | filter `"México"` | only beans 7 and 8 |

Tests UT-02 to UT-04 were written with the help of AI (Claude).

## How to run

```bash
npm install
npm test
```

Test files live in `src/utils/__tests__/`.

> Delete `node_modules/` before zipping the project for submission (it is
> already excluded by `.gitignore`).
