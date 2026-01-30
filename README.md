# Decision Journal

## Problem
Most people make decisions emotionally and never review outcomes.
This leads to repeated bad judgment.

## Solution
A private decision journal that forces:
- explicit reasoning
- confidence scoring
- outcome review after time

## Core Features
- Authenticated private journals
- Decision lifecycle (created → reviewed → outcome logged)
- Bias & confidence tracking

## Architecture
- Django + DRF (API, permissions)
- React + Vite (frontend)
- Dockerized dev environment

## Security Model
- Each decision is owned by exactly one user
- No cross-user access (enforced at query level)

## Tradeoffs
- SQLite for local dev
- JWT for simplicity over OAuth
- REST over GraphQL for clarity

## How to Run
1. cp .env.example .env
2. docker compose up
