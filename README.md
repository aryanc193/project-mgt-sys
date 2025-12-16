# Mini Project Management System

## Overview
A multi-tenant project management system built with Django + GraphQL and React + Apollo.

## Design Goals
- Demonstrate clean multi-tenant data modeling without overengineering
- Keep GraphQL schema explicit and predictable (no deep nesting)
- Showcase Apollo Client cache control and optimistic UI updates
- Optimize for clarity and reviewability over feature breadth

## Features
- Organization-based data isolation
- Project and task management
- Optimistic UI updates with Apollo Client
- Clean, responsive UI using TailwindCSS

## Tech Stack
- Backend: Django, Graphene, PostgreSQL
- Frontend: React, TypeScript, Apollo Client, TailwindCSS

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Architecture Notes
- Multi-tenancy enforced at query and mutation level
- GraphQL chosen for predictable data access
- Apollo cache used instead of manual state management
  
## Key Technical Decisions

### Why GraphQL over REST
GraphQL was chosen to:
- Avoid over-fetching in nested resources (organizations → projects → tasks)
- Keep frontend data requirements explicit
- Simplify iteration without versioning endpoints

### Multi-Tenancy Strategy
- Organization is the root isolation boundary
- All project and task queries are explicitly scoped by parent ID
- No cross-organization access is possible by schema design

### Apollo Cache Strategy
- Read queries are cached per organization/project scope
- Project and task creation use manual cache updates
- Task creation demonstrates optimistic UI updates without refetching

## Trade-offs
- No authentication (out of scope)
- Minimal validation to optimize delivery time
- CSRF disabled only for GraphQL endpoint

## Future Improvements
- User authentication and permissions
- Task assignment to users
- Pagination and filtering
- Real-time updates via subscriptions
- Evolve into a reusable internal tool template for multi-tenant SaaS apps
- Introduce role-based access control at organization level
- Add audit logs for project and task changes

---
