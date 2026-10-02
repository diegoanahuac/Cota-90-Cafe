# HW07 – Unit Test Plan: Jest Assertion Types (AAA)

## Goal

Cover the assertion types of Jest with unit tests for **Cota 90 Café**, using
the **Arrange, Act, Assert** pattern. The assignment asks for 6 assertion types;
this plan covers **7**, ordered from the simplest to the most complex.

The six types follow the categories of Jest's
[Using Matchers](https://jestjs.io/docs/using-matchers) guide (equality,
truthiness, numbers, strings, arrays and iterables, exceptions). The seventh
adds asynchronous code and mock functions.

## System under test

| Module | Function / class | New in HW07 | What it does |
| --- | --- | --- | --- |
| `src/utils/granos.js` | `getRegion`, `getRegions`, `getIntensityBeans`, `fetchGranos` | | Catalog logic (from HW06) |
| `src/utils/chat.js` | `getChatResponse` | | Chat bot answer for a message |
| `src/utils/SlideNavigator.js` | `SlideNavigator` | | Carousel navigation |
| `src/utils/pedido.js` | `parsePrice` | ✔ | `"$1,250.50"` → `1250.5`; throws `TypeError` on bad input |
| `src/utils/pedido.js` | `qualifiesForFreeShipping` | ✔ | `true` when the purchase is over $500 |
| `src/utils/pedido.js` | `calculateOrderTotal` | ✔ | Subtotal, 10% wholesale discount from 10 units, $99 shipping unless free, total |
| `src/utils/pedido.js` | `placeOrder` | ✔ | Async: calculates the total and charges it through an injected payment gateway |

The new order functions use the business rules already shown in the site's
chat: free shipping on purchases over $500 and wholesale prices.

## Assertion types, from simplest to hardest

| # | Assertion type | Matchers | Difficulty | Test file |
| --- | --- | --- | --- | --- |
| 1 | Equality | `toBe` | ★☆☆☆☆☆☆ | `01-equality.test.js` |
| 2 | Truthiness | `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toBeDefined` | ★★☆☆☆☆☆ | `02-truthiness.test.js` |
| 3 | Numbers | `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo` | ★★★☆☆☆☆ | `03-numbers.test.js` |
| 4 | Strings | `toMatch` (regular expressions), `not.toMatch` | ★★★★☆☆☆ | `04-strings.test.js` |
| 5 | Arrays and objects | `toContain`, `toHaveLength`, `toEqual`, `toHaveProperty`, `toMatchObject` | ★★★★★☆☆ | `05-arrays-objects.test.js` |
| 6 | Exceptions | `toThrow` (by type, message and regex) | ★★★★★★☆ | `06-exceptions.test.js` |
| 7 | Async and mocks | `resolves`, `rejects`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled` | ★★★★★★★ | `07-async-mocks.test.js` |

All files are in `src/utils/__tests__/assertions/`.

## Test cases

| ID | Unit | Arrange | Act | Assert |
| --- | --- | --- | --- | --- |
| **1. Equality** | | | | |
| A1-01 | `getRegion` | origin `'Panamá – Chiriquí'` | call function | `toBe('Panamá')` |
| **2. Truthiness** | | | | |
| A2-01 | `qualifiesForFreeShipping` | subtotal 650 | call function | `toBeTruthy()` |
| A2-02 | `qualifiesForFreeShipping` | subtotal exactly 500 (boundary) | call function | `toBeFalsy()` |
| A2-03 | `getChatResponse` | blank message and `'tueste'` | call function twice | `toBeNull()` / `toBeDefined()` |
| **3. Numbers** | | | | |
| A3-01 | `parsePrice` | `'$1,250.50'` | call function | `toBeGreaterThan(1250)`, `toBeLessThan(1251)` |
| A3-02 | `calculateOrderTotal` | 3 × `$19.99` | call function | subtotal and total `toBeCloseTo` (decimals), shipping `toBe(99)` |
| A3-03 | `calculateOrderTotal` | 10 × `$345.50` (wholesale) | call function | discount `toBeCloseTo(345.5)`, total `toBeLessThan` subtotal |
| **4. Strings** | | | | |
| A4-01 | `getIntensityBeans` | intensity 4 | call function | `toMatch(/^(🔥){4}⚪$/u)` |
| A4-02 | `getChatResponse` | `'¿Cuánto cuesta el ENVIO?'` | call function | `toMatch(/envío gratis/i)`, `toMatch(/\$500/)`, `not.toMatch(/mayoreo/i)` |
| **5. Arrays and objects** | | | | |
| A5-01 | `getRegions` | catalog with 3 Mexican origins in `beforeEach` | call function | `toHaveLength(3)`, `toContain('México')`, `not.toContain('Oaxaca')`, `toEqual([...])` |
| A5-02 | `calculateOrderTotal` | `$320` × 1 + `$380` × 2 | call function | `toHaveProperty('total')`, `toMatchObject`, `toEqual` |
| **6. Exceptions** | | | | |
| A6-01 | `getIntensityBeans` | intensity 7 | wrap call in a function | `toThrow(RangeError)`, `toThrow('entre 0 y 5')` |
| A6-02 | `parsePrice` | 4 badly written prices | wrap each call | every one `toThrow(TypeError)` |
| A6-03 | `calculateOrderTotal` | empty order, quantity 0 | wrap calls | `toThrow('El pedido está vacío')`, `toThrow(RangeError)` |
| A6-04 | `SlideNavigator` | navigator on slide 2 | `goTo(9)` | `toThrow(/fuera de rango/)` and state unchanged |
| **7. Async and mocks** | | | | |
| A7-01 | `placeOrder` | `jest.fn()` gateway resolving `{ id: 'PAY-001' }` | call function | `resolves.toMatchObject`, charged once with 640 |
| A7-02 | `placeOrder` | gateway rejects once | call function | `rejects.toThrow('Tarjeta rechazada')`, charged with 419 |
| A7-03 | `placeOrder` | empty order | call function | `rejects.toThrow`, gateway `not.toHaveBeenCalled()` |
| A7-04 | `fetchGranos` | `jest.fn()` HTTP client | call function | `resolves.toEqual`, called with `/granos.json` |

## How to run

```bash
npm install
npm test                    # all tests
npm test -- assertions      # only the HW07 assertion tests
```

> Delete `node_modules/` before zipping the project for submission.
