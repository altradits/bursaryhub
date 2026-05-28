```
bursaryfund/
├── README.md                  # Project overview, setup steps, and pitch points
├── go.mod                     # Go workspace/module configuration
├── go.sum                     # Go module checksums
├── Makefile                   # Team automation shortcuts
│
├── db/                        # DATABASE STORAGE & MIGRATIONS
│   ├── schema.sql             # SQL script for Users, Students, Schools, Logs
│   └── seeds.sql              # Mock Kenyan school registry & sample students
│
├── frontend/                  # FRONTEND CLIENT APPLICATIONS
│   ├── index.html             # Main landing page & Router
│   ├── assets/
│   │   ├── css/               # Tailwind CSS styles
│   │   └── js/                # Shared frontend logic
│   ├── grantor/               # Donor Dashboard
│   │   ├── dashboard.html     
│   │   └── app.js             
│   ├── beneficiary/           # Student Mobile Portal
│   │   ├── portal.html        
│   │   └── portal.js          
│   └── institution/           # School Dashboard
│       ├── dashboard.html     
│       └── app.js             
│
├── backend/                   # GO OFF-CHAIN ORCHESTRATOR
│   ├── main.go                # Entry point (port 8080)
│   ├── middleware/            
│   │   └── auth.go            # JWT token verification
│   ├── handlers/              
│   │   ├── auth.go            # SMS OTP login
│   │   ├── session.go         # Session management
│   │   ├── roster.go          # CSV roster upload
│   │   ├── claims.go          # Payment claims
│   │   └── feemaster.go       # Fee Master CRUD
│   ├── repository/            
│   │   ├── db.go              # DB connection pool
│   │   ├── student_repo.go    # Student queries
│   │   └── school_repo.go     # Fee Master & balance queries
│   └── services/              
│       ├── mpesa.go           # M-Pesa integration
│       └── blockchain.go      # Smart contract calls
│
└── contracts/                 # SOLIDITY ON-CHAIN ENGINE
    ├── BursaryEscrow.sol      # Core escrow contract
    ├── VendorRegistry.sol     # Whitelisted schools
    ├── scripts/               # Deployment scripts
    └── test/                  # Unit tests
```

# BursaryHub - Technical Documentation

