'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { generateId } = require('./id.js');

test('ID generation produces valid format', () => {
  const id = generateId();
  assert.strictEqual(typeof id, 'string');
  assert.strictEqual(id.length, 24);
});

test('ID uses only base32 characters', () => {
  const id = generateId();
  const base32Regex = /^[0-9a-v]+$/;
  assert.strictEqual(base32Regex.test(id), true);
});

test('ID generation of custom length', () => {
  const id10 = generateId(10);
  const id16 = generateId(16);
  const id24 = generateId(24);
  const id32 = generateId(32);

  assert.strictEqual(id10.length, 10);
  assert.strictEqual(id16.length, 16);
  assert.strictEqual(id24.length, 24);
  assert.strictEqual(id32.length, 32);
});

test('Generated IDs are unique', () => {
  const ids = new Set();
  for (let i = 0; i < 1000; i++) {
    ids.add(generateId());
  }
  assert.strictEqual(ids.size, 1000);
});
