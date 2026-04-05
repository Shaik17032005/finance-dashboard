<div align="center">
  <h1>✨ FinDash</h1>
  <p><strong>Premium Financial Activity Tracker & Dashboard</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  </p>
</div>

<br />

Welcome to **FinDash**, a beautifully crafted, highly interactive financial dashboard designed to demonstrate enterprise-grade UI/UX paradigms without relying on heavy external styling frameworks.

---

## 🌟 Key Features

- **Auth & Security Flow:** Complete authentication layer requiring users to log in before browsing the application safely, featuring a beautiful split-screen UI.
- **Interactive Data Visualization:** Integrates dynamic parsing of data using `Recharts` to provide beautiful, hover-responsive graph analytics representing expense categories and running balances.
- **Premium Glassmorphic Aesthetics:** Built purely with CSS. Supports bespoke text gradients, 3D shadow highlights, custom scrollbars, and seamless transitions between Dark and Light mode.
- **Role Based Access Control (RBAC):** Switch seamlessly between `Viewer` and `Admin` personas to toggle read-only limitations versus destructive editing functionality.
- **Robust Transaction Engine:** Effortlessly search, filter by income/expense, and sort transactions contextually while creating, editing, or deleting records inline. Export directly to CSV/JSON.
- **Smart Insights:** On-the-fly computational widget system identifying your highest expenditure sectors, savings percentages, and month-over-month comparisons.

<br />

## 🛠️ Technology Stack

| Technology | Purpose |
| ----------- | ----------- |
| **React 19** | Component isolation, logic routing, and contextual data hooks. |
| **Vite** | Millisecond-fast local caching and HMR rendering server. |
| **Recharts** | Composability for React-native custom data telemetry rendering. |
| **Lucide-React** | Lightweight, scalable vector iconography. |
| **Date-fns** | Comprehensive manipulation logic for ISO strings parsing. |

<br />

## 🚀 Getting Started

Follow these steps to run FinDash in your local environment without any friction.

**1. Clone the Repository**
```bash
git clone https://github.com/Shaik17032005/finance-dashboard.git
cd finance-dashboard
```

**2. Install Dependencies**
```bash
npm install
```

**3. Fire up the Development Server**
```bash
npm run dev
```

*Your backend should resolve almost immediately via Vite. You can visit the application at `http://localhost:5173/` inside your browser.*

---

## 🏛️ Project Architecture

We follow a modular, scalable directory pattern tailored explicitly for React contexts.

```text
src/
 ┣ components/
 ┃ ┣ auth/             # Login & Registration validation gateways
 ┃ ┣ dashboard/        # Central charts & holistic overview widgets 
 ┃ ┣ insights/         # Computational analysis models
 ┃ ┣ layout/           # Shared structural wrappers (Sidebar & Menus)
 ┃ ┗ transactions/     # Granular record management and table elements
 ┣ context/            # React global state providers (Auth, Theme, Finance)
 ┗ data/               # Locally persistent mock data seeding mechanisms
```

---

<div align="center">
  <p>Built focusing on clean components, scalable native styling, and exceptional User Experience.</p>
</div>
