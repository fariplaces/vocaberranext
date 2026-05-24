```mermaid
erDiagram
    %% =============================================================
    %% CORE RELATIONSHIPS
    %% =============================================================
    USER ||--o{ SESSION : "mantains"
    USER ||--o{ TYPING : "performs"
    USER ||--o{ REVISION : "owns"
    USER ||--o{ TASK : "manages"
    USER ||--o{ DEFAULT_TASK : "defines"
    USER ||--o{ NOTE : "authors"
    USER ||--o{ NOTE_TEMPLATE : "customizes"

    %% =============================================================
    %% TYPING MODULE RELATIONSHIPS
    %% =============================================================
    EXERCISE_TYPE ||--o{ EXERCISE : "categorizes"
    LESSON ||--o{ EXERCISE : "contains"
    DURATION ||--o{ TYPING : "sets-limit"
    EXERCISE ||--o{ TYPING : "tested-on"

    %% =============================================================
    %% KNOWLEDGE & SPACING MODULE RELATIONSHIPS
    %% =============================================================
    SKILL ||--o{ CATEGORY : "groups"
    CATEGORY ||--o{ CATEGORY : "self-references (Parent/Children)"
    CATEGORY ||--o{ TOPIC : "structures"
    TOPIC ||--o{ REVISION : "schedules"

    %% =============================================================
    %% TABLES DEFINITIONS
    %% =============================================================
    USER {
        string id PK
        string name
        string email UK
        string password
        DateTime createdAt
    }

    SESSION {
        string id PK
        string userId FK
        DateTime expiresAt
        DateTime createdAt
    }

    TYPING {
        string id PK
        string userId FK
        string exerciseId FK
        string durationId FK
        float accuracy
        int gross
        int net
        DateTime createdAt
    }

    EXERCISE {
        string id PK
        string title
        string exerciseNo UK
        string typeId FK
        string lessonId FK
    }

    EXERCISE_TYPE {
        string id PK
        string type UK
    }

    LESSON {
        string id PK
        string lesson UK
        int order
    }

    DURATION {
        string id PK
        string duration UK
    }

    SKILL {
        string id PK
        string title
        int order
    }

    CATEGORY {
        string id PK
        string title
        int order
        string parentId FK "Self-relation"
        string skillId FK
    }

    TOPIC {
        string id PK
        string title
        string categoryId FK
        int order
    }

    REVISION {
        string id PK
        string topicId FK
        string userId FK
        DateTime scheduled
        DateTime practiced
        boolean revision1
        DateTime revision1date
        boolean revision2
        DateTime revision2date
        boolean revision3
        DateTime revision3date
        boolean revision4
        DateTime revision4date
        boolean revision5
        DateTime revision5date
    }

    TASK {
        string id PK
        string userId FK
        DateTime date
        string title
        string remarks
        boolean status
        int order
        DateTime createdAt
        DateTime updatedAt
    }

    DEFAULT_TASK {
        string id PK
        string userId FK
        string title
        string remarks
        int order
        DateTime createdAt
        DateTime updatedAt
    }

    NOTE {
        string id PK
        string title
        string content "BlockNote JSON String"
        NoteVisibility visibility "PERSONAL | GLOBAL"
        string targetId "Polymorphic matching targetType"
        NoteTargetType targetType "TOPIC | SKILL | CATEGORY | TASK"
        string shareCode UK
        string userId FK "Nullable if GLOBAL"
        DateTime createdAt
        DateTime updatedAt
    }

    NOTE_TEMPLATE {
        string id PK
        string name
        string pattern UK "Unique pair with userId"
        string content "BlockNote JSON Template"
        string userId FK "Nullable if Global Template"
        DateTime createdAt
        DateTime updatedAt
    }
    ```