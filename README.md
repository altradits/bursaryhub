
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