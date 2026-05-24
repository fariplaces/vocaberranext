# 🧠 Mind OS Project Documentation

Welcome to the core architectural specifications for Mind OS. This platform manages typing productivity, task tracking, hierarchical skill development, and automated spaced repetition intervals.

## Core System Architecture Map

```mermaid
flowchart TB
    %% =============================================================
    %% MODULE 1: AUTH & IDENTITY
    %% =============================================================
    subgraph Core_Module [1. Identity & Session Gate]
        direction TB
        Auth_Controller[Next.js Auth Handler]
        Users_DB[(users Table)]
        Auth_Controller -->|Verifies Hash| Users_DB
    end

    %% =============================================================
    %% MODULE 2: REVISION TRACKING ENGINE
    %% =============================================================
    subgraph Spacing_Module [2. Analytics & Spacing Engine]
        direction TB
        Revision_Manager[Spaced Repetition Coordinator]
        Revision_DB[(revision_queues Table)]
        Revision_Manager -->|Schedules Next Due Timestamp| Revision_DB
    end

    %% =============================================================
    %% MODULE 3: KNOWLEDGE MAP
    %% =============================================================
    subgraph Knowledge_Module [3. Knowledge Graph Engine]
        direction LR
        Skills_DB[(skills Table)]
        Topics_DB[(topics Table)]
        Notes_DB[(notes Table)]
        
        Skills_DB -->|1 : N| Topics_DB -->|1 : N| Notes_DB
    end

    %% =============================================================
    %% CROSS-MODULE SYSTEM INTERACTIONS
    %% =============================================================
    Users_DB ====>|Owns Data Scope| Skills_DB
    Notes_DB ====>|Triggers Spacing Event on Creation| Revision_Manager
    Revision_DB -.->|Queries Due Items| Auth_Controller