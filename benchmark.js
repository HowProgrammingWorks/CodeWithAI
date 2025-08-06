'use strict';

const { performance } = require('perf_hooks');
const crypto = require('crypto');
const { generateGSID } = require('./3-Tech-specs/gsid.js');

const calcEntropy = (str) => {
  const freq = new Map();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  let entropy = 0;
  const len = str.length;
  for (const count of freq.values()) {
    const prob = count / len;
    entropy -= prob * Math.log2(prob);
  }
  return entropy;
};

const benchmark = (gen, name, size = 1000000) => {
  console.log(`\n=== ${name} Benchmark & Analysis ===`);

  const memStart = process.memoryUsage();
  const timeStart = performance.now();

  const ids = [];
  for (let i = 0; i < size; i++) {
    ids.push(gen());
  }

  const timeEnd = performance.now();
  const memEnd = process.memoryUsage();

  const duration = timeEnd - timeStart;
  const rate = size / (duration / 1000);
  const avgTime = (duration / size) * 1000;

  const memDelta = {
    rss: memEnd.rss - memStart.rss,
    heapUsed: memEnd.heapUsed - memStart.heapUsed,
    heapTotal: memEnd.heapTotal - memStart.heapTotal,
    external: memEnd.external - memStart.external,
    arrayBuffers: memEnd.arrayBuffers - memStart.arrayBuffers,
  };

  console.log(`⏱️  Performance:`);
  console.log(`   Duration: ${duration.toFixed(2)}ms`);
  console.log(`   Rate: ${rate.toLocaleString()} IDs/second`);
  console.log(`   Average time per ID: ${avgTime.toFixed(3)}μs`);
  console.log(`   Memory Delta:`, memDelta);

  const unique = new Set();
  let collisions = 0;
  const charFreq = {};
  let totalChars = 0;
  let unsafeChars = 0;
  const lengths = [];
  const entropySamples = [];

  for (let i = 0; i < size; i++) {
    const id = ids[i];
    if (unique.has(id)) {
      collisions++;
    } else {
      unique.add(id);
    }
    lengths.push(id.length);
    totalChars += id.length;
    for (const char of id) {
      charFreq[char] = (charFreq[char] || 0) + 1;
    }
    const unsafePattern = /[^A-Za-z0-9\-_]/g;
    const unsafeMatches = id.match(unsafePattern);
    if (unsafeMatches) {
      unsafeChars += unsafeMatches.length;
    }
    if (i < 10000) {
      entropySamples.push(id);
    }
  }
  const collisionRate = (collisions / size) * 100;
  console.log(`\n🔍 Collision Analysis:`);
  console.log(`   Total samples: ${size.toLocaleString()}`);
  console.log(`   Unique samples: ${unique.size.toLocaleString()}`);
  console.log(`   Collisions: ${collisions}`);
  console.log(`   Collision rate: ${collisionRate.toFixed(8)}%`);
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const uniqueLengths = [...new Set(lengths)];
  let minLen = lengths[0];
  let maxLen = lengths[0];
  for (let i = 1; i < lengths.length; i++) {
    if (lengths[i] < minLen) minLen = lengths[i];
    if (lengths[i] > maxLen) maxLen = lengths[i];
  }
  console.log(`\n📏 Size Analysis:`);
  console.log(`   Average size: ${avgLength.toFixed(1)} characters`);
  const consistency = uniqueLengths.length === 1 ? 'Consistent' : 'Variable';
  console.log(`   Size consistency: ${consistency}`);
  console.log(`   Size range: ${minLen} - ${maxLen} characters`);
  const unsafePercent = (unsafeChars / totalChars) * 100;
  const isUrlSafe = unsafePercent === 0;
  console.log(`\n🌐 URL Safety:`);
  console.log(`   URL-safe characters: ${isUrlSafe ? 'Yes' : 'No'}`);
  const unsafePercentStr = `${unsafePercent.toFixed(2)}%`;
  console.log(`   Unsafe character percentage: ${unsafePercentStr}`);
  console.log(`   Total unsafe characters: ${unsafeChars}`);
  for (const char in charFreq) {
    charFreq[char] = (charFreq[char] / totalChars) * 100;
  }
  const sortedChars = Object.entries(charFreq).sort(([, a], [, b]) => b - a);
  console.log(`\n📊 Character Distribution (top 10):`);
  sortedChars.slice(0, 10).forEach(([char, percent]) => {
    console.log(`   '${char}': ${percent.toFixed(2)}%`);
  });
  const entropies = entropySamples.map((id) => calcEntropy(id));
  const avgEntropy =
    entropies.reduce((sum, e) => sum + e, 0) / entropies.length;
  const maxEntropy = Math.max(...entropies);
  const minEntropy = Math.min(...entropies);
  console.log(`\n🎲 Entropy Analysis (based on 10,000 samples):`);
  console.log(`   Average Entropy: ${avgEntropy.toFixed(4)} bits`);
  console.log(`   Max Entropy: ${maxEntropy.toFixed(4)} bits`);
  console.log(`   Min Entropy: ${minEntropy.toFixed(4)} bits`);
  const maxBits = Math.log2(64).toFixed(4);
  const charCount = ids[0].length;
  const msg = `Theoretical Max (for ${charCount} chars): ${maxBits} bits`;
  console.log(`   ${msg}`);
  return {
    samples: ids,
    duration,
    rate,
    memoryDelta: memDelta,
    collisionRate,
    avgSize: avgLength,
    isUrlSafe,
    avgEntropy,
    distribution: charFreq,
  };
};

