# Code with AI

## GSID Generator Project

> **Task**: Create a Global Unique Identifier Generator (GSID)  
> **Purpose**: Explore different strategies for AI-assisted development  
> **Original Project**: [metarhia/metautil/tree/gsid-ai](https://github.com/metarhia/metautil/tree/gsid-ai)

## Overview

This project demonstrates three different approaches to AI-assisted development by implementing a Global Unique Identifier (GSID) generator. Each approach represents a different strategy for working with AI tools, from basic prompting to structured technical specifications.

## Project Structure

- [**1-Prompt/**](./1-Prompt/) - Short prompt in vibe coding style
  - [TASKS.md](./1-Prompt/TASKS.md); [REPORT.md](./1-Prompt/REPORT.md); Implementation: [gsid.js](./1-Prompt/gsid.js)
- [**2-Chat-steps/**](./2-Chat-steps) - Step-by-step chat with AI in vibe coding style
  - [TASKS.md](./2-Chat-steps/TASKS.md); [REPORT.md](./2-Chat-steps/REPORT.md); Implementation: [gsid.js](./2-Chat-steps/gsid.js)
- [**3-Tech-specs/**](./3-Tech-specs) - Technical specification implementation
  - [TASKS.md](./3-Tech-specs/TASKS.md); [REPORT.md](./3-Tech-specs/REPORT.md); Implementation: [gsid.js](./3-Tech-specs/gsid.js)
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
| **Short Prompt** | ~5 min | Basic | 1.02M IDs/sec | Basic AI prompt | $5-10 |
| **Step-by-Step Chat** | ~20 min | Good | 1.00M IDs/sec | Iterative AI development | $10-20 |
| **Technical Specification** | ~2 hours | Excellent | 4.65M IDs/sec | Detailed AI specifications | $150-250 |
| **Expert Traditional** | ~18 min | Excellent | 5M+ IDs/sec | Optimized implementation | $25-50 |

**Key Insights**:
- **Technical specification** requires 24x more time but produces 4.6x better performance
- **Step-by-step chat** provides 4x time investment for moderate quality improvement
- **Short prompt** is fastest but produces lowest quality results
- **Time investment directly correlates with code quality and performance**

## AI vs Traditional Development Comparison

## Performance Comparison

Based on comprehensive benchmarking, the implementations show significant differences:

| Implementation | Performance | Memory Usage | Size | Entropy |
|----------------|-------------|--------------|------|---------|
| **Tech-specs** | 4.65M IDs/sec | 57MB | 24 chars | 0.177 bits/char |
| **UUID v4** | 1.93M IDs/sec | 341MB | 36 chars | 0.103 bits/char |
| **Chat-steps** | 1.00M IDs/sec | 69MB | 27 chars | 0.152 bits/char |
| **Prompt** | 1.02M IDs/sec | 71MB | 27 chars | 0.141 bits/char |

**Key Findings**: Tech-specs approach produces the most efficient implementation - 2.4x faster and 6x more memory efficient than UUID v4.

## Development Tools Used

- **Cursor**: claude-4-sonnet, claude-3.5-sonnet, gpt-4.1, o3, gemini-2.5-pro
- **VS Code with Copilot**: gpt-4.1, claude-4-sonnet, gemini-2.5
- **ChatGPT**: gpt-4o, o4-mini-high, gpt-4.1, gpt-4.5

## Getting Started

1. **Clone the repository**: `git clone <repository-url>`
2. **Open folder**: `cd CodeWithAI`
3. **Install dependencies**: `npm i`
4. **Run tests**: `npm t`
5. **Run benchmark**: `node benchmark.js`

## Lessons Learned

- **Technical specifications** produce the most efficient and maintainable code with AI
- **Iterative development** can improve results a little but requires technical expertise
- **Basic prompting** often leads to functional but suboptimal implementations

## License

This project is part of the original metarhia/metautil repository and follows its licensing terms.
