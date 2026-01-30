# AI Decision Journal

## Problem
Most people make important decisions emotionally and never review the outcome.
This leads to repeated mistakes and poor judgment over time.

Existing note-taking tools store decisions, but they do not:
- force explicit reasoning
- measure confidence
- close the feedback loop after outcomes are known

## Solution
AI Decision Journal is a lightweight decision-tracking system that helps users:
- write down decisions with explicit reasoning
- assign confidence levels
- review outcomes after time
- reflect on decision quality, not just results

The goal is not productivity — it is **better judgment**.

## Core Features
- Decision lifecycle: create → reflect → review
- Confidence scoring at decision time
- Outcome and lessons learned after review
- AI-assisted analysis of recent decisions
- Clean separation between frontend and backend

## Architecture
- **Backend:** Django + Django REST Framework  
  Handles data modeling, business rules, and AI analysis logic.

- **Frontend:** React + Vite  
  Responsible for user interaction and presentation.

- **Infrastructure:** Docker + docker-compose  
  Enables reproducible local development.

## Design Decisions & Tradeoffs
- No complex authentication to reduce friction for journaling
- REST API chosen over GraphQL for clarity and simplicity
- Environment-based configuration for production readiness
- Focus on correctness and clarity over feature volume

## Security & Configuration
Sensitive configuration is handled via environment variables.
A `.env.example` file is provided to document required settings.

## How to Run Locally
1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Run:
   ```bash
   docker-compose up --build
