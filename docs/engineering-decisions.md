# Engineering Decisions

## Project

LeadFlow AI

---

## Decision 1

### Why Node.js + Express?

Reason

The assignment recommends Node.js, and it is well suited for handling file uploads, asynchronous I/O, and AI API integrations. Express keeps the backend lightweight and easy to maintain.

Trade-off

NestJS offers more structure but would add unnecessary complexity for the scope of this assignment.

---

## Decision 2

### Why React?

Reason

React provides a simple component-based architecture for building an interactive CSV upload and preview experience.

Trade-off

Next.js was mentioned in the assignment, but this project does not require SSR or SEO. React allows faster development while keeping the focus on the backend and AI pipeline.

---

## Decision 3

### Why temporary in-memory storage?

Reason

CSV data only needs to exist between Preview and Confirm Import. Keeping it in memory avoids unnecessary database complexity.

Production Improvement

Replace in-memory storage with Redis using TTL.

---

## Decision 4

### Why Preview before AI processing?

Reason

Users should verify the uploaded file before triggering AI processing.

Benefits

- Better UX
- Avoid unnecessary AI costs
- Matches assignment requirements

---

## Decision 5

### Why Hybrid AI Pipeline?

Reason

Instead of sending the entire CSV directly to the AI, we first detect the schema and then enhance records in batches.

Benefits

- Lower token usage
- Better consistency
- Easier debugging
- Scalable architecture

---

## Decision 6

### Why Zod Validation?

Reason

LLMs can produce malformed or unexpected JSON. Every AI response is validated before it is returned to the client.

Production Improvement

Add schema versioning and monitoring for AI output quality.