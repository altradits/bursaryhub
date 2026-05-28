
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



git add README.md
git commit -m "docs: draft"
git push