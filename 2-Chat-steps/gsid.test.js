'use strict';

const GSID = require('./gsid.js');
const crypto = require('crypto');
const { performance } = require('perf_hooks');

const gsid = new GSID();

console.log('GSID Examples:');
for (let i = 0; i < 5; i++) {
  console.log(`GSID ${i + 1}: ${gsid.generate()}`);
}

console.log('\nUUID Examples:');
for (let i = 0; i < 5; i++) {
  console.log(`UUID ${i + 1}: ${crypto.randomUUID()}`);
}

console.log('\nPerformance Benchmark:');
const iterations = 100000;
const start = performance.now();
for (let i = 0; i < iterations; i++) {
  gsid.generate();
}
const gsidTime = performance.now() - start;
const uuidStart = performance.now();
for (let i = 0; i < iterations; i++) {
  crypto.randomUUID();
}
const uuidTime = performance.now() - uuidStart;
console.log(`GSID time: ${gsidTime.toFixed(2)}ms`);
console.log(`UUID time: ${uuidTime.toFixed(2)}ms`);
console.log(`GSID is ${(uuidTime / gsidTime).toFixed(2)}x faster than UUID`);
