# BetterAuth Social Login with Google

## Overview

This document explains how to implement and use the social login feature with Google in the application using BetterAuth.

## Google Login Flow

### Frontend Implementation

The Google login functionality is implemented in the `LoginForm` and `RegisterForm` components.

#### Key Function: `handleGoogle`

This function is responsible for initiating the Google login process.

**Code Snippet:**

```typescript
const handleGoogle = () => {
  authClient
    .signIn.social({ provider: "google", callbackURL: "/api/auth/callback/google" })
    .then(() => {
      toast.success("¡Inicio de sesión correcto!");
    })
    .catch(() => {
      toast.error("Error al iniciar sesión con Google");
    });
};
```

**Steps:**

1. The `authClient.signIn.social` method is called with the following parameters:
   - `provider`: Specifies the social login provider, in this case, `google`.
   - `callbackURL`: The URL to which the user is redirected after successful authentication.
2. On success, a success toast message is displayed.
3. On failure, an error toast message is displayed.

### Backend Implementation

The backend handles the callback from Google and processes the authentication.

#### Endpoint: `/api/auth/{*any}`

This endpoint is configured in the `server.ts` file to handle all authentication-related routes, including social login callbacks.

**Code Snippet:**

```typescript
app.all('/api/auth/{*any}', toNodeHandler(auth));
```

**Steps:**

1. The `toNodeHandler(auth)` middleware processes the callback from Google.
2. It validates the authentication response and generates a session or token for the user.

### Example cURL Command

To simulate the Google login flow, you can use the following cURL command:

```bash
curl -i -X GET http://localhost:3010/api/auth/callback/google \
  -H "Content-Type: application/json"
```

**Note:** This command assumes that the Google login flow has been initiated and the callback URL is being hit with the appropriate parameters.

## Error Handling

- If the Google login fails, an error toast is displayed on the frontend.
- Ensure that the `authClient` is properly configured with the Google provider credentials.

## Dependencies

- `authClient`: A client library for handling authentication.
- `toast`: A library for displaying notifications.

## Conclusion

The Google social login feature provides a seamless way for users to authenticate using their Google accounts. Ensure that the `authClient` is correctly configured and the backend is set up to handle the callback properly.
