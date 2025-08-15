'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

const run = async () => {
  const { generateID, CHARS } = await import('./id.mjs');

  test('ID generation produces valid format', () => {
    const id = generateID();
    assert.strictEqual(typeof id, 'string');
    assert.strictEqual(id.length, 24);
  });

  test('ID uses only characters from the character table', () => {
    const id = generateID();
    for (let i = 0; i < id.length; i++) {
      assert.strictEqual(CHARS.includes(id[i]), true);
    }
  });

  test('ID generation of custom length', () => {
    const id10 = generateID(10);
    const id12 = generateID(12);
    const id16 = generateID(16);
    const id18 = generateID(18);
    const id20 = generateID(20);
    const id24 = generateID(24);
    const id32 = generateID(32);

    assert.strictEqual(id10.length, 10);
    assert.strictEqual(id12.length, 12);
    assert.strictEqual(id16.length, 16);
    assert.strictEqual(id18.length, 18);
    assert.strictEqual(id20.length, 20);
    assert.strictEqual(id24.length, 24);
    assert.strictEqual(id32.length, 32);
  });
};

run();
