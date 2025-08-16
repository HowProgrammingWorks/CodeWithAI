'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { generateGSID, CHARS } = require('./gsid.js');

test('GSID generation produces valid format', () => {
  const gsid = generateGSID();
  assert.strictEqual(typeof gsid, 'string');
  assert.strictEqual(gsid.length, 24);
});

test('GSID uses only characters from the character table', () => {
  const gsid = generateGSID();
  for (let i = 0; i < gsid.length; i++) {
    assert.strictEqual(CHARS.includes(gsid[i]), true);
  }
});
