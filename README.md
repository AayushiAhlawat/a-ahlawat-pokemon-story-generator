# 💡 Pokémon Story Generator

A full-stack web app that fetches Pokémon data from the [PokeAPI](https://pokeapi.co/docs/v2) and uses the [OpenAI API](https://platform.openai.com/) to generate creative stories based on a user-supplied theme.

---

## ✨ Features

### Backend (Node.js + Express)
- **GET /pokemon/:name** — Returns Pokémon name, types, abilities, and image.
- **POST /story** — Returns a creative story using OpenAI based on the provided Pokémon and theme.
- **Validation** — Input validation with Joi.
- **Caching** — In-memory cache with `node-cache` (10-minute TTL).
- **Rate Limiting** — Max 10 requests/minute.
- **Custom Logging** — Logs request method, path, status, and response time.

### Frontend (React)
- Input forms for Pokémon name and story theme.
- Buttons to fetch details and generate story.
- Error handling and result display.

### Testing
- **Jest + Supertest** backend tests for route validation and rate limiting.

---

## 📁 Project Structure
```
test-app/
├── routes/
│   ├── pokemon.js
│   └── story.js
├── middleware/
│   └── logger.js
├── __tests__/
│   └── api.test.js
├── client/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
├── .env
├── index.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone and install dependencies
```bash
git clone <repo-url>
cd test-app
npm install
```

### 2. Add your OpenAI API key
Create a `.env` file:
```
OPENAI_API_KEY=your_openai_key
PORT=3000
```

### 3. Start the backend server
```bash
npm run dev
```

### 4. Start the frontend
```bash
cd client
npm install
npm start
```
The frontend runs on `http://localhost:3001`, proxying API calls to `localhost:3000`.

---

## 📅 Usage

### From the UI:
- Enter a valid Pokémon name (e.g. `pikachu`) and click **"Click for Pokemon Details"**.
- Enter a theme (e.g. `mystical cave`) and click **"Click for Generating Pokemon Story"**.
- See the story and Pokémon info on the same page.

### Input Validations:
- Invalid names (e.g. `@@@`) return: `Invalid Pokemon name Format`
- Empty or too short theme returns: `Theme must be at least 3 characters in length`
- Rate limit exceeded: `Too many requests, please try again later.`

---

## 🔧 Run Tests

### Run backend test suite:
```bash
npm test
```
Ensure `package.json` has:
```json
"test": "jest --testPathIgnorePatterns=client/"
```

---

## 📄 Tech Stack
- **Backend:** Node.js, Express, Joi, node-cache, express-rate-limit
- **AI:** OpenAI (gpt-3.5-turbo)
- **Frontend:** React, Axios
- **Testing:** Jest, Supertest

---
