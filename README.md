# Mini Project Management System

## Overview

A simple multi-tenant project management system built with **Django and PostgreSQL**, exposing **REST APIs** for CRUD operations, external API integration, and reporting.

The project also includes a **supplementary GraphQL API** and a React frontend from an earlier iteration, but the **primary focus of this submission is the REST API layer**, which satisfies all stated requirements.

## Approach & Context

This project was originally developed as a take-home assignment focused on clean architecture and multi-tenant data modeling. For this submission, the existing codebase was adapted to explicitly meet the stated requirements by adding RESTful CRUD APIs, a third-party API integration, and a reporting endpoint.

Rather than rewriting the system, the approach was to extend the backend in a minimal and targeted way, demonstrating the ability to evolve an existing codebase while preserving clarity and separation of concerns. GraphQL and the frontend remain in the repository as supplementary components, while the REST API layer is the primary focus for evaluation.

---

## Setup Instructions

### Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend will start at:

```
http://127.0.0.1:8000/
```

#### Environment Variables

Create a `.env` file in the `backend` directory using `.env.example` as reference.

Example:

```
DEBUG=True
SECRET_KEY=replace-me

DB_NAME=project_management
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOW_ALL_ORIGINS=True
NOTIFY_API_URL=https://httpbin.org/post
```

---

### Frontend Setup (Optional)

The frontend is **not required** for this assignment, but can be run if desired.

```
cd frontend
npm install
npm run dev
```
---

## Testing & Verification

This section describes how to verify that the application satisfies all required functionalities after setup.

---

### Verify Backend is Running
Ensure the Django development server is running:
```
python manage.py runserver
```
The backend should be available at:

```
http://127.0.0.1:8000/
```
---

### Verify REST CRUD APIs

#### Create a Task (Create)
```
curl -X POST http://127.0.0.1:8000/api/tasks/ \
  -H "Content-Type: application/json" \
  -d '{
    "project": 1,
    "title": "Test Task",
    "status": "TODO",
    "assignee_email": "test@example.com"
  }'
```
A successful response confirms:
* Database write
* REST Create operation
* Third-party API call trigger (see below)

---

#### Fetch All Tasks (Read)
```
curl http://127.0.0.1:8000/api/tasks/
```
---

#### Fetch a Single Task (Read)
```
curl http://127.0.0.1:8000/api/tasks/1/
```
---

#### Update a Task (Update)
```
curl -X PATCH http://127.0.0.1:8000/api/tasks/1/ \
  -H "Content-Type: application/json" \
  -d '{ "status": "DONE" }'
```
---

#### Delete a Task (Delete)
```
curl -X DELETE http://127.0.0.1:8000/api/tasks/1/
```
If no error is returned, the delete operation was successful.

---

### Verify Third-Party API Integration
The application integrates with an external HTTP service using **httpbin.org**.
When a task is created with an `assignee_email`, the backend sends an outbound HTTP POST request to:
```
https://httpbin.org/post
```
This call occurs during task creation and is executed from the service layer.
A successful task creation response confirms:
* Outbound HTTP request execution
* Proper request payload formatting
* No runtime errors in external API communication
No API key or external setup is required.

---

### Verify Reporting Endpoint
The reporting endpoint aggregates task data by status for a given project.
```
curl http://127.0.0.1:8000/api/projects/1/report/
```
Example response:
```
[
  { "status": "TODO", "count": 3 },
  { "status": "DONE", "count": 2 }
]
```
This confirms:
* Database querying
* Aggregation logic
* Reporting via REST API

---

### Optional: Verify via Django Admin
Create a superuser:
```
python manage.py createsuperuser
```
Access the admin panel:
```
http://127.0.0.1:8000/admin/
```
This can be used to manually inspect:
* Organizations
* Projects
* Tasks
* Task comments

---

### Optional: Verify Frontend (If Running)
If the frontend is started:
```
npm run dev
```
Access it at:
```
http://localhost:5173/
```

---

## Assignment Requirements Checklist

✔ Django application with PostgreSQL
✔ REST-based CRUD (Create, Read, Update, Delete) APIs
✔ Third-party API integration
✔ Reporting / aggregated data endpoint
✔ Clear setup and run instructions

---

## Features

* Organization-based data isolation (multi-tenancy)
* Project and task management
* RESTful CRUD APIs using Django REST Framework
* External API integration for task notifications
* Reporting endpoint for task status aggregation
* Supplementary GraphQL API (optional, frontend-oriented)

---

## Tech Stack

### Backend

* Django
* Django REST Framework
* Graphene (GraphQL)
* PostgreSQL
* requests (HTTP client)

### Frontend (Optional / Supplementary)

* React
* TypeScript
* Apollo Client
* TailwindCSS

---

## REST API & Integrations

### REST CRUD APIs

The application exposes RESTful endpoints for core entities:

* Organizations
* Projects
* Tasks

CRUD functionality is implemented using **Django REST Framework’s `ModelViewSet`**, which provides Create, Read, Update, and Delete operations out of the box via standard HTTP methods:

* POST → Create
* GET → Read
* PATCH / PUT → Update
* DELETE → Delete

Example endpoints:

```
/api/organizations/
/api/projects/
/api/tasks/
/api/tasks/<id>/
```

No custom update/delete code is required — this is handled automatically by DRF.

---

### Third-Party API Integration (Notifications)

The system demonstrates **outbound third-party API integration** via a notification service.

When a task is created with an `assignee_email`, the backend sends an HTTP request to an external API.
This logic is isolated in a **service layer** to keep business logic decoupled from external dependencies.

#### Why httpbin.org?

For demonstration purposes, the project uses **httpbin.org**, a public HTTP testing service.

* It accepts real HTTP requests
* Echoes the request payload back in the response
* Requires no API keys or credentials

This allows the integration to be tested realistically while remaining simple and dependency-free.

In a production system, this service layer could be swapped with:

* Email providers (SendGrid, SES, Mailgun)
* Notification services
* Webhooks

---

### Reporting

A simple reporting endpoint aggregates task data by status for a given project.

This demonstrates:

* Server-side aggregation
* Querying and grouping database records
* Returning structured analytical data via a REST API

Endpoint:

```
GET /api/projects/<project_id>/report/
```

Example response:

```
[
  { "status": "TODO", "count": 4 },
  { "status": "DONE", "count": 2 }
]
```

This output is suitable for dashboards, charts, or analytics pipelines.

---

## Use of GraphQL (Supplementary)

While the **primary focus of this submission is REST**, the project also includes a **GraphQL API** from an earlier iteration.

GraphQL remains available to demonstrate:

* Schema-driven data access
* Explicit query shapes
* Frontend-oriented data fetching

REST APIs are used to satisfy **CRUD, integration, and reporting requirements**, while GraphQL is supplementary and optional.

---

## Architecture Notes

* Multi-tenancy is enforced explicitly at query and mutation boundaries
* Organization is the root isolation unit
* REST APIs are designed to be stateless and consumable by external clients
* Third-party integrations are isolated in a service layer
* Reporting logic is separated from request handling

---

## Trade-offs

* No authentication or authorization (out of scope)
* Minimal validation to optimize delivery time
* CSRF disabled only for GraphQL endpoint
* UI and frontend features are non-essential to the assignment

---

## Future Improvements

* User authentication and permissions
* Role-based access control per organization
* Pagination and filtering for large datasets
* Background job processing for notifications
* Real-time updates via WebSockets or subscriptions
* Audit logs for project and task changes

---

## Final Notes

This project intentionally prioritizes:

* Clarity over feature breadth
* Correctness over completeness
* Clean separation of concerns