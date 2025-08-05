* Authentication (JWT)
* Google & Email login
* Feedback system
* Map integration (building metadata)
* Sentiment/statistics/suggestions endpoints

---

# 📘 **Kilimani Platform API – Endpoint Documentation**

**Base URL:** `https://api.kilimani.dev/v1/`
**Authentication:** `JWT Bearer Token` in the `Authorization` header
**Response format:** `application/json`

---

## 🔐 AUTHENTICATION

---

### `POST /auth/register/`

**Description:** Register a user using email/password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "full_name": "Jane Doe"
}
```

**Response:**

```json
{
  "message": "Registration successful.",
  "token": "<JWT_TOKEN>"
}
```

---

### `POST /auth/login/`

**Description:** Log in with email/password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### `POST /auth/google/`

**Description:** Log in or register using a Google OAuth token.

**Request:**

```json
{
  "google_token": "<GOOGLE_ID_TOKEN>"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### `GET /auth/profile/`

**Header:** `Authorization: Bearer <JWT_TOKEN>`

**Response:**

```json
{
  "id": "f348…",
  "email": "user@example.com",
  "full_name": "Jane Doe",
  "is_verified": true,
  "area_of_residence": "Kilimani",
  "is_anonymous": false
}
```

---

### `POST /auth/verify-residence/`

**Description:** Submit proof of Kilimani residence.

**Request:**

```json
{
  "area_of_residence": "Kilimani",
  "document": "<Base64 encoded PDF/Image>"
}
```

---

## 🏢 BUILDINGS

---

### `GET /buildings/`

**Description:** Returns all mapped buildings with metadata.

**Response:**

```json
[
  {
    "id": "1",
    "name": "Pine Towers",
    "latitude": -1.2921,
    "longitude": 36.8219,
    "description": "Mixed-use building"
  },
  ...
]
```

---

### `GET /buildings/<id>/`

**Description:** Details for a specific building.

**Response:**

```json
{
  "id": "1",
  "name": "Pine Towers",
  "latitude": -1.2921,
  "longitude": 36.8219,
  "description": "Mixed-use building",
  "zone_type": "residential"
}
```

---

## 💬 FEEDBACK

---

### `POST /feedback/`

**Header:** `Authorization: Bearer <JWT_TOKEN>`

**Request:**

```json
{
  "building_id": "1",
  "comment": "Too noisy after 10pm.",
  "walkability_rating": 2,
  "noise_level_rating": 4,
  "is_sensitive": false
}
```

**Response:**

```json
{
  "message": "Feedback submitted."
}
```

---

### `GET /feedback/building/<id>/`

**Response:**

```json
[
  {
    "user": {
      "is_anonymous": true
    },
    "comment": "Great rooftop garden.",
    "created_at": "2025-08-03T09:00:00Z",
    "sentiment": "positive",
    "tags": ["green_space"]
  }
]
```

---

## 🧠 ANALYSIS & SENTIMENT

---

### `GET /analysis/feedback/<id>/`

**Description:** Get sentiment and themes from feedback.

**Response:**

```json
{
  "sentiment": "negative",
  "score": -0.6,
  "themes": ["noise", "nightlife"]
}
```

---

## 📊 STATISTICS

---

### `GET /statistics/overview/`

**Response:**

```json
[
  {
    "building": "Kilimani Mall",
    "walkability_avg": 3.9,
    "green_space_demand_pct": 67,
    "noise_complaints": 14
  },
  ...
]
```

---

### `GET /statistics/building/<id>/`

**Response:**

```json
{
  "building": "Pine Towers",
  "walkability_avg": 3.2,
  "noise_level_avg": 4.1,
  "sentiment_distribution": {
    "positive": 45,
    "negative": 30,
    "neutral": 25
  }
}
```

---

## 💡 SUGGESTIONS (AI-GENERATED)

---

### `GET /suggestions/building/<id>/`

**Response:**

```json
[
  {
    "id": "23",
    "type": "green_balcony",
    "reason": "70% of users requested green spaces",
    "status": "pending"
  }
]
```

---

## 🚶 WALKABILITY SIMULATOR

---

### `GET /simulation/walkability/`

**Description:** Returns calculated walkability scores for all buildings.

**Response:**

```json
[
  {
    "building": "Pine Towers",
    "score": 3.6
  },
  ...
]
```

---

## 🔐 HEADERS & AUTH USAGE

All endpoints (except login/register) require:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 📦 DATA TYPES SUMMARY

| Field                   | Type     | Description                    |
| ----------------------- | -------- | ------------------------------ |
| `id`                    | UUID/Int | Unique object identifier       |
| `name`                  | string   | Building or user name          |
| `email`                 | string   | User email                     |
| `comment`               | string   | Feedback text                  |
| `walkability_rating`    | int      | 1-5 scale                      |
| `noise_level_rating`    | int      | 1-5 scale                      |
| `latitude`, `longitude` | float    | GPS coordinates                |
| `token`                 | string   | JWT token                      |
| `score`                 | float    | Sentiment or simulation result |
| `is_verified`           | boolean  | Verified Kilimani resident     |
| `is_anonymous`          | boolean  | Hide user identity on feedback |

---