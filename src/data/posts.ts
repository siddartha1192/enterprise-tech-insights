export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

export const posts: BlogPost[] = [
  {
    id: "building-resilient-distributed-systems",
    title: "Building Resilient Distributed Systems at Scale",
    excerpt: "Exploring patterns for fault tolerance, circuit breakers, and graceful degradation in modern microservice architectures.",
    content: `When designing distributed systems that need to handle millions of requests per second, resilience isn't optional — it's foundational. In this post, I'll walk through the patterns we've adopted to build systems that fail gracefully.

## Circuit Breaker Pattern

The circuit breaker pattern prevents cascading failures by wrapping calls to external services in a monitor. When failures exceed a threshold, the circuit "opens" and requests fail fast without attempting the call.

\`\`\`typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      throw new Error('Circuit is open');
    }
    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
}
\`\`\`

## Bulkhead Isolation

By isolating components into pools, a failure in one area doesn't consume all resources. Think of it like watertight compartments in a ship.

## Retry with Exponential Backoff

Transient failures are common in distributed systems. Implementing retries with exponential backoff and jitter helps smooth out temporary issues without overwhelming downstream services.

The key takeaway: design for failure from day one. Your system will fail — the question is whether it fails gracefully.`,
    date: "2025-02-12",
    readTime: "8 min",
    tags: ["Systems Design", "Architecture"],
    featured: true,
  },
  {
    id: "rust-in-production",
    title: "Why We Chose Rust for Our Core Infrastructure",
    excerpt: "A deep dive into our decision to rewrite critical services in Rust, the challenges we faced, and the performance gains we achieved.",
    content: `After two years of running our core infrastructure in Go, we made the decision to rewrite our most critical path services in Rust. Here's why, and what we learned.

## The Problem

Our Go services were hitting GC pauses of 10-50ms under heavy load. For a real-time system processing financial transactions, this was unacceptable.

## Why Rust

Rust's ownership model gives us memory safety without garbage collection. Combined with zero-cost abstractions, we could write high-level code that compiles to optimal machine code.

## Results

- P99 latency dropped from 45ms to 3ms
- Memory usage reduced by 60%
- CPU utilization dropped by 40%

The learning curve was steep, but the investment paid off within months.`,
    date: "2025-01-28",
    readTime: "12 min",
    tags: ["Rust", "Infrastructure"],
  },
  {
    id: "zero-downtime-deployments",
    title: "Zero-Downtime Deployments: A Practical Guide",
    excerpt: "How we deploy hundreds of times per day without any user-facing downtime using blue-green deployments and feature flags.",
    content: `Deploying to production shouldn't be scary. Here's how we've built a deployment pipeline that lets us ship with confidence.`,
    date: "2025-01-15",
    readTime: "6 min",
    tags: ["DevOps", "CI/CD"],
  },
  {
    id: "type-safe-apis-with-trpc",
    title: "End-to-End Type Safety with tRPC and TypeScript",
    excerpt: "Eliminating an entire class of bugs by sharing types between your frontend and backend with zero code generation.",
    content: `Type safety across the stack changes how you build software. No more runtime type errors from API mismatches.`,
    date: "2025-01-03",
    readTime: "7 min",
    tags: ["TypeScript", "API Design"],
  },
  {
    id: "observability-at-scale",
    title: "Observability Beyond Logging: Traces, Metrics, and Beyond",
    excerpt: "Moving from reactive debugging to proactive observability with OpenTelemetry, distributed tracing, and custom metrics.",
    content: `Logs alone aren't enough. Modern systems need structured observability to understand behavior at scale.`,
    date: "2024-12-20",
    readTime: "10 min",
    tags: ["Observability", "DevOps"],
  },
  {
    id: "edge-computing-patterns",
    title: "Edge Computing Patterns for Low-Latency Applications",
    excerpt: "Bringing computation closer to users with edge functions, CDN-level logic, and globally distributed data stores.",
    content: `The edge is not just for caching anymore. Here's how we leverage edge computing for real-time personalization.`,
    date: "2024-12-08",
    readTime: "9 min",
    tags: ["Edge", "Performance"],
  },
];