const runBenchmarks = () => {
  console.log('🚀 Starting Comprehensive ID Generator Benchmark');
  console.log('='.repeat(60));
  const sampleSize = 1000000;
  const gsidResults = benchmark(() => generateGSID(), 'GSID', sampleSize);
  const uuidResults = benchmark(
    () => crypto.randomUUID(),
    'UUID v4',
    sampleSize,
  );
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE COMPARISON SUMMARY');
  console.log('='.repeat(60));
  const performanceSpeedup = gsidResults.rate / uuidResults.rate;
  console.log('\n⚡ Performance Comparison:');
  const gsidRate = gsidResults.rate.toLocaleString();
  const gsidDuration = gsidResults.duration.toFixed(2);
  console.log(`   GSID:     ${gsidRate} IDs/sec (${gsidDuration}ms)`);
  const uuidRate = uuidResults.rate.toLocaleString();
  const uuidDuration = uuidResults.duration.toFixed(2);
  console.log(`   UUID v4:  ${uuidRate} IDs/sec (${uuidDuration}ms)`);
  console.log(`   Speedup:  ${performanceSpeedup.toFixed(2)}x faster`);
  const gsidMemoryMB = (gsidResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(
    2,
  );
  const uuidMemoryMB = (uuidResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(
    2,
  );
  console.log('\n💾 Memory Usage Comparison:');
  console.log(`   GSID Heap Used:     ${gsidMemoryMB} MB`);
  console.log(`   UUID v4 Heap Used:  ${uuidMemoryMB} MB`);
  const gsidEntropyPerChar = gsidResults.avgEntropy / gsidResults.avgSize;
  const uuidEntropyPerChar = uuidResults.avgEntropy / uuidResults.avgSize;
  const entropyDiff = gsidEntropyPerChar - uuidEntropyPerChar;
  const entropyRatio = entropyDiff / uuidEntropyPerChar;
  const entropyImprovement = (entropyRatio * 100).toFixed(1);
  console.log('\n🎲 Measured Entropy (per character):');
  console.log(`   GSID:     ${gsidEntropyPerChar.toFixed(4)} bits/char`);
  console.log(`   UUID v4:  ${uuidEntropyPerChar.toFixed(4)} bits/char`);
  const improvementText = `${entropyImprovement}% higher entropy per character`;
  console.log(`   Improvement:      ${improvementText}`);
  const sizeDiff = uuidResults.avgSize - gsidResults.avgSize;
  const sizeReduction = ((sizeDiff / uuidResults.avgSize) * 100).toFixed(1);
  console.log('\n📏 Size Comparison:');
  console.log(`   GSID:     ${gsidResults.avgSize.toFixed(1)} characters`);
  console.log(`   UUID v4:  ${uuidResults.avgSize.toFixed(1)} characters`);
  console.log(`   Size reduction:   ${sizeReduction}% more compact`);
  console.log('\n🔍 Collision Rate Comparison:');
  console.log(`   GSID:     ${gsidResults.collisionRate.toFixed(8)}%`);
  console.log(`   UUID v4:  ${uuidResults.collisionRate.toFixed(8)}%`);
  console.log('\n🌐 URL Safety:');
  console.log(
    `   GSID:     ${gsidResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   UUID v4:  ${uuidResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  const gsidTheoreticalEntropy = Math.log2(64) * gsidResults.avgSize;
  const uuidTheoreticalEntropy = 122;
  const theoreticalDiff = gsidTheoreticalEntropy - uuidTheoreticalEntropy;
  const theoreticalEntropyImprovement = (
    (theoreticalDiff / uuidTheoreticalEntropy) *
    100
  ).toFixed(1);
  console.log('\n🧮 Theoretical Entropy:');
  console.log(`   GSID:     ${gsidTheoreticalEntropy} bits`);
  const uuidSpec = `${uuidTheoreticalEntropy} bits (RFC 4122 specification)`;
  console.log(`   UUID v4:  ${uuidSpec}`);
  const theoreticalText = `${theoreticalEntropyImprovement}% more entropy`;
  console.log(`   Improvement:      ${theoreticalText}`);
  console.log('\n💡 Key Advantages:');
  if (performanceSpeedup > 1) {
    const speedupText =
      `${performanceSpeedup.toFixed(1)}x faster for ` +
      'high-throughput applications';
    console.log(`   ✅ GSID is ${speedupText}`);
  }
  if (gsidResults.avgSize < uuidResults.avgSize) {
    const msg = `more compact, better for storage and URLs`;
    console.log(`   ✅ GSID is ${sizeReduction}% ${msg}`);
  }
  if (gsidResults.isUrlSafe) {
    console.log('   ✅ GSID is URL-safe without encoding');
  }
  if (gsidResults.collisionRate <= uuidResults.collisionRate) {
    console.log('   ✅ GSID maintains excellent collision resistance');
  }
  if (entropyImprovement > 0) {
    const entropyText = `${entropyImprovement}% higher entropy per character`;
    console.log(`   ✅ GSID provides ${entropyText}`);
  }
  console.log('\n🎯 Recommended Use Cases:');
  console.log('   🚀 High-performance APIs: GSID');
  console.log('   🗄️  Database primary keys: GSID (shorter, faster)');
  console.log('   🔗 URL parameters: GSID (URL-safe, compact)');
  console.log('   🌍 General purpose: UUID v4 (widely supported)');
  console.log('   📅 Time-ordered data: Consider ULID or UUID v1');
  console.log('\n✨ Benchmark completed successfully!');
};

runBenchmarks();
