'use strict';

const { performance } = require('perf_hooks');
const crypto = require('crypto');
const { generateGSID } = require('./3-Tech-specs/gsid.js');
const GSIDv1 = require('./1-Prompt/gsid.js');
const GSIDv2 = require('./2-Chat-steps/gsid.js');
const { generateId: generateSimpleId } = require('./0-Simple/id.js');

let generateID;

const calcEntropy = (charFreq, totalChars) => {
  let entropy = 0;
  for (const [char, count] of Object.entries(charFreq)) {
    const prob = count / totalChars;
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
  // Keep raw counts for entropy calculation, create percentage version for display
  const charFreqPercent = {};
  for (const char in charFreq) {
    charFreqPercent[char] = (charFreq[char] / totalChars) * 100;
  }
  const sortedChars = Object.entries(charFreqPercent).sort(([, a], [, b]) => b - a);
  console.log(`\n📊 Character Distribution (top 10):`);
  sortedChars.slice(0, 10).forEach(([char, percent]) => {
    console.log(`   '${char}': ${percent.toFixed(2)}%`);
  });
  const totalEntropy = calcEntropy(charFreq, totalChars);
  const entropyPerChar = totalEntropy;
  const entropyPerID = totalEntropy * avgLength;
  console.log(`\n🎲 Entropy Analysis (based on ${size.toLocaleString()} IDs):`);
  console.log(`   Total Characters: ${totalChars.toLocaleString()}`);
  console.log(`   Unique Characters: ${Object.keys(charFreq).length}`);
  console.log(`   Entropy per Character: ${entropyPerChar.toFixed(4)} bits`);
  console.log(`   Entropy per ID (${avgLength.toFixed(1)} chars): ${entropyPerID.toFixed(4)} bits`);
  const theoreticalMaxPerChar = Math.log2(64);
  const theoreticalMaxPerID = theoreticalMaxPerChar * avgLength;
  console.log(`   Theoretical Max per Character: ${theoreticalMaxPerChar.toFixed(4)} bits`);
  console.log(`   Theoretical Max per ID: ${theoreticalMaxPerID.toFixed(4)} bits`);
  const efficiency = (entropyPerID / theoreticalMaxPerID) * 100;
  console.log(`   Efficiency: ${efficiency.toFixed(2)}%`);
  return {
    samples: ids,
    duration,
    rate,
    memoryDelta: memDelta,
    collisionRate,
    avgSize: avgLength,
    isUrlSafe,
    avgEntropy: entropyPerChar,
    entropyPerID,
    efficiency,
    distribution: charFreq,
  };
};

const runBenchmarks = async () => {
  console.log('🚀 Starting Comprehensive ID Generator Benchmark');
  console.log('='.repeat(60));
  const sampleSize = 1000000;

  const idjs = await import('./4-By-example/id.mjs');
  generateID = idjs.generateID;

  const gsidv1Instance = new GSIDv1();
  const gsidv2Instance = new GSIDv2();

  const gsidResults = benchmark(
    () => generateGSID(),
    'GSID (Tech-specs)',
    sampleSize,
  );
  const gsidv1Results = benchmark(
    () => gsidv1Instance.generate(),
    'GSID v1 (Prompt)',
    sampleSize,
  );
  const gsidv2Results = benchmark(
    () => gsidv2Instance.generate(),
    'GSID v2 (Chat-steps)',
    sampleSize,
  );
  const idResults = await benchmark(
    () => generateID(),
    'ID (By-example)',
    sampleSize,
  );
  const simpleResults = benchmark(
    () => generateSimpleId(),
    'Simple (0-Simple)',
    sampleSize,
  );
  const uuidResults = benchmark(
    () => crypto.randomUUID(),
    'UUID v4',
    sampleSize,
  );

  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE COMPARISON SUMMARY');
  console.log('='.repeat(60));

  console.log('\n⚡ Performance Comparison:');
  const gsidRate = gsidResults.rate.toLocaleString();
  const gsidDuration = gsidResults.duration.toFixed(2);
  const gsidPerf = `${gsidRate} IDs/sec (${gsidDuration}ms)`;
  console.log(`   GSID (Tech-specs): ${gsidPerf}`);

  const gsidv1Rate = gsidv1Results.rate.toLocaleString();
  const gsidv1Duration = gsidv1Results.duration.toFixed(2);
  const gsidv1Perf = `${gsidv1Rate} IDs/sec (${gsidv1Duration}ms)`;
  console.log(`   GSID v1 (Prompt):  ${gsidv1Perf}`);

  const gsidv2Rate = gsidv2Results.rate.toLocaleString();
  const gsidv2Duration = gsidv2Results.duration.toFixed(2);
  const gsidv2Perf = `${gsidv2Rate} IDs/sec (${gsidv2Duration}ms)`;
  console.log(`   GSID v2 (Chat):    ${gsidv2Perf}`);

  const idRate = idResults.rate.toLocaleString();
  const idDuration = idResults.duration.toFixed(2);
  const idPerf = `${idRate} IDs/sec (${idDuration}ms)`;
  console.log(`   ID (By-example):   ${idPerf}`);

  const simpleRate = simpleResults.rate.toLocaleString();
  const simpleDuration = simpleResults.duration.toFixed(2);
  const simplePerf = `${simpleRate} IDs/sec (${simpleDuration}ms)`;
  console.log(`   Simple (0-Simple): ${simplePerf}`);

  const uuidRate = uuidResults.rate.toLocaleString();
  const uuidDuration = uuidResults.duration.toFixed(2);
  const uuidPerf = `${uuidRate} IDs/sec (${uuidDuration}ms)`;
  console.log(`   UUID v4:           ${uuidPerf}`);

  const fastest = Math.max(
    gsidResults.rate,
    gsidv1Results.rate,
    gsidv2Results.rate,
    idResults.rate,
    simpleResults.rate,
    uuidResults.rate,
  );
  let fastestName;
  if (fastest === gsidResults.rate) {
    fastestName = 'GSID (Tech-specs)';
  } else if (fastest === gsidv1Results.rate) {
    fastestName = 'GSID v1 (Prompt)';
  } else if (fastest === gsidv2Results.rate) {
    fastestName = 'GSID v2 (Chat)';
  } else if (fastest === idResults.rate) {
    fastestName = 'ID (By-example)';
  } else if (fastest === simpleResults.rate) {
    fastestName = 'Simple (0-Simple)';
  } else {
    fastestName = 'UUID v4';
  }
  const fastestPerf = `${fastest.toLocaleString()} IDs/sec`;
  console.log(`   Fastest:           ${fastestName} (${fastestPerf})`);

  const gsidMemoryMB = (gsidResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(
    2,
  );
  const gsidv1MemoryMB = (
    gsidv1Results.memoryDelta.heapUsed /
    1024 /
    1024
  ).toFixed(2);
  const gsidv2MemoryMB = (
    gsidv2Results.memoryDelta.heapUsed /
    1024 /
    1024
  ).toFixed(2);
  const idMemoryMB = (idResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(2);
  const simpleMemoryMB = (simpleResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(2);
  const uuidMemoryMB = (uuidResults.memoryDelta.heapUsed / 1024 / 1024).toFixed(
    2,
  );

  console.log('\n💾 Memory Usage Comparison:');
  console.log(`   GSID (Tech-specs): ${gsidMemoryMB} MB`);
  console.log(`   GSID v1 (Prompt):  ${gsidv1MemoryMB} MB`);
  console.log(`   GSID v2 (Chat):    ${gsidv2MemoryMB} MB`);
  console.log(`   ID (By-example):   ${idMemoryMB} MB`);
  console.log(`   Simple (0-Simple): ${simpleMemoryMB} MB`);
  console.log(`   UUID v4:           ${uuidMemoryMB} MB`);

  console.log('\n🎲 Measured Entropy (per character):');
  const gsidEntropyStr = `${gsidResults.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   GSID (Tech-specs): ${gsidEntropyStr}`);
  const gsidv1EntropyStr = `${gsidv1Results.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   GSID v1 (Prompt):  ${gsidv1EntropyStr}`);
  const gsidv2EntropyStr = `${gsidv2Results.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   GSID v2 (Chat):    ${gsidv2EntropyStr}`);
  const idEntropyStr = `${idResults.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   ID (By-example):   ${idEntropyStr}`);
  const simpleEntropyStr = `${simpleResults.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   Simple (0-Simple): ${simpleEntropyStr}`);
  const uuidEntropyStr = `${uuidResults.avgEntropy.toFixed(4)} bits/char`;
  console.log(`   UUID v4:           ${uuidEntropyStr}`);

  const bestEntropy = Math.max(
    gsidResults.avgEntropy,
    gsidv1Results.avgEntropy,
    gsidv2Results.avgEntropy,
    idResults.avgEntropy,
    simpleResults.avgEntropy,
    uuidResults.avgEntropy,
  );
  let bestEntropyName;
  if (bestEntropy === gsidResults.avgEntropy) {
    bestEntropyName = 'GSID (Tech-specs)';
  } else if (bestEntropy === gsidv1Results.avgEntropy) {
    bestEntropyName = 'GSID v1 (Prompt)';
  } else if (bestEntropy === gsidv2Results.avgEntropy) {
    bestEntropyName = 'GSID v2 (Chat)';
  } else if (bestEntropy === idResults.avgEntropy) {
    bestEntropyName = 'ID (By-example)';
  } else if (bestEntropy === simpleResults.avgEntropy) {
    bestEntropyName = 'Simple (0-Simple)';
  } else {
    bestEntropyName = 'UUID v4';
  }
  const bestEntropyPerf = `${bestEntropy.toFixed(4)} bits/char`;
  console.log(`   Best entropy:      ${bestEntropyName} (${bestEntropyPerf})`);

  console.log('\n🎲 Measured Entropy (per ID):');
  const gsidEntropyIDStr = `${gsidResults.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   GSID (Tech-specs): ${gsidEntropyIDStr}`);
  const gsidv1EntropyIDStr = `${gsidv1Results.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   GSID v1 (Prompt):  ${gsidv1EntropyIDStr}`);
  const gsidv2EntropyIDStr = `${gsidv2Results.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   GSID v2 (Chat):    ${gsidv2EntropyIDStr}`);
  const idEntropyIDStr = `${idResults.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   ID (By-example):   ${idEntropyIDStr}`);
  const simpleEntropyIDStr = `${simpleResults.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   Simple (0-Simple): ${simpleEntropyIDStr}`);
  const uuidEntropyIDStr = `${uuidResults.entropyPerID.toFixed(4)} bits/ID`;
  console.log(`   UUID v4:           ${uuidEntropyIDStr}`);

  const bestEntropyID = Math.max(
    gsidResults.entropyPerID,
    gsidv1Results.entropyPerID,
    gsidv2Results.entropyPerID,
    idResults.entropyPerID,
    simpleResults.entropyPerID,
    uuidResults.entropyPerID,
  );
  let bestEntropyIDName;
  if (bestEntropyID === gsidResults.entropyPerID) {
    bestEntropyIDName = 'GSID (Tech-specs)';
  } else if (bestEntropyID === gsidv1Results.entropyPerID) {
    bestEntropyIDName = 'GSID v1 (Prompt)';
  } else if (bestEntropyID === gsidv2Results.entropyPerID) {
    bestEntropyIDName = 'GSID v2 (Chat)';
  } else if (bestEntropyID === idResults.entropyPerID) {
    bestEntropyIDName = 'ID (By-example)';
  } else if (bestEntropyID === simpleResults.entropyPerID) {
    bestEntropyIDName = 'Simple (0-Simple)';
  } else {
    bestEntropyIDName = 'UUID v4';
  }
  const bestEntropyIDPerf = `${bestEntropyID.toFixed(4)} bits/ID`;
  console.log(`   Best entropy per ID: ${bestEntropyIDName} (${bestEntropyIDPerf})`);

  console.log('\n📏 Size Comparison:');
  const gsidSizeStr = `${gsidResults.avgSize.toFixed(1)} characters`;
  console.log(`   GSID (Tech-specs): ${gsidSizeStr}`);
  const gsidv1SizeStr = `${gsidv1Results.avgSize.toFixed(1)} characters`;
  console.log(`   GSID v1 (Prompt):  ${gsidv1SizeStr}`);
  const gsidv2SizeStr = `${gsidv2Results.avgSize.toFixed(1)} characters`;
  console.log(`   GSID v2 (Chat):    ${gsidv2SizeStr}`);
  const idSizeStr = `${idResults.avgSize.toFixed(1)} characters`;
  console.log(`   ID (By-example):   ${idSizeStr}`);
  const simpleSizeStr = `${simpleResults.avgSize.toFixed(1)} characters`;
  console.log(`   Simple (0-Simple): ${simpleSizeStr}`);
  const uuidSizeStr = `${uuidResults.avgSize.toFixed(1)} characters`;
  console.log(`   UUID v4:           ${uuidSizeStr}`);

  const smallest = Math.min(
    gsidResults.avgSize,
    gsidv1Results.avgSize,
    gsidv2Results.avgSize,
    idResults.avgSize,
    simpleResults.avgSize,
    uuidResults.avgSize,
  );
  let smallestName;
  if (smallest === gsidResults.avgSize) {
    smallestName = 'GSID (Tech-specs)';
  } else if (smallest === gsidv1Results.avgSize) {
    smallestName = 'GSID v1 (Prompt)';
  } else if (smallest === gsidv2Results.avgSize) {
    smallestName = 'GSID v2 (Chat)';
  } else if (smallest === idResults.avgSize) {
    smallestName = 'ID (By-example)';
  } else if (smallest === simpleResults.avgSize) {
    smallestName = 'Simple (0-Simple)';
  } else {
    smallestName = 'UUID v4';
  }
  const smallestPerf = `${smallest.toFixed(1)} chars`;
  console.log(`   Most compact:      ${smallestName} (${smallestPerf})`);

  console.log('\n🔍 Collision Rate Comparison:');
  const gsidCollisionStr = `${gsidResults.collisionRate.toFixed(8)}%`;
  console.log(`   GSID (Tech-specs): ${gsidCollisionStr}`);
  const gsidv1CollisionStr = `${gsidv1Results.collisionRate.toFixed(8)}%`;
  console.log(`   GSID v1 (Prompt):  ${gsidv1CollisionStr}`);
  const gsidv2CollisionStr = `${gsidv2Results.collisionRate.toFixed(8)}%`;
  console.log(`   GSID v2 (Chat):    ${gsidv2CollisionStr}`);
  const idCollisionStr = `${idResults.collisionRate.toFixed(8)}%`;
  console.log(`   ID (By-example):   ${idCollisionStr}`);
  const simpleCollisionStr = `${simpleResults.collisionRate.toFixed(8)}%`;
  console.log(`   Simple (0-Simple): ${simpleCollisionStr}`);
  const uuidCollisionStr = `${uuidResults.collisionRate.toFixed(8)}%`;
  console.log(`   UUID v4:           ${uuidCollisionStr}`);

  console.log('\n🌐 URL Safety:');
  console.log(
    `   GSID (Tech-specs): ${gsidResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   GSID v1 (Prompt):  ${gsidv1Results.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   GSID v2 (Chat):    ${gsidv2Results.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   ID (By-example):   ${idResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   Simple (0-Simple): ${simpleResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );
  console.log(
    `   UUID v4:           ${uuidResults.isUrlSafe ? '✅ Safe' : '❌ Unsafe'}`,
  );

  const gsidTheoreticalEntropy = Math.log2(64) * gsidResults.avgSize;
  const gsidv1TheoreticalEntropy = Math.log2(64) * gsidv1Results.avgSize;
  const gsidv2TheoreticalEntropy = Math.log2(64) * gsidv2Results.avgSize;
  const idTheoreticalEntropy = Math.log2(64) * idResults.avgSize;
  const simpleTheoreticalEntropy = Math.log2(32) * simpleResults.avgSize;
  const uuidTheoreticalEntropy = 122;

  console.log('\n🧮 Theoretical Entropy:');
  console.log(`   GSID (Tech-specs): ${gsidTheoreticalEntropy} bits`);
  console.log(`   GSID v1 (Prompt):  ${gsidv1TheoreticalEntropy} bits`);
  console.log(`   GSID v2 (Chat):    ${gsidv2TheoreticalEntropy} bits`);
  console.log(`   ID (By-example):   ${idTheoreticalEntropy} bits`);
  console.log(`   Simple (0-Simple): ${simpleTheoreticalEntropy} bits`);
  const uuidSpec = `${uuidTheoreticalEntropy} bits (RFC 4122 specification)`;
  console.log(`   UUID v4:           ${uuidSpec}`);

  const theoreticalParams = [
    gsidTheoreticalEntropy,
    gsidv1TheoreticalEntropy,
    gsidv2TheoreticalEntropy,
    idTheoreticalEntropy,
    simpleTheoreticalEntropy,
    uuidTheoreticalEntropy,
  ];
  const bestTheoretical = Math.max(...theoreticalParams);
  let bestName;
  if (bestTheoretical === gsidTheoreticalEntropy) {
    bestName = 'GSID (Tech-specs)';
  } else if (bestTheoretical === gsidv1TheoreticalEntropy) {
    bestName = 'GSID v1 (Prompt)';
  } else if (bestTheoretical === gsidv2TheoreticalEntropy) {
    bestName = 'GSID v2 (Chat)';
  } else if (bestTheoretical === idTheoreticalEntropy) {
    bestName = 'ID (By-example)';
  } else if (bestTheoretical === simpleTheoreticalEntropy) {
    bestName = 'Simple (0-Simple)';
  } else {
    bestName = 'UUID v4';
  }
  const bestTheoreticalPerf = `${bestTheoretical} bits`;
  console.log(`   Best theoretical:  ${bestName} (${bestTheoreticalPerf})`);

  console.log('\n💡 Key Advantages:');
  const fastestAdvantage = `${fastest.toLocaleString()} IDs/sec`;
  console.log(`   ✅ Fastest: ${fastestName} (${fastestAdvantage})`);
  const compactAdvantage = `${smallest.toFixed(1)} chars`;
  console.log(`   ✅ Most compact: ${smallestName} (${compactAdvantage})`);
  const entropyAdvantage = `${bestEntropy.toFixed(4)} bits/char`;
  console.log(`   ✅ Best entropy: ${bestEntropyName} (${entropyAdvantage})`);
  const theoreticalAdvantage = `${bestName} (${bestTheoreticalPerf})`;
  console.log(`   ✅ Best theoretical entropy: ${theoreticalAdvantage}`);

  const allUrlSafe =
    gsidResults.isUrlSafe &&
    gsidv1Results.isUrlSafe &&
    gsidv2Results.isUrlSafe &&
    idResults.isUrlSafe &&
    simpleResults.isUrlSafe &&
    uuidResults.isUrlSafe;
  if (allUrlSafe) {
    const urlSafeMsg = 'All implementations are URL-safe';
    console.log(`   ✅ ${urlSafeMsg}`);
  }

  const allNoCollisions =
    gsidResults.collisionRate === 0 &&
    gsidv1Results.collisionRate === 0 &&
    gsidv2Results.collisionRate === 0 &&
    idResults.collisionRate === 0 &&
    simpleResults.collisionRate === 0 &&
    uuidResults.collisionRate === 0;
  if (allNoCollisions) {
    const msg = 'All implementations maintain excellent collision resistance';
    console.log(`   ✅ ${msg}`);
  }

  console.log('\n🎯 Recommended Use Cases:');
  console.log('   🚀 High-performance APIs: GSID');
  console.log('   🗄️  Database primary keys: GSID (shorter, faster)');
  console.log('   🔗 URL parameters: GSID (URL-safe, compact)');
  console.log('   🌍 General purpose: UUID v4 (widely supported)');
  console.log('   📅 Time-ordered data: Consider ULID or UUID v1');

  console.log('\n✨ Benchmark completed successfully!');
};

runBenchmarks().catch(console.error);
