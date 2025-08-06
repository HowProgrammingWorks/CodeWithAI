'use strict';

const GSID = require('./gsid.js');

const gsid = new GSID();

console.log('GSID Examples:');
for (let i = 0; i < 5; i++) {
  console.log(`GSID ${i + 1}: ${gsid.generate()}`);
}

console.log('\nHybrid Examples:');
for (let i = 0; i < 5; i++) {
  console.log(`Hybrid ${i + 1}: ${gsid.generateHybrid()}`);
}

console.log('\nUUID Examples:');
for (let i = 0; i < 5; i++) {
  console.log(`UUID ${i + 1}: ${GSID.generateUUID()}`);
}

console.log('\nPerformance Benchmark:');
const results = gsid.benchmark(100000);
console.log(`GSID time: ${results.gsid.toFixed(2)}ms`);
console.log(`UUID time: ${results.uuid.toFixed(2)}ms`);
console.log(`GSID is ${results.ratio.toFixed(2)}x faster than UUID`);
