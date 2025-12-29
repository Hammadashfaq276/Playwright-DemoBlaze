This project is an end-to-end automation testing framework developed for the DemoBlaze e-commerce web application, covering both UI Automation and API Automation using Playwright.

The framework follows Page Object Model (POM) design and validates both frontend behavior and backend API responses, following real-world automation best practices.
This project is created for learning, practice, and SDET portfolio purposes.

🛠️ Tech Stack & Tools

Automation Tool: Playwright

Programming Language: JavaScript / TypeScript

Test Types: UI Automation & API Automation

Framework Design: Page Object Model (POM)

Reporting: Playwright HTML Reports

Version Control: Git & GitHub

IDE: VS Code

📂 Project Structure
DemoBlaze-Playwright-Automation
│
├── tests
│   ├── ui
│   │   ├── login.spec.js
│   │   ├── signup.spec.js
│   │   ├── cart.spec.js
│   │   ├── checkout.spec.js
│   │   ├── contact.spec.js
│   │
│   ├── api
│   │   ├── auth.api.spec.js
│   │   ├── cart.api.spec.js
│   │   ├── order.api.spec.js
│
├── pages
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── ContactPage.js
│
├── playwright.config.js
└── README.md

🧩 Features Automated
🔹 UI Automation

User Signup

User Login

Product browsing

Add to Cart

Checkout process

Contact form validation

🔹 API Automation

Authentication APIs

Cart APIs

Order / checkout APIs

API response validation (status codes & data)

✅ Key Features

✔ UI automation using Playwright
✔ API automation using Playwright API testing
✔ Page Object Model (POM) implementation
✔ Reusable and maintainable test code
✔ HTML execution reports
✔ End-to-end frontend + backend validation
✔ GitHub version control

🧪 UI & API Testing Strategy

UI tests validate user workflows and UI behavior

API tests validate backend functionality and data integrity

Ensures end-to-end application quality

▶️ How to Run the Project

Clone the repository:

git clone https://github.com/<your-username>/<repository-name>.git


Open the project in VS Code

Install dependencies:

npm install


Run all tests:

npx playwright test


View report:

npx playwright show-report

📊 Reporting

Playwright HTML reports are generated automatically

Reports include:

Pass / Fail status

Execution steps

Screenshots on failure

👨‍💻 Author

Hammad Ashfaq
Role: SDET | Automation Test Engineer
Skills: Playwright | JavaScript | UI & API Automation | POM | Git
<img width="1781" height="867" alt="image" src="https://github.com/user-attachments/assets/5125a065-dc85-44e5-82b1-86b50ea838bd" />
<img width="1893" height="884" alt="image" src="https://github.com/user-attachments/assets/f3edfc78-f06f-4ae4-a018-c5d8f8bf2279" />


