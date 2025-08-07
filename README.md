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

### 1. [Short Prompt Approach](./1-Prompt)

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

### 2. [Step-by-Step Chat](./2-Chat-steps)

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

### 3. [Technical Specification](./3-Tech-specs)

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

| Approach | Time Spent | Quality | Performance | Maintainability |
|----------|------------|---------|-------------|-----------------|
| **Short Prompt** | ~5 min | Basic | Low | Low |
| **Step-by-Step Chat** | ~20 min | Good | Medium | Medium |
| **Technical Specification** | ~2 hours | Excellent | High | High |

### ROI Analysis

| Approach | Time Investment | Performance Gain | Quality Improvement | Overall ROI |
|----------|----------------|------------------|-------------------|-------------|
| **Short Prompt** | 5 min | 1.02M IDs/sec | Basic | Low |
| **Step-by-Step Chat** | 20 min | 1.02M IDs/sec | Good | Medium |
| **Technical Specification** | 120 min | 4.66M IDs/sec | Excellent | High |

**Key Insights**:
- **Technical specification** requires 24x more time but produces 4.6x better performance
- **Step-by-step chat** provides 4x time investment for moderate quality improvement
- **Short prompt** is fastest but produces lowest quality results
- **Time investment directly correlates with code quality and performance**

## AI vs Traditional Development Comparison

| Approach | Time Spent | Performance | Quality | Developer Level | Method |
|----------|------------|-------------|---------|-----------------|---------|
| **Junior/Middle Traditional** | ~5 min | Unknown | Basic | Junior/Middle | Use npm library without reading code |
| **Short Prompt AI** | ~5 min | 1.02M IDs/sec | Basic | Any level | Basic AI prompt |
| **Step-by-Step AI** | ~20 min | 1.02M IDs/sec | Good | Any level | Iterative AI development |
| **Middle/Senior Traditional** | ~25 min | 1-2M IDs/sec | Good | Middle/Senior | Custom implementation |
| **Specification AI** | ~2 hours | 4.66M IDs/sec | Excellent | Any level | Detailed AI specifications |
| **Expert Traditional** | ~18 min | 5M+ IDs/sec | Excellent | Expert | Optimized implementation |

## Performance Comparison

Based on comprehensive benchmarking, the implementations show significant differences:

| Implementation | Performance | Memory Usage | Size | Entropy |
|----------------|-------------|--------------|------|---------|
| **Tech-specs** | 4.66M IDs/sec | 57MB | 24 chars | 0.177 bits/char |
| **UUID v4** | 1.85M IDs/sec | 342MB | 36 chars | 0.103 bits/char |
| **Chat-steps** | 1.02M IDs/sec | 69MB | 27 chars | 0.151 bits/char |
| **Prompt** | 1.02M IDs/sec | 71MB | 27 chars | 0.139 bits/char |

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
