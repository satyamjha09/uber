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
- On success, a JWT token is returned for authentication in future requests.vbcv

# Backend API Documentation

---

## User Endpoints

### Register User

- **Endpoint:** `POST /api/users/register`
- **Description:** Register a new user.
- **Request Body:**
  | Field      | Type   | Required | Description                  |
  |------------|--------|----------|------------------------------|
  | firstName  | String | Yes      | User's first name            |
  | lastName   | String | Yes      | User's last name             |
  | email      | String | Yes      | User's email address (unique)|
  | password   | String | Yes      | Password (min 6 characters)  |
- **Success Response:** `201 Created`
- **Error Codes:** `400` (Validation/User exists)

### Login User

- **Endpoint:** `POST /api/users/login`
- **Description:** Login with email and password.
- **Request Body:**
  | Field    | Type   | Required | Description         |
  |----------|--------|----------|---------------------|
  | email    | String | Yes      | User's email        |
  | password | String | Yes      | User's password     |
- **Success Response:** `200 OK`
- **Error Codes:** `400` (Validation), `401` (Invalid credentials)

---

## Captain Endpoints

### Register Captain

- **Endpoint:** `POST /api/captains/register`
- **Description:** Register a new captain with vehicle and location details.
- **Request Body:**
  | Field                  | Type     | Required | Description                                 |
  |------------------------|----------|----------|---------------------------------------------|
  | firstName              | String   | Yes      | Captain's first name                        |
  | lastName               | String   | Yes      | Captain's last name                         |
  | email                  | String   | Yes      | Captain's email (unique)                    |
  | password               | String   | Yes      | Password (min 6 characters)                 |
  | vehicle.color          | String   | Yes      | Vehicle color                               |
  | vehicle.plate          | String   | Yes      | Vehicle plate (unique)                      |
  | vehicle.capacity       | Number   | Yes      | Vehicle capacity (min 1)                    |
  | vehicle.vehicleType    | String   | Yes      | "car", "bike", or "van"                     |
  | location.coordinates   | [Number] | Yes      | [longitude, latitude]                       |
- **Example:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "securePassword123",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "coordinates": [77.5946, 12.9716]
    }
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "id": "CAPTAIN_ID",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "vehicle": { /* ... */ },
      "location": { /* ... */ },
      "status": "offline"
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Codes:** `400` (Validation/Captain exists)

---

### Login Captain

- **Endpoint:** `POST /api/captains/login`
- **Description:** Login as a captain.
- **Request Body:**
  | Field    | Type   | Required | Description         |
  |----------|--------|----------|---------------------|
  | email    | String | Yes      | Captain's email     |
  | password | String | Yes      | Captain's password  |
- **Success Response:** `200 OK`
  ```json
  {
    "message": "Login successful",
    "captain": {
      "id": "CAPTAIN_ID",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "status": "offline"
    },
    "token": "JWT_TOKEN"
  }
  ```
- **Error Codes:** `400` (Validation), `401` (Invalid credentials)

---

## Captain Model

- **fullName:** `{ firstName: String, lastName: String }`
- **email:** `String` (unique, required)
- **password:** `String` (hashed)
- **status:** `"available" | "onTrip" | "offline"` (default: "offline")
- **socketId:** `String | null`
- **vehicle:** `{ color, plate, capacity, vehicleType }`
- **location:** `{ type: "Point", coordinates: [lng, lat] }`
- **Timestamps:** `createdAt`, `updatedAt`

## Captain Controller

- **registerCaptain:** Handles registration, validates input, creates captain, returns JWT.
- **loginCaptain:** Authenticates captain, returns JWT.
- **logoutCaptain:** Clears auth cookie.
- **getCaptainProfile:** Returns captain profile (requires authentication).
- **updateCaptainLocation:** Updates captain's location.
- **updateCaptainStatus:** Updates captain's status.
- **deleteCaptainAccount:** Deletes captain's account.
- **getAllCaptains:** Returns all captains (no password).

---

## Notes

- All endpoints return JWT tokens in cookies and response body.
- All sensitive fields (like password) are excluded from responses.
- All endpoints return appropriate status codes and error messages.