## Version 1.0 | Last Updated: 2026-05-28

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Database Design](#4-database-design)
5. [API Specification](#5-api-specification)
6. [Smart Contracts](#6-smart-contracts)
7. [Frontend Applications](#7-frontend-applications)
8. [Core Business Logic](#8-core-business-logic)
9. [Installation & Deployment](#9-installation--deployment)
10. [Testing Strategy](#10-testing-strategy)
11. [Environment Variables](#11-environment-variables)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Project Overview

### 1.1 What is BursaryHub?

BursaryHub is a **free, fraud-proof scholarship disbursement platform** that connects donors, schools, and students on a single transparent system.

### 1.2 Core Principles

| Principle | Description |
|-----------|-------------|
| **Zero Subscription** | Platform is free for all users |
| **1% Success Fee** | Fee taken only when money moves |
| **Three-Way Verification** | Student + School + Fee Master must match |
| **Full Transparency** | All costs visible before deposit |
| **Auto-Balancing** | No manual fee calculations |

### 1.3 Key Metrics

| Metric | Target |
|--------|--------|
| Disbursement Time | < 60 seconds |
| Fraud Incidents | 0 |
| Platform Uptime | 99.9% |
| Donor Cost Visibility | 100% upfront |

---

## 2. System Architecture

### 2.1 High-Level Architecture


### 2.2 Data Flow
Donor Deposit (Any Currency)
↓
Conversion to USDT (Fee #1)
↓
USDT Locked in Smart Contract Escrow
↓
School Updates Fee Master → Auto Balance Calculation
↓
School Creates Payment Claim
↓
Student Keys Balance + Approves with OTP
↓
Three-Way Verification (Student vs School vs Fee Master)
↓
USDT → KSH Conversion (Fee #2)
↓
1% Platform Fee Deducted (Fee #3)
↓
School Receives KSH in Bank Account
↓
All Costs Visible on Donor Dashboard


---

## 3. Technology Stack

### 3.1 Backend

| Component | Technology | Version |
|-----------|------------|---------|
| Language | Go | 1.21+ |
| HTTP Router | Gorilla Mux | v1.8.1 |
| Database Driver | lib/pq | v1.10.9 |
| Auth | JWT (golang-jwt) | v5.0.0 |
| Blockchain | go-ethereum | v1.13.0 |

### 3.2 Database

| Component | Technology |
|-----------|------------|
| Database | PostgreSQL 15+ |
| Migration | Raw SQL |
| Connection Pool | sql.DB (built-in) |

### 3.3 Frontend

| Component | Technology |
|-----------|------------|
| Styling | Tailwind CSS |
| HTTP Requests | Fetch API (native) |
| PWA | Service Workers |
| Charts | Chart.js |

### 3.4 Blockchain

| Component | Technology |
|-----------|------------|
| Smart Contracts | Solidity 0.8.19 |
| Network | Polygon / Celo |
| Test Environment | Hardhat |
| Token | USDT (ERC-20) |

### 3.5 External Services

| Service | Purpose |
|---------|---------|
| Twilio / Africa's Talking | SMS OTP |
| M-Pesa API | Fiat on/off ramp |
| Chainlink | ERP Oracles |
| Infura | Blockchain RPC |

---

## 4. Database Design

### 4.1 Entity Relationship Diagram
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ users │ │ donors │ │scholarships │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ id (PK) │◄────│ user_id (FK)│ │ id (PK) │
│ email │ │ org_name │ │ donor_id(FK)│
│ phone │ │ kyc_status │ │ title │
│ role │ │ total_donated│ │ coverage_type│
└──────┬──────┘ └─────────────┘ └──────┬──────┘
│ │
▼ ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ schools │ │ students │ │applications │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ id (PK) │ │ id (PK) │ │ id (PK) │
│ user_id (FK)│ │ user_id (FK)│ │scholarship_id│
│ school_name │ │ school_id(FK)│ │ student_id │
│ wallet_addr │ │ reg_number │ │ status │
└──────┬──────┘ │ course │ └─────────────┘
│ │ year_of_study│
▼ └──────┬──────┘
┌─────────────┐ │
│ fee_master │ ▼
├─────────────┤ ┌─────────────┐
│ id (PK) │ │student_bal │
│ school_id │ ├─────────────┤
│ academic_year│ │ id (PK) │
│ course │ │ student_id │
│ tuition │ │ balance │
└─────────────┘ └─────────────┘


### 4.2 Complete Schema

```sql
-- ENUM TYPES
CREATE TYPE user_role AS ENUM ('donor', 'school_admin', 'student', 'admin');
CREATE TYPE coverage_type AS ENUM ('tuition', 'accommodation', 'food', 'transport', 'all', 'unrestricted');
CREATE TYPE disbursement_status AS ENUM ('pending', 'verified', 'completed', 'failed', 'blocked');

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    national_id VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_whitelisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DONORS TABLE
CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    organization_name VARCHAR(255),
    tax_id VARCHAR(100),
    kyc_status VARCHAR(50) DEFAULT 'pending',
    total_donated_usd DECIMAL(20,2) DEFAULT 0
);

-- SCHOOLS TABLE
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    ministry_verified BOOLEAN DEFAULT FALSE,
    bank_account_number VARCHAR(100),
    wallet_address VARCHAR(255) UNIQUE,
    is_whitelisted BOOLEAN DEFAULT FALSE
);

-- STUDENTS TABLE
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id),
    student_reg_number VARCHAR(100) UNIQUE NOT NULL,
    course VARCHAR(255),
    year_of_study INTEGER,
    county VARCHAR(100),
    gpa DECIMAL(3,2)
);

-- FEE MASTER TABLE
CREATE TABLE fee_master (
    id SERIAL PRIMARY KEY,
    school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
    academic_year VARCHAR(20) NOT NULL,
    course VARCHAR(255),
    year_of_study INTEGER,
    tuition_amount DECIMAL(15,2) DEFAULT 0,
    accommodation_amount DECIMAL(15,2) DEFAULT 0,
    food_amount DECIMAL(15,2) DEFAULT 0,
    transport_amount DECIMAL(15,2) DEFAULT 0,
    UNIQUE(school_id, academic_year, course, year_of_study)
);

-- STUDENT BALANCES TABLE
CREATE TABLE student_balances (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    academic_year VARCHAR(20),
    coverage_type coverage_type NOT NULL,
    original_fee DECIMAL(15,2) NOT NULL,
    amount_paid DECIMAL(15,2) DEFAULT 0,
    balance_remaining DECIMAL(15,2) NOT NULL
);

-- SCHOLARSHIPS TABLE
CREATE TABLE scholarships (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    coverage_type coverage_type NOT NULL,
    max_amount_per_student DECIMAL(15,2),
    number_of_slots INTEGER,
    eligible_courses TEXT[],
    eligible_years INTEGER[],
    min_gpa DECIMAL(3,2),
    is_active BOOLEAN DEFAULT TRUE
);

-- DISBURSEMENTS TABLE
CREATE TABLE disbursements (
    id SERIAL PRIMARY KEY,
    scholarship_id INTEGER REFERENCES scholarships(id),
    student_id INTEGER REFERENCES students(id),
    school_id INTEGER REFERENCES schools(id),
    amount_usdt DECIMAL(20,8) NOT NULL,
    amount_ksh DECIMAL(15,2) NOT NULL,
    status disbursement_status DEFAULT 'pending',
    transaction_hash VARCHAR(255),
    three_way_match_status VARCHAR(50) DEFAULT 'pending'
);

-- THREE-WAY VERIFICATION LOGS
CREATE TABLE three_way_verification (
    id SERIAL PRIMARY KEY,
    disbursement_id INTEGER REFERENCES disbursements(id),
    student_entered_amount DECIMAL(15,2),
    school_keyed_amount DECIMAL(15,2),
    fee_master_amount DECIMAL(15,2),
    match_result BOOLEAN,
    mismatch_reason TEXT
);

-- TRANSACTION FEES LOG
CREATE TABLE transaction_fees (
    id SERIAL PRIMARY KEY,
    disbursement_id INTEGER REFERENCES disbursements(id),
    conversion_in_fee_usd DECIMAL(10,4),
    network_gas_fee_usd DECIMAL(10,4),
    conversion_out_fee_ksh DECIMAL(10,2),
    withdrawal_fee_ksh DECIMAL(10,2),
    platform_fee_ksh DECIMAL(10,2)
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_fee_master_school_year ON fee_master(school_id, academic_year);
CREATE INDEX idx_disbursements_status ON disbursements(status);



5.3 Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/login	Request OTP
POST	/auth/verify-otp	Verify OTP, receive JWT
Donor Endpoints
Method	Endpoint	Description
POST	/donor/scholarships	Create scholarship
GET	/donor/scholarships/{id}/applications	View applications
POST	/donor/scholarships/{id}/applications/{appId}/approve	Approve student
GET	/donor/disbursements	View all disbursements
GET	/donor/impact-report	Generate impact report
GET	/donor/cost-breakdown/{amount}	Preview all fees
School Endpoints
Method	Endpoint	Description
POST	/school/fee-master	Publish fee master
POST	/school/fee-master/bulk-update	Bulk update by course/year
PUT	/school/students/{studentId}/balance	Update specific student balance
POST	/school/claims	Create payment claim
POST	/school/roster/upload	Upload CSV roster
POST	/school/three-way-verify	Submit school verification
Student Endpoints
Method	Endpoint	Description
GET	/student/scholarships	Get available scholarships
POST	/student/scholarships/{id}/apply	Apply for scholarship
GET	/student/balance	Get current balance
POST	/student/three-way-verify	Submit student key-in
POST	/student/claims/{claimId}/approve	Approve with OTP
POST	/student/claims/{claimId}/request-otp	Request SMS OTP
Admin Endpoints
Method	Endpoint	Description
POST	/admin/schools/{id}/whitelist	Whitelist school
POST	/admin/donors/{id}/kyc	Approve donor KYC
GET	/admin/mismatches	Get all mismatches
POST	/admin/mismatches/{id}/resolve	Resolve mismatch


5.4 Request/Response Examples
Create Scholarship (Donor)
Request:

json
POST /api/donor/scholarships
{
    "title": "Tech Scholars 2024",
    "coverage_type": "tuition",
    "max_amount_per_student": 55000,
    "number_of_slots": 50,
    "eligible_courses": ["Computer Science", "IT"],
    "eligible_years": [1, 2],
    "min_gpa": 3.5
}
Response:

json
{
    "scholarship_id": 101,
    "status": "created",
    "matching_students": 47
}
Bulk Update Fee Master (School)
Request:

json
POST /api/school/fee-master/bulk-update
{
    "school_id": 1,
    "academic_year": "2024-2025",
    "course": "Computer Science",
    "year_of_study": 1,
    "new_tuition": 60000
}
Response:

json
{
    "success": true,
    "students_updated": 47,
    "formula": "New Balance = New Fee - Total Paid + Previous Unpaid",
    "preview": [
        {
            "student": "John Doe",
            "old_balance": 50000,
            "paid_to_date": 0,
            "new_balance": 60000
        },
        {
            "student": "Jane Smith",
            "old_balance": 30000,
            "paid_to_date": 20000,
            "new_balance": 40000
        }
    ]
}
Three-Way Verification (Student)
Request:

json
POST /api/student/three-way-verify
{
    "disbursement_id": 501,
    "entered_amount": 55000,
    "upload_url": "https://..."
}
Response:

json
{
    "match": true,
    "student_amount": 55000,
    "school_amount": 55000,
    "fee_master_amount": 55000,
    "status": "verified"
}
Get Cost Breakdown (Donor)
Request:

json
GET /api/donor/cost-breakdown?amount=10000&currency=USD
Response:

json
{
    "donor_deposit": 10000,
    "conversion_to_usdt": 15.00,
    "network_gas_fee": 2.00,
    "usdt_locked": 9983.00,
    "when_disbursed": {
        "usdt_amount": 9983,
        "conversion_to_ksh": 500,
        "withdrawal_fee": 100,
        "platform_fee_1_percent": 99.83,
        "school_receives_ksh": 9283.17
    },
    "total_fees_usd": 17.00,
    "total_fees_ksh": 699.83
}
6. Smart Contracts
6.1 Contract Addresses (Testnet)
Contract	Address
USDT (Mock)	0x...
BursaryEscrow	0x...
6.2 BursaryEscrow.sol
solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BursaryEscrow is Ownable, ReentrancyGuard {
    IERC20 public usdt;
    
    struct Disbursement {
        uint256 amount;
        address student;
        address school;
        bool completed;
        uint256 timestamp;
    }
    
    mapping(uint256 => Disbursement) public disbursements;
    mapping(address => bool) public whitelistedSchools;
    mapping(address => bool) public whitelistedDonors;
    
    uint256 public platformFeeBps = 100; // 1% = 100 basis points
    address public feeCollector;
    
    event FundsDeposited(address donor, uint256 amount, uint256 scholarshipId);
    event DisbursementExecuted(uint256 disbursementId, address school, uint256 amountUSDT, uint256 amountKSH);
    event FeeCollected(uint256 amount, uint256 fee);
    
    constructor(address _usdt) {
        usdt = IERC20(_usdt);
        feeCollector = msg.sender;
    }
    
    function deposit(uint256 scholarshipId, uint256 amount) external nonReentrant {
        require(whitelistedDonors[msg.sender], "Not whitelisted");
        require(usdt.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit FundsDeposited(msg.sender, amount, scholarshipId);
    }
    
    function executeDisbursement(
        uint256 disbursementId,
        address school,
        uint256 amountUSDT,
        bytes32 threeWayMatchHash
    ) external onlyOwner nonReentrant {
        require(whitelistedSchools[school], "School not whitelisted");
        require(!disbursements[disbursementId].completed, "Already completed");
        
        uint256 fee = (amountUSDT * platformFeeBps) / 10000;
        uint256 amountToSchool = amountUSDT - fee;
        
        require(usdt.transfer(feeCollector, fee), "Fee transfer failed");
        require(usdt.transfer(school, amountToSchool), "School transfer failed");
        
        disbursements[disbursementId] = Disbursement({
            amount: amountToSchool,
            student: address(0),
            school: school,
            completed: true,
            timestamp: block.timestamp
        });
        
        emit DisbursementExecuted(disbursementId, school, amountToSchool, amountToSchool);
        emit FeeCollected(amountUSDT, fee);
    }
    
    // Soulbound: Prevent direct token transfers
    function transfer(address, uint256) external pure returns (bool) {
        revert("BursaryFund: Tokens are Soulbound");
    }
    
    function setWhitelistedSchool(address school, bool status) external onlyOwner {
        whitelistedSchools[school] = status;
    }
    
    function setWhitelistedDonor(address donor, bool status) external onlyOwner {
        whitelistedDonors[donor] = status;
    }
}
```

========================================================================================

# 🌍 BursaryHub Landing Page — Complete Feature Outline


=======================================================================================

---

# 📌 Page Purpose

The landing page is the first page a visitor sees when going to:

```text
bursaryhub.com
```

Its purpose is to:

- Explain what BursaryHub does
- Show who the platform is for
- Build trust and credibility
- Provide login & sign-up access for:
  - Donors
  - Schools
  - Students

---

# 🧭 Section 1: Top Navigation Bar

Fixed at the top of the page and visible on all screen sizes.

---

## Navigation Elements

| Element | What It Shows / Does |
|---|---|
| 🟢 Logo | "BursaryHub" logo or text |
| 🔐 Login Button | Dropdown with Donor, School & Student login |
| 📝 Sign Up Button | Dropdown with Donor, School & Student sign up |
| ☰ Mobile Menu Icon | Opens mobile navigation drawer |

---

## Navigation Preview

```text
┌────────────────────────────────────────────────────────────┐
│ [BURSARYHUB]     [Login ▼] [Sign Up ▼] [☰ Mobile Menu]  │
└────────────────────────────────────────────────────────────┘
```

---

# 🚀 Section 2: Hero Section

The first major section users see after loading the page.

---

## Hero Elements

| Element | What It Shows |
|---|---|
| Headline | Free, Fraud-Proof Scholarship Disbursement for Kenya |
| Subheadline | Money moves only after all parties confirm the same amount |
| Primary Button | Get Started as a Donor |
| Secondary Button | Learn How It Works |
| Hero Illustration | Donor → School → Verification Shield graphic |

---

## Hero Preview

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Free, Fraud-Proof Scholarship Disbursement for Kenya       │
│                                                              │
│  Money moves from donors to schools only when the student,  │
│  school, and fee master all confirm the same amount.        │
│                                                              │
│      [ Get Started as a Donor ]                             │
│      [ Learn How It Works ]                                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 🛡️ Section 3: Trust Badges

A row of trust indicators below the hero section.

---

## Trust Badges

| Badge | What It Shows |
|---|---|
| 🆓 Badge 1 | Free for Schools & Students |
| 💯 Badge 2 | 1% Fee Only on Success |
| 🔗 Badge 3 | Blockchain Secured |
| 📲 Badge 4 | Works with M-Pesa |

---

## Badge Preview

```text
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Free for    │ │ 1% Fee Only │ │ Blockchain  │ │ M-Pesa      │
│ Schools &   │ │ on Success  │ │ Secured     │ │ Compatible  │
│ Students    │ │             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

---

# ⚠️ Section 4: The Problem Section

Explains the problem BursaryHub solves.

---

## Problem Section Elements

| Element | What It Shows |
|---|---|
| Section Label | The Problem |
| Headline | Billions of shillings never reach students |
| Stat Card 1 | 20–30% lost to fraud & leakage |
| Stat Card 2 | 7–14 day transfer delays |
| Stat Card 3 | 0 visibility for donors |
| Description | Traditional bursary systems are unreliable |

---

## Problem Section Preview

```text
┌────────────────────────────────────────────────────────────┐
│ THE PROBLEM                                               │
│                                                            │
│ Billions of shillings in scholarship funds never reach     │
│ students.                                                  │
│                                                            │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│ │ 20-30%   │ │ 7-14     │ │ 0        │                    │
│ │ leakage  │ │ day bank │ │ visibility│                   │
│ │ & fraud  │ │ delays   │ │ for donors│                   │
│ └──────────┘ └──────────┘ └──────────┘                    │
└────────────────────────────────────────────────────────────┘
```

---

# ⚙️ Section 5: How It Works (3 Steps)

A three-step flow explaining the platform process.

---

## Steps Table

| Step | Title | Description | Icon |
|---|---|---|---|
| 1 | Donor Creates Scholarship | Donor defines eligibility & deposits funds | 👛 Wallet |
| 2 | Three-Way Verification | Student, school & fee master confirm amount | ✅ Checkmark |
| 3 | Instant Disbursement | OTP approval sends money instantly | ⚡ Lightning |

---

## Workflow Preview

```text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 1. Donor    │ ──→ │ 2. Three-   │ ──→ │ 3. Instant  │
│ Creates     │     │ Way         │     │ Disbursement│
│ Scholarship │     │ Verification│     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

# 👥 Section 6: Who It Is For

Three cards targeting each user type.

---

## User Cards

| Card | Description | Button |
|---|---|---|
| 🎁 For Donors | Create scholarships & track impact | Donor Login |
| 🏫 For Schools | Publish fee master & get paid instantly | School Login |
| 👨‍🎓 For Students | Apply for scholarships & approve via OTP | Student Login |

---

## Cards Preview

```text
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ FOR DONORS  │ │ FOR SCHOOLS │ │FOR STUDENTS │
│ [ Login ]   │ │ [ Login ]   │ │ [ Login ]   │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

# ✨ Section 7: Key Features

A responsive feature grid.

---

## Features Table

| Feature | Description |
|---|---|
| Three-Way Verification | All parties must match |
| Auto-Balance Calculation | Automated balance formula |
| Free for Schools & Students | No hidden charges |
| 1% Success Fee | Paid only on successful disbursement |
| SMS OTP Approval | No smartphone required |
| Real-Time Dashboard | Live tracking of disbursements |
| M-Pesa Compatible | Integrated with mobile money |
| Blockchain Secured | Transparent public verification |

---

## Features Preview

```text
[3-Way Verify] [Auto Balance] [Free] [1% Fee]
[SMS OTP] [Dashboard] [M-Pesa] [Blockchain]
```

---

# 💸 Section 8: Cost Transparency Example

Shows donors exactly how fees are calculated.

---

## Example Breakdown

```text
Deposit:                $10,000
Conversion Fee:         $15
Gas Fee:                $2
USDT Locked:            $9,983

When Disbursed:
- Platform Fee:         1%
- Conversion to KSH:    1%
- Withdrawal Fee:       100 KSH

School Receives:
53,800 KSH
```

---

## Transparency Footnote

```text
All costs shown before you deposit.
No surprises.
```

---

# 💬 Section 9: Testimonials

Quotes from donors, schools, and students.

---

## Testimonials

### 🏢 Donor

> "We've reduced our bursary leakage from 25% to 0%. Every shilling is accounted for."

— Safaricom Foundation

---

### 🏫 School

> "The auto-balance feature saved our finance team hours of manual calculation."

— University Finance Office

---

### 👨‍🎓 Student

> "I got notified of a scholarship, applied, and received funding within a week."

— Student Beneficiary

---

# ❓ Section 10: FAQ Section

Accordion-style expandable questions.

---

## FAQ Examples

### ▼ Is BursaryHub free for schools and students?

Yes. Schools and students pay nothing.

---

### ▼ How does three-way verification work?

Student + School + Fee Master must all match.

---

### ▼ What if amounts don't match?

The system blocks payment until resolved.

---

### ▼ Do students need smartphones?

No. SMS OTP works on any phone.

---

### ▼ How long does disbursement take?

Less than 60 seconds after approval.

---

### ▼ Is BursaryHub compliant?

Yes. Includes KYC, AML & school verification.

---

# 📢 Section 11: Call to Action

The final conversion section before the footer.

---

## CTA Elements

| Element | What It Shows |
|---|---|
| Headline | Ready to eliminate bursary fraud? |
| Subheadline | Join trusted donors, schools & students |
| Primary Button | Get Started as a Donor |
| Secondary Button | Register Your School |

---

## CTA Preview

```text
┌──────────────────────────────────────────────────────────┐
│ Ready to eliminate bursary fraud?                       │
│                                                          │
│ Join donors, schools, and students who trust            │
│ BursaryHub.                                             │
│                                                          │
│ [ Get Started as a Donor ]                              │
│ [ Register Your School ]                                │
└──────────────────────────────────────────────────────────┘
```

---

# 📄 Section 12: Footer

Contains navigation, legal, and social links.

---

## Footer Columns

| Column | Links |
|---|---|
| Product | How It Works, Pricing, Donors, Schools |
| Company | About Us, Blog, Contact |
| Legal | Privacy Policy, Terms, AML/KYC |
| Social | Twitter, LinkedIn, Email |

---

## Footer Preview

```text
┌──────────────────────────────────────────────────────────┐
│ Product │ Company │ Legal │ Social                     │
│                                                          │
│ © 2026 BursaryHub. All rights reserved.                 │
└──────────────────────────────────────────────────────────┘
```

---

# 🖥️ Visual Hierarchy (Full Page Layout)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ [BURSARYHUB] [Login ▼] [Sign Up ▼] [☰]                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ TRUST BADGES                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ THE PROBLEM                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ WHO IT IS FOR                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ KEY FEATURES                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ COST TRANSPARENCY                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ TESTIMONIALS                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ FAQ                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ CALL TO ACTION                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 📱 Mobile Responsive Behavior

| Screen Size | Behavior |
|---|---|
| Desktop (>1024px) | Full layout with 3-column features |
| Tablet (768–1024px) | 2-column feature grid |
| Mobile (<768px) | Stacked layout with hamburger menu |

---

# ✅ Summary of Landing Page Actions

| Action | Where It Happens |
|---|---|
| Login as donor | Navigation → Login |
| Login as school | Navigation → Login |
| Login as student | Navigation → Login |
| Sign up as donor | Navigation → Sign Up |
| Sign up as school | Navigation → Sign Up |
| Sign up as student | Navigation → Sign Up |
| Learn how it works | Hero → Learn How It Works |
| View FAQ | FAQ Section |
| Contact via social | Footer |
| View legal policies | Footer |

---

# 🎯 Core Landing Page Goal

The landing page is designed to:

- Build trust
- Explain the system quickly
- Convert visitors into users
- Reduce confusion
- Demonstrate transparency
- Showcase fraud prevention
- Drive donor onboarding

---



======================================================================























===========================================================================================

SCHOOL


=========================================================================================

# School Dashboard — Complete Feature Outline

## Dashboard Layout Overview

The school dashboard is designed for:

- 💻 Desktop computers
- 📱 Tablets
- 🧾 Administrative workflows
- 📊 Large-scale student management

Information is organized into **expandable panels** allowing school administrators to:

- Manage fee structures
- Verify student balances
- Create payment claims
- Track disbursements
- Manage school banking details
- Monitor scholarship activity

---

# 🏫 Section 1: Header

Displayed at the top of the dashboard.

---

## Header Elements

| Element | What It Shows |
|---|---|
| 🏫 School Name | Institution name |
| 🆔 Registration Number | Ministry of Education registration number |
| ✅ Whitelist Status | Verified or Pending Approval |
| 🔔 Notification Bell | Alerts & system notifications |
| 👤 Profile Icon | Account settings & logout |

---

## Example Header

```text
┌──────────────────────────────────────────────────────────┐
│ BURSARYHUB | SCHOOL DASHBOARD            [🔔] [▼ Profile]│
│ University of Nairobi                                 │
│ Registration: EDU-KE-2026-001                        │
│ Status: ✅ VERIFIED                                   │
└──────────────────────────────────────────────────────────┘
```

---

# 📊 Section 2: Summary Statistics Cards

Four summary cards displaying school-wide metrics.

---

## Statistics Cards

| Card | What It Shows |
|---|---|
| 👨‍🎓 Total Students | Total enrolled students |
| ⏳ Pending Disbursements | Claims awaiting approval |
| ✅ Completed Disbursements | Total paid to school |
| 🎓 Active Scholarships | Scholarships matching students |

---

## Example Cards

```text
┌────────────────────┐
│ 👨‍🎓 3,450          │
│ Total Students     │
└────────────────────┘

┌────────────────────┐
│ ⏳ 1,280,000 KSH   │
│ Pending Claims     │
└────────────────────┘

┌────────────────────┐
│ ✅ 4,200,000 KSH   │
│ Completed Payments │
└────────────────────┘

┌────────────────────┐
│ 🎓 12              │
│ Active Scholarships│
└────────────────────┘
```

> 🔄 All cards update automatically when system data changes.

---

# 💰 Section 3: Fee Master Management Panel

The primary area for publishing and updating fee structures.

---

# 📚 Fee Structure Controls

## Selectors

| Element | Purpose |
|---|---|
| Academic Year Selector | Choose academic period |
| Course Selector | Choose course/program |
| Year Selector | Select study year |

---

## Example Selectors

```text
Academic Year: [2025-2026 ▼]
Course: [Computer Science ▼]
Year: [1st Year ▼]
```

---

# 🧾 Fee Input Fields

| Field | Input Type |
|---|---|
| Tuition Amount | Number input |
| Accommodation Amount | Number input |
| Food Amount | Number input |
| Transport Amount | Number input |

---

## Example Fee Inputs

```text
Tuition:       [55,000]
Accommodation: [25,000]
Food:          [15,000]
Transport:     [5,000]
```

---

# ⚙️ Fee Master Actions

| Button | What It Does |
|---|---|
| Save Fee Master | Publishes fee structure |
| Bulk Update | Updates many students |
| Upload CSV | Imports spreadsheet data |

---

## Example Buttons

```text
[ BULK UPDATE ]
[ UPLOAD CSV ]
[ SAVE FEE MASTER ]
```

---

## Success Message

```text
✅ Fee master saved.
47 students affected.
```

---

# 🔄 Section 4: Auto-Balance Preview Table

Appears when fee changes are previewed before applying.

---

# 📐 Auto-Balance Formula

The system automatically calculates:

```text
New Balance =
Previous Unpaid + (New Fee - Paid to Date)
```

---

# 📊 Preview Table Structure

| Column | What It Shows |
|---|---|
| Student Name | Full student name |
| Registration Number | School registration ID |
| Old Balance | Existing balance |
| Paid to Date | Amount already paid |
| Previous Unpaid | Carried-over balance |
| New Balance (Auto) | Newly calculated balance |

---

## Example Preview Table

| Student | Old Balance | Paid | Previous Unpaid | New Balance |
|---|---|---|---|---|
| John Doe | 50,000 | 0 | 0 | 55,000 |
| Mary Smith | 30,000 | 20,000 | 0 | 35,000 |
| Peter Kim | 50,000 | 50,000 | 0 | 0 |
| Ann Mwangi | 50,000 | 40,000 | 10,000 | 20,000 |

---

# 🔘 Preview Actions

```text
[ APPLY TO ALL STUDENTS ]
[ CANCEL ]
```

---

# 👨‍🎓 Section 5: Student Balance Management Table

A searchable and filterable student balance table.

---

# 📋 Table Structure

| Column | What It Shows |
|---|---|
| Student Name | Full name |
| Reg Number | Registration number |
| Course | Course/program |
| Year | Study year |
| Tuition Balance | Remaining tuition |
| Accommodation Balance | Remaining accommodation |
| Food Balance | Remaining food fees |
| Transport Balance | Remaining transport fees |
| Total Balance | Combined total |
| Action Button | Edit |

---

## Example Table

| Name | Reg No | Course | Year | Tuition | Total | Action |
|---|---|---|---|---|---|---|
| John Doe | CS001 | CS | 1 | 55,000 | 55K | Edit |

---

# 🔍 Table Controls

| Control | What It Does |
|---|---|
| Search Box | Filter by name or reg number |
| Course Filter | Filter by course |
| Year Filter | Filter by study year |
| Export CSV | Download current table |

---

## Controls Preview

```text
[ Search Student ]
[ Course ▼ ]
[ Year ▼ ]
[ EXPORT CSV ]
```

---

# ✏️ Edit Student Modal

Opened when clicking **Edit** on a student row.

---

## Modal Fields

| Element | Purpose |
|---|---|
| Student Name | Display only |
| Coverage Type Selector | Choose fee category |
| New Balance Field | Set updated balance |
| Reason Field | Explain adjustment |
| Save Button | Apply update |
| Cancel Button | Close modal |

---

## Example Modal

```text
Student: John Doe

Coverage Type: [Tuition ▼]

New Balance: [35,000]

Reason:
[Partial payment of 20,000 received]

[ SAVE ]
[ CANCEL ]
```

---

# ✅ Section 6: Three-Way Verification Panel

Used by the school to submit their side of payment verification.

---

# 🔍 Verification Workflow

The system compares:

1. Student-submitted amount
2. School-submitted amount
3. Fee master amount

All three must match.

---

## Verification Controls

| Element | Purpose |
|---|---|
| Student Search Box | Find student |
| Load Student Button | Load student details |
| Key in Amount | Enter invoice amount |
| Upload Invoice | Upload supporting document |
| Submit Verification | Start verification |

---

## Example Verification Panel

```text
Student ID: [CS001/2024] [LOAD]

Key in Amount: [55,000] KSH

Upload Invoice:
[ Choose File ] invoice_john_doe.pdf

Status:
✅ Verification passed.
Ready for student OTP approval.

[ SUBMIT VERIFICATION ]
```

---

# 🚦 Verification Status Messages

| Message | Meaning |
|---|---|
| Waiting for student | Student has not submitted balance |
| Student mismatch | Student amount differs |
| Fee master mismatch | Amount differs from fee structure |
| ✅ Verification passed | All records match |

---

# 💳 Section 7: Digital Payment Claims Table

Displays all payment claims and their statuses.

---

# 📋 Claims Table Structure

| Column | What It Shows |
|---|---|
| Date Created | Claim creation date |
| Student Name | Student full name |
| Coverage Type | Tuition, Food, etc. |
| Amount (KSH) | Claim amount |
| Student Signed | OTP approval status |
| Three-Way Match | Verification status |
| Status | Current workflow state |
| Action Button | View or Cancel |

---

## Example Claims Table

| Student | Coverage | Amount | Student Signed | 3-Way | Status |
|---|---|---|---|---|---|
| John Doe | Tuition | 55,000 | ✅ OTP Verified | ✅ | Completed |
| Mary Smith | Tuition | 35,000 | ⏳ Pending | ✅ | Ready |

---

# ➕ Create New Claim Modal

Opened using:

```text
[ + NEW CLAIM ]
```

---

## Create Claim Fields

| Field | Purpose |
|---|---|
| Student Search | Find student |
| Coverage Type | Select fee category |
| Amount | Auto-filled from fee master |
| Create Claim Button | Generate claim |

---

## Example Modal

```text
Student Search:
[ John Doe ]

Coverage:
[ Tuition ▼ ]

Amount:
[55,000]

[ CREATE CLAIM ]
```

---

# 💸 Section 8: Recent Disbursements Table

Displays completed school payments.

---

# 📋 Disbursement Table Structure

| Column | What It Shows |
|---|---|
| Date | Completion date |
| Student Name | Funded student |
| Amount (KSH) | Amount paid |
| Transaction Hash | Blockchain reference |
| Status | Completed or Failed |

---

## Example Disbursements

| Date | Student | Amount | Transaction Hash | Status |
|---|---|---|---|---|
| May 28 | John Doe | 55,000 | 0xabc...123 | ✅ Completed |

---

## Navigation

```text
[ VIEW ALL ]
```

---

# 🏦 Section 9: Bank Account Settings Panel

Used for managing school banking details.

---

# 🧾 Bank Fields

| Field | Purpose |
|---|---|
| Bank Name | Financial institution |
| Account Name | Registered account name |
| Account Number | Bank account number |
| Bank Code | Bank routing code |

---

## Example Settings

```text
Bank Name:      [ Equity Bank ]
Account Name:  [ UoN Fees ]
Account Number:[ 0123456789 ]
Bank Code:     [ 068 ]
```

---

# ⚙️ Bank Actions

```text
[ SAVE ]
[ TEST TRANSFER ]
```

---

## Test Transfer Purpose

The system sends:

```text
1 KSH test transfer
```

To verify account details before real disbursements.

---

# 🖥️ Full Visual Hierarchy

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ BURSARYHUB | SCHOOL DASHBOARD                         [🔔] [Profile ▼]    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│ │ 3,450    │ │1,280,000 │ │4,200,000 │ │ 12       │                       │
│ │Students  │ │Pending   │ │Completed │ │Active    │                       │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                       │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ FEE MASTER MANAGEMENT                                       [PUBLISH] │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ AUTO-BALANCE PREVIEW                                        [PREVIEW]│ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ STUDENT BALANCES                                         [SEARCH][CSV]│ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ THREE-WAY VERIFICATION                                                │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ DIGITAL PAYMENT CLAIMS                                     [+ NEW]    │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ RECENT DISBURSEMENTS                                     [VIEW ALL]   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ BANK ACCOUNT SETTINGS                                      [SAVE]     │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# ✅ Summary of All School Actions

| Action | Where It Happens |
|---|---|
| Publish fee master | Fee Master Management |
| Bulk update fees | Bulk Update button |
| Preview balance changes | Auto-Balance Preview |
| Apply fee changes | Apply to All Students |
| Search students | Student Balance Table |
| Edit balances | Edit Student Modal |
| Submit verification | Three-Way Verification |
| Create claims | Digital Claims Panel |
| Track disbursements | Recent Disbursements |
| Update bank account | Bank Settings |
| Test bank details | Test Transfer |
| Export student data | Export CSV |

---

# 🎯 Core Dashboard Purpose

The school dashboard enables institutions to:

- Manage academic fee structures
- Maintain student balances
- Verify funding claims
- Coordinate secure disbursements
- Track scholarship funding
- Manage banking workflows
- Export operational records
- Ensure transparent financial verification

---















# Student Dashboard — Complete Feature Outline

=======================================================================================

## Dashboard Layout Overview

The student dashboard is designed primarily for **mobile phones**.

### Core Design Principles

- 📱 Mobile-first layout
- 🔽 Vertical scrolling sections
- 🔤 Large readable text
- 👆 Easy-to-tap buttons
- 🌐 Optimized for slow internet connections

---

# 👤 Section 1: Header

Displayed at the very top of the dashboard.

---

## Header Elements

| Element | What It Shows |
|---|---|
| 👤 Student Name | Full student name |
| 🏫 School Name | Institution name |
| 🔔 Notification Badge | Number of unread alerts |
| ☰ Menu Icon | Opens profile settings & logout |

---

## Example Header

```text
┌──────────────────────────────────────┐
│ BursaryHub                    [☰]   │
│ John Doe                            │
│ University of Nairobi               │
│                           [3 NEW] ● │
└──────────────────────────────────────┘
```

---

# 🎓 Section 2: Available Scholarships Card

A highlighted card shown only when scholarships match the student profile.

---

## Scholarship Card Layout

```text
┌──────────────────────────────────────┐
│ 🎓 NEW SCHOLARSHIP AVAILABLE         │
│                                      │
│ Tech Scholars 2024                   │
│ Covers Tuition up to 55,000 KSH      │
│ Apply by June 30, 2026               │
│                                      │
│                    [ APPLY NOW ]     │
└──────────────────────────────────────┘
```

---

## Card Elements

| Element | What It Shows |
|---|---|
| Title | "New Scholarship Available for You" |
| Scholarship Name | Example: Tech Scholars 2024 |
| Coverage | Example: Tuition up to 55,000 KSH |
| Deadline | Application deadline |
| Apply Button | Green "Apply Now" button |

> ⚠️ If no scholarships match the student profile, this section is hidden.

---

# 📋 Section 3: My Applications

Displays all scholarships the student has applied for.

---

## Table Structure

| Column | What It Shows |
|---|---|
| Scholarship Name | Scholarship title |
| Status | Pending, Approved, Rejected, or Funded |
| Amount | Maximum approved amount |

---

## Example Applications

| Scholarship | Status | Funded Amount |
|---|---|---|
| Tech Scholars 2024 | ✅ Approved | 55,000 KSH |
| Girls in STEM | ⏳ Pending | — |

---

# ✅ Section 4: Step 1 — Confirm Your Balance

This section is always visible.

The student submits their side of the **three-way verification process**.

---

# 🧾 Verification Process

The system compares:

1. Student-submitted balance
2. School-submitted balance
3. Fee master records

All three must match before payment approval.

---

## Form Elements

| Element | What It Does |
|---|---|
| Current Fee Owed | Student enters amount in KSH |
| Upload Fee Statement | Upload photo or PDF |
| Submit Button | Sends balance for verification |

---

## Form Preview

```text
┌──────────────────────────────────────┐
│ Current fee owed: [55,000] KSH       │
│                                      │
│ Fee statement: [Choose File]         │
│                                      │
│              [ SUBMIT MY BALANCE ]   │
└──────────────────────────────────────┘
```

---

# 🔍 Verification Status Box

Appears after submission.

---

## Success Example

```text
┌──────────────────────────────────────┐
│ ✓ You entered: 55,000 KSH            │
│ ✓ School says: 55,000 KSH            │
│ ✓ Fee master says: 55,000 KSH        │
│                                      │
│ ✅ MATCHED! Ready for approval       │
└──────────────────────────────────────┘
```

---

## Waiting Example

```text
⏳ Waiting for school verification
```

---

## Mismatch Example

```text
❌ MISMATCH:
Your amount does not match school records.
Contact your school admin.
```

---

## Important Rule

> 🚫 The student cannot continue to Step 2 until verification status becomes **MATCHED**.

---

# 🔐 Section 5: Step 2 — Approve Payment

Appears only after:

- Three-way verification succeeds
- School creates a payment claim

---

## Payment Approval Elements

| Element | What It Shows |
|---|---|
| School Name | Institution requesting payment |
| Amount | Verified KSH amount |
| Coverage Type | Tuition, accommodation, etc. |
| Request OTP Button | Sends SMS verification code |
| OTP Input Field | Student enters received code |
| Verify & Approve Button | Confirms payment approval |

---

## Payment Approval Preview

```text
┌──────────────────────────────────────┐
│ School: University of Nairobi        │
│ Amount: 55,000 KSH                   │
│ Coverage: Tuition - Year 1 CS        │
│                                      │
│                [ REQUEST OTP ]       │
│                                      │
│ OTP: [•][•][•][•][•][•]             │
│                                      │
│          [ VERIFY & APPROVE ]        │
└──────────────────────────────────────┘
```

---

# 📲 OTP Verification Flow

## When Student Clicks "Request OTP"

The system:

- Sends SMS code
- Activates OTP fields
- Starts countdown timer

---

## Example SMS

```text
Your BursaryHub verification code is 123456
```

---

## Timer Example

```text
Code expires in 5:00
```

---

# ✅ OTP Verification Outcomes

## Successful Approval

```text
✅ Payment approved!
Funds will be sent to the school.
```

---

## Invalid OTP

```text
❌ Invalid code.
Request a new OTP.
```

---

## Completed Payment Status

```text
✅ Payment completed on May 28, 2026
```

---

# 💸 Section 6: Payment History

Displays previous payments made on behalf of the student.

---

## Payment History Structure

| Column | What It Shows |
|---|---|
| Date | Payment completion date |
| Coverage | Tuition, Food, Accommodation, etc. |
| Amount | Amount paid in KSH |
| Status | Completed or Failed |

---

## Example Payment History

| Date | Coverage | Amount | Status |
|---|---|---|---|
| May 28, 2026 | Tuition | 55,000 KSH | ✅ Completed |
| Jan 15, 2026 | Tuition | 50,000 KSH | ✅ Completed |

---

## Additional Navigation

```text
[ VIEW ALL ]
```

Opens the full payment history page.

---

# 🆘 Section 7: Help & Support

Located at the bottom of the dashboard.

---

## Support Elements

| Element | What It Does |
|---|---|
| Contact Support | Opens support form |
| FAQ | Opens help articles |
| Version Number | Shows platform version |

---

## Support Preview

```text
[ Contact Support ]   [ FAQ ]   v1.0
```

---

# 📱 Mobile Visual Hierarchy

```text
┌─────────────────────────────────────────────┐
│ BursaryHub                          [☰]    │
│ John Doe                                    │
│ University of Nairobi                       │
│                                   [3 NEW] ● │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 🎓 NEW SCHOLARSHIP AVAILABLE            │ │
│ │ Tech Scholars 2024                      │ │
│ │ Covers tuition up to 55,000 KSH         │ │
│ │ Apply by June 30, 2026                  │ │
│ │                       [ APPLY NOW ]     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ MY APPLICATIONS                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Tech Scholars 2024 │ Approved │ 55K    │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ STEP 1: CONFIRM YOUR BALANCE                │
│ ┌─────────────────────────────────────────┐ │
│ │ Current fee owed: [55,000] KSH          │ │
│ │ Fee statement: [Choose File]            │ │
│ │               [SUBMIT MY BALANCE]       │ │
│ │ ─────────────────────────────────────── │ │
│ │ ✓ You entered: 55,000 KSH               │ │
│ │ ✓ School says: 55,000 KSH               │ │
│ │ ✓ Fee master says: 55,000 KSH           │ │
│ │ ✅ MATCHED! Ready for approval          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ STEP 2: APPROVE PAYMENT                     │
│ ┌─────────────────────────────────────────┐ │
│ │ School: University of Nairobi           │ │
│ │ Amount: 55,000 KSH                      │ │
│ │ Coverage: Tuition - Year 1 CS           │ │
│ │                    [REQUEST OTP]        │ │
│ │ OTP: [•][•][•][•][•][•]                │ │
│ │             [VERIFY & APPROVE]          │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ PAYMENT HISTORY                             │
│ ┌─────────────────────────────────────────┐ │
│ │ May 28 │ Tuition │ 55,000 │ Completed  │ │
│ │ Jan 15 │ Tuition │ 50,000 │ Completed  │ │
│ │                       [VIEW ALL]        │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ HELP & SUPPORT                              │
│ [Contact Support] [FAQ] v1.0               │
│                                             │
└─────────────────────────────────────────────┘
```

---

# ✅ Summary of All Student Actions

| Action | Where It Happens |
|---|---|
| Apply for scholarship | Available Scholarships Card |
| Check application status | My Applications |
| Enter current balance | Step 1 — Confirm Your Balance |
| Upload fee statement | Step 1 — File Upload |
| Submit balance verification | Submit My Balance Button |
| View verification results | Verification Status Box |
| Request OTP | Step 2 — Request OTP |
| Enter OTP | OTP Input Field |
| Approve payment | Verify & Approve Button |
| View payment history | Payment History |
| Get support | Help & Support |

---

# 🎯 Core Dashboard Purpose

The student dashboard enables students to:

- Discover scholarship opportunities
- Apply for funding
- Verify school fee balances
- Approve secure school payments
- Track funding status
- Review payment history
- Access support services

---



DONOR



========================================================================
Donor Dashboard — Complete Feature Outline
# Donor Dashboard — Complete Feature Outline

## Dashboard Layout Overview

The donor dashboard is divided into **six main sections** displayed on a single page.  
Each section shows specific data and allows specific actions.

---

# 📊 Section 1: Summary Statistics Cards

Four large cards at the top of the page showing key numbers.

## Preview

```text
┌────────────────────┐
│ 💰 $247,500        │
│ Total Donated      │
└────────────────────┘

┌────────────────────┐
│ 🎓 3               │
│ Active Scholarships│
└────────────────────┘

┌────────────────────┐
│ 👨‍🎓 142             │
│ Students Funded    │
└────────────────────┘

┌────────────────────┐
│ 🇰🇪 2,850,000 KSH   │
│ Total Disbursed    │
└────────────────────┘
```

## Card Details

| Card | What It Shows |
|---|---|
| 💰 Total Donated | Sum of all money the donor has deposited in USD |
| 🎓 Active Scholarships | Number of scholarships currently open for applications |
| 👨‍🎓 Students Funded | Total number of students who have received money |
| 🇰🇪 Total Disbursed | Sum of all money sent to schools in KSH |

> ✅ Each card updates automatically when new transactions occur.

---

# 📝 Section 2: Create New Scholarship Form

A form panel where the donor creates a new scholarship.

---

## Form Fields

| Field | Options / Input Type |
|---|---|
| Scholarship Title | Text input |
| Eligible Course | Dropdown menu |
| Eligible Year of Study | Dropdown menu |
| Minimum GPA | Decimal number input |
| Eligible County | Dropdown menu |
| Coverage Type | Radio buttons |
| Number of Slots | Number input |
| Max Amount per Student (KSH) | Number input |
| Application Start Date | Date picker |
| Application End Date | Date picker |

---

## Eligible Course Options

- Computer Science
- Information Technology
- Business
- Engineering
- Nursing
- Education
- Law
- Other

---

## Eligible Year Options

- 1st Year
- 2nd Year
- 3rd Year
- 4th Year

---

## Coverage Type Options

- Tuition Only
- Accommodation Only
- Food Only
- Transport Only
- All of the Above
- Unrestricted

---

# 💵 Cost Preview Box

Displays estimated financial breakdown before deposit.

```text
┌──────────────────────────────────────┐
│ Donor Deposit Amount      $5,000     │
│ Conversion to USDT Fee    $20        │
│ Network Gas Fee           $5         │
│ USDT Locked in Escrow     $4,975     │
│ Platform Fee (1%)         KSH 7,000  │
│ Estimated School Receipt  KSH 693,000│
└──────────────────────────────────────┘
```

---

## Action Buttons

```text
[ Cancel ]   [ Create & Deposit ]
```

---

# 📚 Section 3: Active Scholarships List

Displays scholarships currently open for applications.

---

## Table Structure

| Column | What It Shows |
|---|---|
| Title | Scholarship name |
| Slots | Total / Approved / Remaining |
| Coverage | Tuition, accommodation, etc. |
| Max Amount | Maximum KSH per student |
| Status | Active, Expiring Soon, Closed |
| Action Button | View Details |

---

## Example Table

| Title | Slots | Coverage | Max Amount | Status | Action |
|---|---|---|---|---|---|
| Tech Leaders Fund | 10 / 6 / 4 | Tuition | KSH 120,000 | Active | View Details |
| Women in STEM | 5 / 5 / 0 | Full Coverage | KSH 200,000 | Closed | View Details |

---

# ⏳ Section 4: Pending Applications Queue

Displays students waiting for donor approval.

---

## Table Structure

| Column | What It Shows |
|---|---|
| Student Name | Full student name |
| School | Institution name |
| Course | Student course |
| Year | Current study year |
| GPA | Grade point average |
| Applied For | Scholarship title |
| Amount Requested | Requested KSH amount |
| Action Buttons | Approve / Reject |

---

## Example Table

| Student | School | Course | GPA | Scholarship | Amount | Actions |
|---|---|---|---|---|---|---|
| Brian Otieno | Maseno University | IT | 3.8 | Tech Leaders Fund | KSH 80,000 | ✅ Approve / ❌ Reject |
| Mercy Akinyi | JKUAT | Nursing | 3.6 | Women in STEM | KSH 120,000 | ✅ Approve / ❌ Reject |

---

## Approval Logic

When the donor clicks **Approve**:

- Student moves from **Pending** → **Approved**
- Money becomes reserved in escrow
- Scholarship slots update automatically

---

# 💸 Section 5: Recent Disbursements Table

Shows recent payments sent to schools.

---

## Table Structure

| Column | What It Shows |
|---|---|
| Date | Payment completion date |
| Student | Student name |
| School | School name |
| Amount (KSH) | Amount sent |
| Coverage | Tuition, accommodation, etc. |
| Fees Deducted | Conversion, gas, platform fees |
| Status | Completed, Pending, Failed |
| Action Button | View Receipt |

---

## Example Table

| Date | Student | School | Amount | Status | Action |
|---|---|---|---|---|---|
| 12 Mar 2026 | Brian Otieno | Maseno University | KSH 80,000 | Completed | View Receipt |
| 14 Mar 2026 | Mercy Akinyi | JKUAT | KSH 120,000 | Pending | View Receipt |

---

## Additional Navigation

```text
[ View All Transactions ]
```

Opens a full paginated transaction history.

---

# 📈 Section 6: Impact Report Panel

Provides donor impact statistics and export tools.

---

## Impact Metrics

| Element | What It Does |
|---|---|
| Total Students Funded | Running approved student count |
| Total Schools Reached | Unique schools funded |
| Total KSH Disbursed | Total money sent |
| Download CSV Button | Export all transactions |
| Download PDF Button | Export formatted impact report |

---

## Export Buttons

```text
[ Download CSV ]
[ Download PDF ]
```

---

# 🧭 Visual Hierarchy (Page Layout)

```text
┌─────────────────────────────────────────────────────────────┐
│ BURSARYHUB                                        [Logout] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │$247,500  │ │ 3        │ │ 142      │ │2,850,000 │         │
│ │Donated   │ │Active    │ │Students  │ │Disbursed │         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ CREATE NEW SCHOLARSHIP                       [EXPAND]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ACTIVE SCHOLARSHIPS                            [VIEW]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ PENDING APPLICATIONS (3)                      [VIEW]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ RECENT DISBURSEMENTS                          [VIEW]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ IMPACT REPORT                                [EXPORT]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# ✅ Summary of All Donor Actions

| Action | Where It Happens |
|---|---|
| Create scholarship | Create New Scholarship Form |
| See all fees before depositing | Cost Preview Box |
| Approve or reject applications | Pending Applications Queue |
| View active scholarships | Active Scholarships List |
| Track disbursements | Recent Disbursements Table |
| Download reports | Impact Report Panel |
| View payment receipts | Disbursement Receipt Viewer |

---

# 🎯 Core Dashboard Purpose

The donor dashboard enables donors to:

- Create and fund scholarships
- Review student applications
- Approve funding requests
- Track escrow and disbursements
- Monitor educational impact
- Export compliance and CSR reports
- Maintain transparent financial visibility

---

======================================================================================












=======================================================================================


git add README.md
git commit -m "docs: draft"
git push