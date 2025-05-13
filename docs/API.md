# API Documentation

## Endpoints

### 1. Register

**Endpoint:** `/api/auth/register`

**Method:** `POST`

**Description:** This endpoint is used to register a new user.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "nationality": "string",
  "sex": "male" | "female",
  "birth_date": "YYYY-MM-DD"
}
```

**Example cURL Command:**

```bash
curl -i -X POST http://localhost:3010/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john.doe@example.com","password":"Aa123456-","phone":"123456789","nationality":"USA","sex":"male","birth_date":"1990-01-01"}'
```

**Response:**

```json
{
  "message": "Registro exitoso",
  "user": {
    "email": "john.doe@example.com",
    "token": "<JWT_TOKEN>"
  }
}
```

---

### 2. Login

**Endpoint:** `/api/auth/sign-in/email`

**Method:** `POST`

**Description:** This endpoint is used to log in an existing user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Example cURL Command:**

```bash
curl -i -X POST http://localhost:3010/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email":"aaa@aaa.aa","password":"Aa123456789-"}'
```

**Response:**

```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "email": "aaa@aaa.aa",
    "token": "<JWT_TOKEN>"
  }
}
```
