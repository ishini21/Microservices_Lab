# 🧩 Microservices Lab — Item, Order & Payment System

> A containerized microservices architecture built with Node.js, Express, NGINX, and Docker Compose.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Service Ports](#service-ports)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Docker Commands](#docker-commands)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This lab demonstrates a practical microservices setup where three independent services — **Item**, **Order**, and **Payment** — communicate through a centralized **NGINX API Gateway**. Each service is independently deployable and fully containerized.

---

## Architecture

```
Client
  │
  ▼
┌─────────────────────┐
│   API Gateway        │  ← NGINX (port 8080)
│   (NGINX Reverse     │
│    Proxy)            │
└──────┬──────┬───────┘
       │      │      │
       ▼      ▼      ▼
  ┌────────┐ ┌──────────┐ ┌──────────────┐
  │  Item  │ │  Order   │ │   Payment    │
  │Service │ │ Service  │ │   Service    │
  │ :8081  │ │  :8082   │ │    :8083     │
  └────────┘ └──────────┘ └──────────────┘
```

**Routing rules:**

| Gateway Path  | Upstream Service |
|---------------|-----------------|
| `/items`      | Item Service    |
| `/orders`     | Order Service   |
| `/payments`   | Payment Service |

---

## Tech Stack

| Layer           | Technology              |
|----------------|-------------------------|
| Runtime         | Node.js                 |
| Framework       | Express.js              |
| API Gateway     | NGINX                   |
| Containerization| Docker & Docker Compose |
| API Testing     | Postman                 |

---

## Service Ports

| Service          | Port  |
|-----------------|-------|
| API Gateway      | 8080  |
| Item Service     | 8081  |
| Order Service    | 8082  |
| Payment Service  | 8083  |

> **Note:** All external traffic should go through the API Gateway on port `8080`. Direct service ports are for internal/debugging use only.

---

## Prerequisites

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) `>= 20.x`
- [Docker Compose](https://docs.docker.com/compose/install/) `>= 2.x`
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/downloads/) *(optional, for API testing)*

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
```

### 2. Build the containers

```bash
docker-compose build
```

### 3. Start all services

```bash
docker-compose up
```

All services will be available at `http://localhost:8080` via the API Gateway.

> To run in detached (background) mode:
> ```bash
> docker-compose up -d
> ```

### 4. Verify services are running

```bash
docker-compose ps
```

---

## API Reference

All requests go through the **API Gateway** at `http://localhost:8080`.

---

### 📦 Item Service — `/items`

#### Get All Items

```http
GET http://localhost:8080/items
```

**Response `200 OK`:**
```json
[
  { "id": 1, "name": "Headphones" },
  { "id": 2, "name": "Laptop" }
]
```

---

#### Create Item

```http
POST http://localhost:8080/items
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Headphones"
}
```

**Response `201 Created`:**
```json
{
  "id": 3,
  "name": "Headphones"
}
```

---

### 🛒 Order Service — `/orders`

#### Create Order

```http
POST http://localhost:8080/orders
Content-Type: application/json
```

**Request Body:**
```json
{
  "item": "Laptop",
  "quantity": 2,
  "customerId": "C001"
}
```

**Response `201 Created`:**
```json
{
  "orderId": 1,
  "item": "Laptop",
  "quantity": 2,
  "customerId": "C001",
  "status": "pending"
}
```

---

### 💳 Payment Service — `/payments`

#### Process Payment

```http
POST http://localhost:8080/payments/process
Content-Type: application/json
```

**Request Body:**
```json
{
  "orderId": 1,
  "amount": 1299.99,
  "method": "CARD"
}
```

**Response `200 OK`:**
```json
{
  "paymentId": "PAY-001",
  "orderId": 1,
  "amount": 1299.99,
  "method": "CARD",
  "status": "approved"
}
```

---

## Docker Commands

| Command                    | Description                              |
|---------------------------|------------------------------------------|
| `docker-compose build`     | Build all service images                 |
| `docker-compose up`        | Start all services (foreground)          |
| `docker-compose up -d`     | Start all services (background/detached) |
| `docker-compose down`      | Stop and remove containers               |
| `docker-compose logs`      | View logs from all services              |
| `docker-compose logs -f`   | Follow/stream live logs                  |
| `docker-compose logs <svc>`| View logs for a specific service         |
| `docker-compose ps`        | List running containers and their status |
| `docker-compose restart`   | Restart all services                     |

> **Example — view only the payment service logs:**
> ```bash
> docker-compose logs -f payment-service
> ```

---

## Project Structure

```
.
├── api-gateway/
│   └── nginx.conf          # NGINX routing configuration
├── item-service/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── order-service/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── payment-service/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

> Built for learning purposes as part of a Microservices Architecture Lab.
