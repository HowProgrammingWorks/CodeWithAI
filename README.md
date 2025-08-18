# Code with AI

## GSID Generator Project

> **Task**: Create a Global Unique Identifier Generator (GSID)  
> **Purpose**: Explore different strategies for AI-assisted development  
> **Original Project**: [metarhia/metautil/tree/gsid-ai](https://github.com/metarhia/metautil/tree/gsid-ai)

## Overview

This project demonstrates three different approaches to AI-assisted development by implementing a Global Unique Identifier (GSID) generator. Each approach represents a different strategy for working with AI tools, from basic prompting to structured technical specifications.

## Project Structure

- [**0-Simple/**](./0-Simple/) - Simple Math.random() implementation
  - [TASKS.md](./0-Simple/TASKS.md); [REPORT.md](./0-Simple/REPORT.md); Implementation: [id.js](./0-Simple/id.js)
- [**1-Prompt/**](./1-Prompt/) - Short prompt in vibe coding style
  - [TASKS.md](./1-Prompt/TASKS.md); [REPORT.md](./1-Prompt/REPORT.md); Implementation: [gsid.js](./1-Prompt/gsid.js)
- [**2-Chat-steps/**](./2-Chat-steps) - Step-by-step chat with AI in vibe coding style
  - [TASKS.md](./2-Chat-steps/TASKS.md); [REPORT.md](./2-Chat-steps/REPORT.md); Implementation: [gsid.js](./2-Chat-steps/gsid.js)
- [**3-Tech-specs/**](./3-Tech-specs) - Technical specification implementation
  - [TASKS.md](./3-Tech-specs/TASKS.md); [REPORT.md](./3-Tech-specs/REPORT.md); Implementation: [gsid.js](./3-Tech-specs/gsid.js)
- [**4-By-example/**](./4-By-example) - Browser-compatible implementation
  - [TASKS.md](./4-By-example/TASKS.md); [REPORT.md](./4-By-example/REPORT.md); Implementation: [id.mjs](./4-By-example/id.mjs)
- [**5-Manual/**](./5-Manual/) - Manually optimized implementation (Server + Web)
  - [REPORT.md](./5-Manual/REPORT.md); Implementation: [gsid.js](./5-Manual/gsid.js) + [gsid.mjs](./5-Manual/gsid.mjs)
- [benchmark.js](./benchmark.js) - Performance comparison tool
- [README.md](./README.md) - This file

## Development Strategies

### 1. Short Prompt Approach

Basic vibe coding without deep understanding of the task or development process.

**Characteristics**:
- Minimal task description
- Limited understanding of AI-generated code quality
- Basic implementation without optimization
- Focus on quick results rather than best practices

**Human Developer Time**: ~5-10 minutes
- **Task Definition**: 2 minutes (basic prompt)
- **Code Review**: none
- **Testing**: 3 minutes (basic validation)

### 2. Step-by-Step Chat

Iterative vibe coding with desire for improvement but limited technical depth.

**Characteristics**:
- Interactive development process
- Attempts to improve implementation
- Limited understanding of code quality and optimization
- Focus on incremental improvements

**Human Developer Time**: ~20-30 minutes
- **Initial Task**: 5 minutes
- **Code Review & Refactoring**: 5 minutes (SRP violations, unnecessary methods)
- **Architecture Decisions**: 5 minutes (class structure, method removal)
- **Testing & Validation**: 5 minutes (comprehensive testing)

### 3. Technical Specification

Professional development workflow with AI as a regular team member.

**Characteristics**:
- Detailed technical specifications
- Clear requirements and constraints
- Focus on performance, security, and best practices

**Human Developer Time**: ~2-3 hours
- **Requirements Analysis**: 30 minutes (detailed specifications)
- **Technical Design**: 45 minutes (performance targets)
- **Implementation Planning**: 30 minutes (optimization strategies)
- **Testing Strategy**: 20 minutes
- **Performance Analysis**: 30 minutes

## Human Developer Time Comparison

| Approach | Time | Quality | Performance | Method | Cost |
|----------|------|---------|-------------|---------|------|
| **Short Prompt** | ~5 min | Basic | 1.25M IDs/sec | Basic AI prompt | $5-10 |
| **Step-by-Step Chat** | ~20 min | Good | 1.27M IDs/sec | Iterative AI development | $10-20 |
| **Technical Specification** | ~2 hours | Excellent | 6.04M IDs/sec | Detailed AI specifications | $150-250 |
| **Manual Optimization** | ~30 min | Excellent | 10.64M IDs/sec | Manual optimization | $25-50 |
| **Expert Traditional** | ~18 min | Excellent | 5M+ IDs/sec | Optimized implementation | $25-50 |

**Key Insights**:
- **Manual optimization** achieves the best performance (10.64M IDs/sec) with moderate time investment
- **Technical specification** provides excellent performance (6.04M IDs/sec) with significant time investment
- **Step-by-step chat** provides 4x time investment for moderate quality improvement
- **Short prompt** is fastest but produces lowest quality results
- **Time investment directly correlates with code quality and performance**

## AI vs Traditional Development Comparison

## Performance Comparison

Based on comprehensive benchmarking with Node.js 24, the implementations show significant differences:

| # | Implementation | Performance | Memory Usage | Size | Entropy | Theoretical |
|---|---------------|-------------|--------------|------|---------|-------------|
| 5 | **Manual (Web)** | **10.64M IDs/sec** | **68MB** | **24 chars** | **6.000 bits/char** | **144 bits** |
| 5 | **Manual (Server)** | 10.40M IDs/sec | 69MB | 24 chars | 6.000 bits/char | 144 bits |
| 3 | **Tech-specs** | 6.04M IDs/sec | 86MB | 24 chars | 6.000 bits/char | 144 bits |
| - | **UUID v4** | 2.16M IDs/sec | 244MB | 36 chars | 4.050 bits/char | 122 bits |
| 0 | **Simple** | 2.02M IDs/sec | 99MB | 24 chars | 4.987 bits/char | 120 bits |
| 4 | **By-example** | 1.44M IDs/sec | -118MB | 24 chars | 6.000 bits/char | 144 bits |
| 2 | **Chat-steps** | 1.27M IDs/sec | 21MB | 27 chars | 5.198 bits/char | 162 bits |
| 1 | **Prompt** | 1.25M IDs/sec | 84MB | 27 chars | 4.777 bits/char | 162 bits |

**Key Findings**: 
- **Manual optimization (Web)** produces the most efficient implementation - 10.64M IDs/sec with excellent memory efficiency (68MB)
- **Manual optimization (Server)** provides exceptional performance (10.40M IDs/sec) with excellent memory efficiency (69MB)
- **Tech-specs approach** provides excellent performance (6.04M IDs/sec) with good memory efficiency (86MB)
- **UUID v4** shows good performance (2.16M IDs/sec) but high memory usage (244MB)
- **Simple implementation** shows moderate performance (2.02M IDs/sec) with reasonable memory usage (99MB)
- **By-example implementation** provides excellent browser compatibility (1.44M IDs/sec) with perfect entropy and negative memory delta (-118MB)
- **Chat-steps implementation** shows good performance (1.27M IDs/sec) with excellent memory efficiency (21MB)
- **Prompt implementation** shows moderate performance (1.25M IDs/sec) with reasonable memory usage (84MB)
- All implementations maintain perfect collision resistance (0% collision rate)
- Node.js 24 provides native Web Crypto API support for .mjs files

## Development Tools Used

- **Cursor**: gpt-5, claude-4-sonnet, claude-3.5-sonnet, gpt-4.1, o3, gemini-2.5-pro
- **VS Code with Copilot**: gpt-4.1, claude-4-sonnet, gemini-2.5
- **ChatGPT**: gtp-5, gpt-4o, o4-mini-high, gpt-4.1, gpt-4.5

## Getting Started

1. **Clone the repository**: `git clone <repository-url>`
2. **Open folder**: `cd CodeWithAI`
3. **Install dependencies**: `npm i`
4. **Run tests**: `npm t`
5. **Run benchmark**: `node benchmark.js`

## Implementation Details

### 4-By-example (Browser-Compatible)
The browser-compatible implementation demonstrates adapting Node.js code for web environments:

- **Technology**: ES Modules with Web Crypto API
- **Key Features**: 
  - Pure Web API usage (`crypto.getRandomValues()`)
  - No Node.js dependencies
  - Cross-platform compatibility
  - Same character set and algorithm as Tech-specs
- **Performance**: 1.44M IDs/second with 0% collision rate
- **Size**: 24 characters (same as Tech-specs)
- **Usage**: 
  ```javascript
  // Browser
  import { generateID } from './id.mjs';
  const id = generateID();
  
  // Node.js (native support in v24+)
  node benchmark.js
  ```

### 5-Manual (Optimized Implementation)
The manually optimized implementation demonstrates exceptional performance through careful optimization:

- **Technology**: Node.js with optimized crypto usage + Browser-compatible ES modules
- **Key Features**: 
  - Pre-allocated buffers for maximum performance
  - Lookup table optimization with `& 0x3f` bit masking
  - Variable length support without performance degradation
  - Perfect entropy utilization (100% efficiency)
  - Cross-platform compatibility (Node.js + Browser)
  - Dual implementations: Server (Node.js) and Web (Browser)
- **Performance**: **10.64M IDs/second (Web)** - fastest implementation
- **Performance**: **10.40M IDs/second (Server)** - exceptional performance
- **Memory Usage**: **68MB (Web)** / **69MB (Server)** - excellent memory efficiency
- **Size**: 24 characters (compact and efficient)
- **Usage**: 
  ```javascript
  // Node.js (Server)
  const { generateId } = require('./5-Manual/gsid.js');
  const id = generateId();
  
  // Browser (Web)
  import { generateId } from './5-Manual/gsid.mjs';
  const id = generateId();
  ```

## Lessons Learned

- **Technical specifications** produce the most efficient and maintainable code with AI
- **Iterative development** can improve results a little but requires technical expertise
- **Basic prompting** often leads to functional but suboptimal implementations
- **Manual optimization** can achieve exceptional performance when technical expertise is applied

## License

This project is part of the original metarhia/metautil repository and follows its licensing terms.
