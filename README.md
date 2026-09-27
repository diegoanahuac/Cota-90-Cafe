# Cota 90 Café – HW06: Unit Testing with Jest and the AAA Pattern

An online store for specialty coffee built with **React + Vite**. This
assignment adds unit tests with **Jest**, following the class presentation
*"Unit Testing and AAA pattern"* (Unit 4, topics 4.1 and 4.2; file
`SQU4C12_Unit_Testing_AAA_Pattern.pdf`).

Slide references in this document use the PDF page number.

---

## 1. What is a unit test? (slides 4–6)

The presentation defines unit testing as a technique that validates **a small
portion of the source code** (one method, class, module or function). A unit
test must be **automatic**, give **fast and accurate** feedback, and be
**independent of services or data stores** (slide 6).

Mike Cohn's **testing pyramid** (slide 4) puts unit tests at the base: they
should be the most numerous, with fewer tests at each higher level. The Capers
Jones table (slide 5) shows that unit testing detects about 40% of defects on
average.

**How it applies to this project:** the logic lived inside React components,
which depend on the browser and the network. To test it as a "small portion"
that is independent, it was moved into plain JavaScript functions in
`src/utils/`:

| System under test (SUT) | File | Extracted from |
| --- | --- | --- |
| `fetchGranos(httpClient)` | `src/utils/granos.js` | `App.jsx` |
| `filterByRegion(items, filter)` | `src/utils/granos.js` | `App.jsx` |
| `class SlideNavigator` | `src/utils/SlideNavigator.js` | `Carousel.jsx` |

## 2. Characteristics of a good unit test (slides 7–8)

| Characteristic (PDF) | How it is met here |
| --- | --- |
| **Fast** (milliseconds) | All tests run in under 2 seconds in total. |
| **Isolated** (no API or database) | `fetchGranos` receives a fake HTTP client; no real request is ever made. |
| **Deterministic** (same result every time) | Test data is fixed; there are no dates, randomness or network calls. |
| **Repeatable** | The catalog is rebuilt before each test with `beforeEach`. |
| **Self-checking** (PASS or FAIL) | Every test ends in `expect(...)`, so Jest decides on its own whether it passes or fails. |
| **Timely** | The tests were written alongside the extraction of each function. |

## 3. The AAA pattern: Arrange, Act, Assert (slide 11)

The presentation splits every test into three steps:

- **Arrange:** set up inputs and targets.
- **Act:** run the behavior being tested.
- **Assert:** check the expected outcome.

**How it is used:** every test has `// Arrange`, `// Act` and `// Assert`
comments so each step is visible.

## 4. Jest functions used (slide 13)

Slide 13 introduces Jest's core functions, and all of them are used in the
tests:

| Function (PDF) | Purpose | Where it is used |
| --- | --- | --- |
| `describe` | Groups tests (test suite) | `describe('fetchGranos')`, `describe('SlideNavigator')`, `describe('filtro por región')` |
| `test` / `it` | Defines an individual test | Every test |
| `expect(actual)` | Takes the actual value | Every test |
| `.toBe(expected)` | Compares simple values | UT-03 |
| Other matchers | `.toEqual`, `.toHaveBeenCalledWith` | UT-02, UT-04 |

## 5. Test plan and Arrange types (slides 13–16)

The presentation explains **four common uses of Arrange**. Each of the 4 tests
uses a different one:

| ID | Author | Arrange type (PDF) | Slide | What is tested | File |
| --- | --- | --- | --- | --- | --- |
| UT-01 | Student | 1. Initializing inputs & parameters | 13 | *(to be completed by the student)* | *(to be completed by the student)* |
| UT-02 | AI-assisted | 3. Configuring dependencies with mocks (dependency injection) | 15 | `fetchGranos` returns the HTTP client's data | `src/utils/__tests__/granos.test.js` |
| UT-03 | AI-assisted | 2. Instantiating objects of the SUT | 14 | `SlideNavigator` wraps back to the first slide after the last one | `src/utils/__tests__/SlideNavigator.test.js` |
| UT-04 | AI-assisted | 4. Preparing required state | 16 | `filterByRegion` returns only the beans from México | `src/utils/__tests__/granos.test.js` |

### UT-01: Initializing inputs & parameters (slide 13), by the student

> *Section to be completed by the student: function tested, inputs used,
> expected result, and what was taken from slide 13.*

### UT-02: Dependencies with mocks (slide 15)

- **What the PDF says:** in the Arrange step, dependencies are configured with
  mocks, using dependency injection.
- **How it was used:** `fetchGranos` does not import axios directly; it
  receives it as a parameter (`httpClient`). The app passes in axios; the test
  passes in a fake object created with `jest.fn().mockResolvedValue(...)`.
- **What is checked:** that it returns the mock's data and that it requested
  `/granos.json`. This also meets **Isolated** (slide 7), because no network
  is used.

### UT-03: Instantiating objects of the SUT (slide 14)

- **What the PDF says:** in the Arrange step, instances of the objects of the
  system under test are created.
- **How it was used:** the carousel logic was turned into the `SlideNavigator`
  class. The Arrange step creates `new SlideNavigator(5, 4)` (5 slides,
  starting on the last one).
- **What is checked:** calling `next()` goes back to the first slide (index 0).

### UT-04: Preparing required state (slide 16)

- **What the PDF says:** in the Arrange step, the required state (database or
  environment) is prepared before testing.
- **How it was used:** instead of a real database, `beforeEach` builds a
  catalog of 4 beans before each test, so every test starts from the same
  state (**Repeatable**, slide 8).
- **What is checked:** filtering by `"México"` leaves only beans 7 and 8.

## 6. How to run the tests (slide 13)

Slide 13 says to install Jest and run `npm test`:

```bash
npm install
npm test
```

To run a single file:

```bash
npm test -- granos.test.js
```

Because the project uses ES modules (`"type": "module"`), the `test` script
runs Jest with `--experimental-vm-modules`.

## 7. Use of AI

Tests UT-02, UT-03 and UT-04, the extraction of functions into `src/utils/`,
and this README were made with the help of AI (Claude). UT-01 is the
student's own work.

## 8. Submission

Before zipping the project, delete the `node_modules/` folder, as the
assignment requires (it is already excluded in `.gitignore`).
