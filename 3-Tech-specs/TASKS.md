# Create Global Unique Identifier Generator (GSID)

> See implementation report: [REPORT.md](./REPORT.md)
> Original project URL: [metarhia/metautil/tree/gsid-ai](https://github.com/metarhia/metautil/tree/gsid-ai)

## GSID Design Specifications

- Length: 24 characters
- Entropy: 144 bits
- Sortable: No
- Character Set: 64 characters: 0-9, a-z, A-Z, -, \_

## Enhanced Task Structure

### Randomness Source

- Benchmark alternative sources:
  - lib/crypto/randomPrefetcher  
  - crypto.randomUUID  
  - crypto.randomInt  
  - Math.random  
  - propose more  
- Measure throughput (IDs/second) for each source
- Analyze memory usage patterns
- Test entropy quality and distribution
- Evaluate thread safety and concurrent access performance

### Advanced Performance Optimization

1. Implement pregeneration of random data like `randomPrefetcher` do
2. Use CPU-effective memory allocation and copy routines
3. Implement typed arrays and Buffer optimizations
4. Design for 64-character table efficiency
5. Avoid expensive operations: %, /, memory copy, nested loops, transcoding
6. Optimize prefetcher: read uint8 with minimal overhead
7. Implement performance testing and metrics collection

### Implementation Ideas

- Character table optimization
  - Evaluate 64-char tables: 0-9,a-z,A-Z,-,\_ vs BASE64 vs URL-safe vs custom
  - Benchmark encoding/decoding performance for each table
  - Analyze collision probability for different table sizes
- Identifier structure optimization
  - Create comprehensive comparison table with all major algorithms
  - Analyze trade-offs between size, entropy, and sortability
  - Design hybrid approaches combining best features
- Performance impact analysis
  - Benchmark different ID structures on generation speed
  - Analyze memory footprint and garbage collection impact
- We need no sortable (non-time-based IDs for maximum performance)

### Implementation and Testing Strategy

- Generate unit tests for gsid
  - Create lib/gsid.js implementation and test/gsid.js tests
  - Test uniqueness across 1M+ generations
  - Test concurrent generation safety
  - Test performance under load
  - Test edge cases and error conditions
- Update metautil.d.ts with proper TypeScript definitions
- Add integration tests with existing metautil modules
- Create performance benchmarks and comparison tools

## Performance Targets

- Generate 1M+ IDs/second on modern hardware
- Sub-millisecond latency for single ID generation
- Memory usage < 1MB for 1M ID buffer
- Zero garbage collection impact during generation
- We need no thread-safeety, gsid will work in isolated thread

## Implementation Priority

1. Basic GSID generation with 24-char format
2. Prepare unittests
3. Prepare performance tests
4. Basic performance optimization after testing
5. Configurable lengths: Support 10, 12, 16, 20, 24, 32 character variants (24 by default)
