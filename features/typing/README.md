# ⌨️ Typing & Exercise Management Module

An enterprise-grade, metadata-driven system for managing typing practices, official typing tests, and administrative exercise assets. This architecture decouples structural layouts from domain configurations by driving UI states natively through target domains.

---

## 📋 1. Architecture Overview

The system architecture splits state mutation management into two decoupled Redux structural slices:
*   **`typingSlice`**: Responsible for managing raw database entity collections (`typings`, `exercises`, `lessons`, `durations`), maintaining infinite scroll pagination records, and setting active routing modes (`course` vs `test`).
*   **`typingFormSlice`**: A highly reusable utility slice designed to coordinate UI modal behaviors. By leveraging a string index property (**`domain`**), a single set of actions (`openManagePopup`, `closeDeletePopup`, etc.) dynamically instantiates separate isolation bubbles under `state.typingForm[domain]`.

---

## 🧩 2. Component Specifications

### 🟦 A. Module Orchestrators (`TypingPage` / `ExercisePage`)
The entry-point layout containers responsible for initializing data dependencies and tracking contextual navigation switches.
*   **Context Isolation**: Programmatically lock down the execution thread using structural domain boundaries (`FORM_DOMAINS.TYPINGS` or `FORM_DOMAINS.EXERCISES`).
*   **Lifecycle Syncing**: Synchronizes core lookup collections globally upon mounting and triggers state cache invalidations (`resetTypingState`) when switching between course exercises and official evaluation tests.
*   **Programmatic Injection**: Automates default form behaviors by appending contextual fallbacks (e.g., locking default duration profiles for regular course exercises).

### 🟩 B. List Presenters (`RenderTyping` / `RenderExercises`)
Heavy list performance containers optimized to stream large datasets via clean data abstractions.
*   **Dynamic Selectors**: Leverage memoized data selectors (`selectFilteredTypings`, `selectExerciseFormMeta`) to pull pre-filtered entity matrices based on active route criteria.
*   **Asynchronous Pagination**: Embeds intersection observers via `useInfiniteScroll` to track visibility thresholds, automatically incrementing sequential chunk collections until page limits cease (`pagination?.hasMore`).
*   **Action Remapping**: Intercepts row events and routes active records forward using single metadata payloads (`editData` / `item`), bypassing complex element tracking.

### 🟨 C. Form Captures (`ManageTypingPopup` / `ManageExercisePopup`)
Unified modal structures serving data validation and payload normalization.
*   **Unified Selector Binding**: Maps input definitions, filtered drop-down structures, and action states instantly from context-aware selectors like `selectTypingResultMeta`.
*   **Validation Closures**: Asserts logical constraints on inputs in real time (e.g., catching errors such as a net typing speed calculation exceeding a gross speed rating) before hitting API layers.
*   **Sanitation Filters**: Normalizes parameter types (`Number()`, `parseFloat()`, `.trim()`) to ensure absolute schema compliance before firing thunk instances.

### 🟥 D. Safe Removers (`DeleteTypingPopup` / `DeleteExercisePopup`)
Smart lifecycle modals built specifically around hook-ordering runtime constraints.
*   **Hook Order Integrity**: Guarantees that global hooks and conditional selector queries execute before any early operational returns (`if (!isOpen) return null;`) to avoid layout pipeline breaks.
*   **Short-Circuit Shielding**: Employs short-circuit navigation chains (`item?.exercise?.title`) to shield structural elements from presentation errors during structural state transitions.

---

## ⚙️ 3. Functionality & Lifecycle Matrices

### State Mapping Matrix
Data tracking routing relies heavily on target string mappings to direct lookups inside the common store profile:

| Target Context | Target Domain String Value | Target Redux Store Path | Active UI Action Handlers |
| :--- | :--- | :--- | :--- |
| **Typing Results** | `FORM_DOMAINS.TYPINGS` (`"typings"`) | `state.typingForm.typings` | `createTyping` / `updateTyping` / `deleteTyping` |
| **Exercise Setup** | `FORM_DOMAINS.EXERCISES` (`"exercises"`) | `state.typingForm.exercises` | `createExercise` / `updateExercise` / `deleteExercise` |

### Field Schema Validation Specifications
Primitive boundaries are strictly sanitized before dispatching to the underlying database engine:
*   `gross` / `net`: Coerced via `Number(val) || 0` (Business rule: `net` must not exceed `gross`).
*   `accuracy`: Coerced via `parseFloat(val) || 0`.
*   `title`: Trimmed via `.trim()` to strip accidental leading or trailing white-spaces.

---

## 📊 4. Module System Diagrams

### Data Flow & Component Architecture
The chart below outlines initialization routines, conditional layout tracking, hook-level attachments, and structural update cycles across layers:

```mermaid
graph TD
    %% Custom Styling
    classDef pageStyle fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef compStyle fill:#0f766e,stroke:#14b8a6,stroke-width:2px,color:#fff;
    classDef formStyle fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef storeStyle fill:#6b21a8,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef hookStyle fill:#4d7c0f,stroke:#84cc16,stroke-width:2px,color:#fff;

    %% Components & Routing Nodes
    SubRoute[/"Next.js Page Entry<br/>(Dynamic Route Layout)"/]:::pageStyle
    Page[Orchestrator Page Component]:::pageStyle
    Render[List Presentation Layer]:::compStyle
    ManagePop[Manage Form Popup]:::formStyle
    DelPop[Delete Confirmation Popup]:::formStyle
    
    %% Hooks & Store Nodes
    InfScroll[useInfiniteScroll Hook]:::hookStyle
    ReduxStore[(Redux Store Lifecycle)]:::storeStyle

    %% Lifecycle Bootstrap Flow
    SubRoute -->|Passes route context: 'course' OR 'test'| Page
    Page -->|1. Mount: Synchronize Static Lookups| ReduxStore
    Page -->|2. Pivot: Invalidate Cache & Fetch Page 1| ReduxStore
    
    %% UI Composition Connections
    Page -->|Mounts with domain: 'typings' OR 'exercises'| Render
    Page -->|Mounts with domain: 'typings' OR 'exercises'| ManagePop
    Page -->|Mounts with domain: 'typings' OR 'exercises'| DelPop

    %% Render Component Sub-flows
    Render -->|Queries Filtered Records & Pagination| ReduxStore
    Render -.->|Attaches Node Reference Block| InfScroll
    InfScroll -->|Intercepts and Requests Next Chunk| ReduxStore
    Render -->|Click Edit: openManagePopup| ReduxStore
    Render -->|Click Delete: openDeletePopup| ReduxStore

    %% Popup Visibility Routing via Selectors
    ReduxStore -.->|isOpen === true| ManagePop
    ReduxStore -.->|isOpen === true| DelPop

    %% Action Execution Workflows
    ManagePop -->|Validates Inputs & Dispatches Save Thunk| ReduxStore
    DelPop -->|Dispatches Deletion Async Thunk| ReduxStore

    %% State Modification Refresh Loop
    ReduxStore -.->|Triggers Metadata Thunk Factory Handlers| ReduxStore
    ReduxStore -.->|Pushes Clean Structural Updates| Render