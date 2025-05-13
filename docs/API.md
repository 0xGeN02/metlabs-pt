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

---

### 3. Get User Data

**Endpoint:** `/api/user/[id]`

**Method:** `GET`

**Description:** This endpoint fetches all user data given the `user.id`.

**Query Parameters:**

```json
{
  "id": "string"
}
```

**Example cURL Command:**

```bash
curl -i -X GET "http://localhost:3010/api/user/[id]?id=<USER_ID>" \
  -H "Content-Type: application/json"
```

**Response:**

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "sex": "male" | "female",
  "nationality": "string",
  "birth_date": "YYYY-MM-DD",
  "wallet": {
    "public_key": "string",
    "balance": "number"
  },
  "created_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "updated_at": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "deleted_at": "YYYY-MM-DDTHH:mm:ss.sssZ" | null
}
```

---

### 4. Wallet Deposit

**Endpoint:** `/api/wallet/deposit`

**Method:** `POST`

**Description:** Este endpoint permite a un usuario realizar un depósito en su billetera.

**Request Body:**

```json
{
  "userId": "string",
  "amount": "number"
}
```

**Example cURL Command:**

```bash
curl -i -X POST http://localhost:3010/api/wallet/deposit \
  -H "Content-Type: application/json" \
  -d '{"userId":"<USER_ID>","amount":100}'
```

**Response:**

```json
{
  "message": "Deposit successful",
  "transactionHash": "string"
}
```

---

### 5. Wallet Withdraw

**Endpoint:** `/api/wallet/withdrown`

**Method:** `POST`

**Description:** Este endpoint permite a un usuario retirar fondos de su billetera.

**Request Body:**

```json
{
  "userId": "string"
}
```

**Example cURL Command:**

```bash
curl -i -X POST http://localhost:3010/api/wallet/withdrown \
  -H "Content-Type: application/json" \
  -d '{"userId":"<USER_ID>"}'
```

**Response:**

```json
{
  "message": "Withdrawal successful",
  "transactionHash": "string"
}
```
