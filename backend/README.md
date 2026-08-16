# AI Library Management Backend

Spring Boot + PostgreSQL backend with an AI Library Assistant.

## Local setup

1. Create PostgreSQL database `librarydb`.
2. Set `OPENAI_API_KEY` in your environment.
3. Optionally set DB variables.
4. Run:

```bash
mvn spring-boot:run
```

API base URL: `http://localhost:8080/api`

AI endpoint:

```http
POST /api/ai/ask
Content-Type: application/json

{"question":"Recommend a beginner Java book"}
```

The OpenAI API key must stay on the backend and must never be placed in the React `.env` file.
