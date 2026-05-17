# End-to-end request logging (Node.js)

Small demo: trace one HTTP request through an Express app with a **correlation ID** on every log line — without passing `req` into every function.

**Stack:** Express, Pino, `AsyncLocalStorage`

## Run

```bash
npm install
node app.js
```

Server listens on `http://localhost:3000`.

## Try it

```bash
curl -H "x-correlation-id: my-trace-123" http://localhost:3000/orders/42
```

Check `logs/app.log` — each line includes the same `correlation_id`, `method`, and `path`.

Omit the header to get a generated UUID in the response header `x-correlation-id`.

## How it works

1. **Middleware** reads or creates `x-correlation-id` and stores request context.
2. **`AsyncLocalStorage`** keeps that context for the whole async call chain.
3. **Logger** merges context into every log automatically.

| File | Role |
|------|------|
| `app.js` | Express app + sample route |
| `correlation-id.middleware.js` | Correlation ID + context setup |
| `context.js` | `AsyncLocalStorage` wrapper |
| `logger.js` | Pino logger with context |
