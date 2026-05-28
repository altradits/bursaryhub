
========================================================================
Donor Dashboard — Complete Feature Outline
Dashboard Layout Overview
The donor dashboard is divided into six main sections displayed on a single page. Each section shows specific data and allows specific actions.

Section 1: Summary Statistics Cards
Four large cards at the top of the page showing key numbers:

Card	What It Shows
Total Donated	Sum of all money the donor has deposited in USD
Active Scholarships	Number of scholarships currently open for applications
Students Funded	Total number of students who have received money
Total Disbursed	Sum of all money that has been sent to schools in KSH
Each card updates automatically when new transactions occur.

Section 2: Create New Scholarship Form
A form panel where the donor creates a new scholarship. Contains the following fields:

Field	Options / Input Type
Scholarship Title	Text input
Eligible Course	Dropdown menu (Computer Science, Information Technology, Business, etc.)
Eligible Year of Study	Dropdown menu (1st, 2nd, 3rd, 4th)
Minimum GPA	Number input with decimal
Eligible County	Dropdown menu (47 Kenyan counties or "All Counties")
Coverage Type	Radio buttons (Tuition only, Accommodation only, Food only, Transport only, All of above, Unrestricted)
Number of Slots	Number input
Max Amount per Student (KSH)	Number input
Application Start Date	Date picker
Application End Date	Date picker
Below the form, a Cost Preview Box shows:

Donor deposit amount

Conversion to USDT fee

Network gas fee

USDT locked in escrow

Platform fee (1%) when disbursed

Estimated school receipt in KSH

Buttons at bottom: Cancel, Create & Deposit.

Section 3: Active Scholarships List
A table showing all scholarships the donor has created that are still open.

Column	What It Shows
Title	Name of the scholarship
Slots	Total slots / Approved students / Remaining slots
Coverage	What the scholarship pays for (tuition, accommodation, etc.)
Max Amount	Maximum KSH per student
Status	Active, Expiring soon, Closed
Action Button	View Details (opens expanded view)
Section 4: Pending Applications Queue
A table showing students who have applied to the donor's scholarships and are waiting for approval.

Column	What It Shows
Student Name	Full name from student profile
School	Name of the institution
Course	Student's course of study
Year	Current year of study
GPA	Student's grade point average
Applied For	Scholarship title
Amount Requested	KSH amount based on fee master
Action Buttons	Approve (green), Reject (red)
When the donor clicks Approve, the student moves from pending to approved, and the money is reserved in escrow for that student.

Section 5: Recent Disbursements Table
A table showing the most recent payments that have been sent to schools.

Column	What It Shows
Date	When the disbursement completed
Student	Student name
School	School name
Amount (KSH)	Amount sent to school
Coverage	Tuition, accommodation, etc.
Fees Deducted	Total of conversion, gas, platform, and withdrawal fees
Status	Completed, Pending, Failed
Action Button	View Receipt (opens detailed breakdown)
A "View All" link at the bottom opens a full paginated history.

Section 6: Impact Report Panel
A panel at the bottom of the dashboard with export options.

Element	What It Does
Total Students Funded	Running count of all approved students
Total Schools Reached	Count of unique schools that received payments
Total KSH Disbursed	Sum of all payments sent
Download CSV Button	Exports all transactions with dates, amounts, fees, and student details for tax and CSR reporting
Download PDF Button	Exports a formatted impact report suitable for board presentations
Visual Hierarchy (Top to Bottom on Page)
text
┌─────────────────────────────────────────────────────────────┐
│  BURSARYHUB                                         [Logout] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │$247,500  │  │ 3        │  │ 142      │  │ 2,850,000│   │
│  │Total     │  │Active    │  │Students  │  │Total     │   │
│  │Donated   │  │Scholarshi│  │Funded    │  │Disbursed │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CREATE NEW SCHOLARSHIP                    [EXPAND]   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ACTIVE SCHOLARSHIPS                         [VIEW]   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PENDING APPLICATIONS (3)                     [VIEW]   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  RECENT DISBURSEMENTS                         [VIEW]   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  IMPACT REPORT                                 [EXPORT] │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Summary of All Donor Actions
Action	Where It Happens
Create scholarship	Create New Scholarship form
See all fees before depositing	Cost Preview Box
Approve or reject student applications	Pending Applications table
View active scholarships	Active Scholarships list
See where money went	Recent Disbursements table
Download tax/compliance report	Impact Report panel
View detailed receipt for a payment	Click View Receipt on any disbursement

======================================================================================



git add README.md
git commit -m "docs: draft"
git push