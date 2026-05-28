
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