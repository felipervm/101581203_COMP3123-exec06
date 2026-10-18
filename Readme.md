# COMP3123 Class Exercise 06 - MongoDB Notes App

**Student:** Felipe da Rocha Vieira Mattos  
**Student ID:** 101581203  
**Repository name:** `101581203_COMP3123-exec06`

RESTful Notes CRUD API using Node.js, Express, Mongoose and MongoDB Atlas.

## Setup

```bash
npm install
```

Create a `.env` file based on `.env.example`:

```env
DB_URL=your_mongodb_atlas_connection_string
PORT=8081
```

Run:

```bash
npm start
```

Base URL:

```text
http://localhost:8081
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome page |
| POST | `/api/notes` | Create note |
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:noteId` | Get note by ID |
| PUT | `/api/notes/:noteId` | Update note |
| DELETE | `/api/notes/:noteId` | Delete note |

## Sample Note Payload

```json
{
  "content": {
    "noteTitle": "Sample Note Title",
    "noteDescription": "Sample Note Description",
    "priority": "HIGH",
    "dateAdded": "18/Oct/2026",
    "dateUpdated": "18/Oct/2026"
  }
}
```

Valid priority values: `HIGH`, `MEDIUM`, `LOW`.

## Postman

Import `postman/COMP3123-exec06.postman_collection.json`.

Recommended screenshots:
1. POST create note - 201
2. GET all notes - 200
3. GET note by ID - 200
4. PUT update note - 200
5. DELETE note - 200
6. Optional validation/error test - 400 or 404

## Submission

Submit:
- `101581203_COMP3123-exec06.zip`
- Postman screenshots
- Public GitHub repository link

Do not include `node_modules` or `.env` in the ZIP.
