# Cota 90 Café – HW07: Unit Test Assertions with Jest

An online store for specialty coffee built with **React + Vite**. This
assignment extends the HW06 unit tests (branch `HW06-Unit-Testing-4-tests`)
with the **assertion types of Jest**, written with the **AAA pattern**
(Arrange, Act, Assert).

The project covers the **6 assertion types** the assignment asks for, ordered
from the simplest to the most complex. The full test plan is in
[`UNIT_TEST_PLAN.md`](UNIT_TEST_PLAN.md).

## What is an assertion?

An assertion is the **Assert** step of a test: `expect(actual)` followed by a
**matcher** that compares the actual value with the expected one. If the
comparison fails, Jest marks the test as FAIL. Different kinds of values need
different matchers, which is what the assertion types are about.

## The 6 assertion types

| # | Type | Matchers used | When to use it |
| --- | --- | --- | --- |
| 1 | **Equality** | `toBe` | Compare a simple value (text, number, boolean) exactly. |
| 2 | **Truthiness** | `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toBeDefined` | Check if something is true, false, missing or empty, without caring about the exact value. |
| 3 | **Numbers** | `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo` | Compare ranges, and decimals where `toBe` fails because of floating-point rounding. |
| 4 | **Strings** | `toMatch`, `not.toMatch` | Check text against a pattern (regular expression) instead of the whole exact text. |
| 5 | **Arrays and objects** | `toContain`, `toHaveLength`, `toEqual`, `toHaveProperty`, `toMatchObject` | Check items in a list, its size, or the fields of an object. `toEqual` compares content, not identity. |
| 6 | **Exceptions** | `toThrow` | Check that invalid input raises an error, by type, message or pattern. The call must be wrapped in a function. |

Each type builds on the previous ones: type 1 checks one value with one
matcher; type 6 wraps the call in a function, checks the error type and
message, and also checks that the object's state did not change.

## New functions (system under test)

To support the assertions, the order logic was added in `src/utils/pedido.js`,
using the rules the site's chat already announces (free shipping over $500 and
wholesale prices):

| Function | What it does |
| --- | --- |
| `parsePrice(price)` | Converts `"$1,250.50"` into `1250.5`; throws `TypeError` for invalid prices. |
| `qualifiesForFreeShipping(subtotal)` | `true` when the purchase is over $500. |
| `calculateOrderTotal(lines)` | Returns `units`, `subtotal`, `discount` (10% from 10 units), `shipping` ($99 or free) and `total`. |

The tests also reuse the HW06 functions: `getRegion`, `getRegions`,
`getIntensityBeans`, `fetchGranos`, `getChatResponse` and `SlideNavigator`.

## Example: the same AAA structure at both ends

In every test, the three AAA steps are separated by a blank line: first the
Arrange (inputs), then the Act (the call), then the Assert (`expect`).

**Type 1 (simplest):**

```js
test('A1-01 regresa el país de un origen', () => {
  const origin = 'Panamá – Chiriquí'

  const result = getRegion(origin)

  expect(result).toBe('Panamá')
})
```

**Type 6 (most complex):**

```js
test('A6-04 una excepción no cambia el estado del carrusel', () => {
  const navigator = new SlideNavigator(5, 2)

  const act = () => navigator.goTo(9)

  expect(act).toThrow(/fuera de rango/)
  expect(navigator.current).toBe(2)
})
```

## Project structure

```
src/utils/
├── granos.js, chat.js, SlideNavigator.js   ← HW06 system under test
├── pedido.js                               ← new in HW07
└── __tests__/
    ├── granos.test.js, SlideNavigator.test.js   ← HW06 tests
    └── assertions/                              ← HW07 tests, one file per type
        ├── 01-equality.test.js
        ├── 02-truthiness.test.js
        ├── 03-numbers.test.js
        ├── 04-strings.test.js
        ├── 05-arrays-objects.test.js
        └── 06-exceptions.test.js
```

## How to run

```bash
npm install
npm test                    # all tests
npm test -- assertions      # only the HW07 assertion tests
```

Because the project uses ES modules (`"type": "module"`), the `test` script
runs Jest with `--experimental-vm-modules`.

## Use of AI

The order functions in `pedido.js`, the 6 assertion test files, the test plan
and this README were made with the help of AI (Claude).

> *How it helped (to be completed by the student):*

## Submission

Delete the `node_modules/` folder before zipping the project (it is already
excluded in `.gitignore`).
