# Cota 90 Café – HW07: Unit Test Assertions with Jest

An online store for specialty coffee built with **React + Vite**. This
assignment extends the HW06 unit tests (branch `HW06-Unit-Testing-4-tests`)
with the **assertion types of Jest**, written with the **AAA pattern**
(Arrange, Act, Assert).

The assignment asks for 6 assertion types; this project covers **7**, ordered
from the simplest to the most complex. The full test plan is in
[`UNIT_TEST_PLAN.md`](UNIT_TEST_PLAN.md).

## What is an assertion?

An assertion is the **Assert** step of a test: `expect(actual)` followed by a
**matcher** that compares the actual value with the expected one. If the
comparison fails, Jest marks the test as FAIL. Different kinds of values need
different matchers, which is what the assertion types are about.

## The 7 assertion types

| # | Type | Matchers used | When to use it |
| --- | --- | --- | --- |
| 1 | **Equality** | `toBe` | Compare a simple value (text, number, boolean) exactly. |
| 2 | **Truthiness** | `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toBeDefined` | Check if something is true, false, missing or empty, without caring about the exact value. |
| 3 | **Numbers** | `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo` | Compare ranges, and decimals where `toBe` fails because of floating-point rounding. |
| 4 | **Strings** | `toMatch`, `not.toMatch` | Check text against a pattern (regular expression) instead of the whole exact text. |
| 5 | **Arrays and objects** | `toContain`, `toHaveLength`, `toEqual`, `toHaveProperty`, `toMatchObject` | Check items in a list, its size, or the fields of an object. `toEqual` compares content, not identity. |
| 6 | **Exceptions** | `toThrow` | Check that invalid input raises an error, by type, message or pattern. The call must be wrapped in a function. |
| 7 | **Async and mocks** | `resolves`, `rejects`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled` | Check promises, and how a function used its dependencies (a fake payment gateway or HTTP client). |

Each type builds on the previous ones: type 1 checks one value with one
matcher; type 7 combines async code, mocks, exceptions and object matchers in
the same test.

## New functions (system under test)

To support the assertions, the order logic was added in `src/utils/pedido.js`,
using the rules the site's chat already announces (free shipping over $500 and
wholesale prices):

| Function | What it does |
| --- | --- |
| `parsePrice(price)` | Converts `"$1,250.50"` into `1250.5`; throws `TypeError` for invalid prices. |
| `qualifiesForFreeShipping(subtotal)` | `true` when the purchase is over $500. |
| `calculateOrderTotal(lines)` | Returns `units`, `subtotal`, `discount` (10% from 10 units), `shipping` ($99 or free) and `total`. |
| `placeOrder(lines, paymentGateway)` | Calculates the total and charges it through the payment gateway it receives. |

The tests also reuse the HW06 functions: `getRegion`, `getRegions`,
`getIntensityBeans`, `fetchGranos`, `getChatResponse` and `SlideNavigator`.

## Example: the same AAA structure at both ends

**Type 1 (simplest):**

```js
test('A1-01 regresa el país de un origen', () => {
  // Arrange
  const origin = 'Panamá – Chiriquí'

  // Act
  const result = getRegion(origin)

  // Assert
  expect(result).toBe('Panamá')
})
```

**Type 7 (most complex):**

```js
test('A7-03 no cobra nada si el pedido es inválido', async () => {
  // Arrange
  const emptyOrder = []

  // Act
  const promise = placeOrder(emptyOrder, paymentGateway)

  // Assert
  await expect(promise).rejects.toThrow('El pedido está vacío')
  expect(paymentGateway.charge).not.toHaveBeenCalled()
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
        ├── 06-exceptions.test.js
        └── 07-async-mocks.test.js
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

The order functions in `pedido.js`, the 7 assertion test files, the test plan
and this README were made with the help of AI (Claude).

> *How it helped (to be completed by the student):*

## Submission

Delete the `node_modules/` folder before zipping the project (it is already
excluded in `.gitignore`).
