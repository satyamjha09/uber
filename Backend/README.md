# User Registration Endpoint Documentation

## Endpoint

`POST /api/users/register`

---

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. On successful registration, it returns the user's basic information and a JWT token for authentication.

---

## Request Body

Send a JSON object with the following fields:

| Field      | Type   | Required | Description                  |
|------------|--------|----------|------------------------------|
| firstName  | String | Yes      | User's first name            |
| lastName   | String | Yes      | User's last name             |
| email      | String | Yes      | User's email address (unique)|
| password   | String | Yes      | Password (min 6 characters)  |

**Example:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "USER_ID",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "token": "JWT_TOKEN"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "First name is required",
          "param": "firstName",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```

### User Already Exists

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "User already exists"
    }
    ```

---

## Notes

- All fields are required.
- The email must be unique and valid.
- The password must be at least 6 characters long.
- On success, a JWT token is returned for authentication in future requests.