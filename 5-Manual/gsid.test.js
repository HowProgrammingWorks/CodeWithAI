'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const nodeGSID = require('./gsid.js');
const webGSID = require('./gsid.mjs');

test('Node.js GSID format', () => {
  const gsid = nodeGSID.generateId();
  console.log({ node: gsid });
  assert.strictEqual(typeof gsid, 'string');
  assert.strictEqual(gsid.length, 24);
});

test('WebAPI GSID format', () => {
  const gsid = webGSID.generateId();
  console.log({ web: gsid });
  assert.strictEqual(typeof gsid, 'string');
  assert.strictEqual(gsid.length, 24);
});

test('Node.js GSID character table', () => {
  const gsid = nodeGSID.generateId();
  for (let i = 0; i < gsid.length; i++) {
    assert.strictEqual(nodeGSID.CHARS.includes(gsid[i]), true);
  }
});

test('WebAPI GSID character table', () => {
  const gsid = webGSID.generateId();
  for (let i = 0; i < gsid.length; i++) {
    assert.strictEqual(webGSID.CHARS.includes(gsid[i]), true);
  }
});
