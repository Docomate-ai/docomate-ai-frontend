<p align="center">
  <img src="https://avatars.githubusercontent.com/u/207241261?s=200&v=4" style="border-radius: 1rem; border: 1px solid #fff;"/>
</p>

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

</div>

# DocomateAI Frontend

The frontend for **DocomateAI**, a smart AI-powered documentation assistant that helps developers auto-generate project documentation, preview markdown output, and interact with their codebase visually and intuitively.

> 📌 For the backend and full-stack implementation, visit our [GitHub organization](https://github.com/docomate-ai)

---

## Table of Contents

- [DocomateAI Frontend](#docomateai-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Screenshots](#screenshots)
    - [Login Page](#login-page)
    - [Dashboard](#dashboard)
    - [Project Page](#project-page)
    - [Readme Section Selection Page](#readme-section-selection-page)
    - [Readme Output Page](#readme-output-page)
    - [Save Readme Page with Download Btn (in Dark Mode)](#save-readme-page-with-download-btn-in-dark-mode)
    - [Chat Page (in Dark Mode)](#chat-page-in-dark-mode)
    - [Chat Page with response](#chat-page-with-response)
    - [Profile Page (in Dark Mode)](#profile-page-in-dark-mode)
    - [Settings Page (in Dark Mode)](#settings-page-in-dark-mode)
  - [Installation](#installation)
    - [Requirements](#requirements)
    - [Steps](#steps)
  - [Wanna Try It](#wanna-try-it)
  - [Author](#author)

---

## Features

- Sleek, responsive UI built with **ShadCn** + **TailwindCSS**
- AI integration to generate READMEs and chat with codebase.
- Markdown editing and live preview support
- Secure user authentication (via backend API)
- Seamless API interaction with Groq.
- Built with Vite for super fast dev experience

---

## Screenshots

### Login Page

![Login Page](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333906/login_a25q43.png)

### Dashboard

![Dashboard](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333906/dashboard_eymn0k.png)

### Project Page

![Project Page](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/project_g1qm0p.png)

### Readme Section Selection Page

![Readme Sections](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/sections_vja5vb.png)

### Readme Output Page

![Readme Output Page](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/readme_eo9psw.png)

### Save Readme Page with Download Btn (in Dark Mode)

![Saved Readme Preview](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/View_project_-_Dark_mode_w4yxci.png)

### Chat Page (in Dark Mode)

![Chat Page](https://res.cloudinary.com/dodtu65mt/image/upload/v1745514750/chat_fsrxza.png)

### Chat Page with response

![Chat Response](https://res.cloudinary.com/dodtu65mt/image/upload/v1745514750/chat_response_yanjmz.png)

### Profile Page (in Dark Mode)

![Profile](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/profile_zo1nt9.png)

### Settings Page (in Dark Mode)

![Settings](https://res.cloudinary.com/dodtu65mt/image/upload/v1745333905/settings_xbfvkw.png)

## Installation

### Requirements

- Node.js (v18+ recommended)
- npm

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/docomate-ai/docomate-ai-frontend.git
   cd docomate-ai-frontend
   ```

2. **Installing Dependencies**
   ```bash
   npm install
   ```
3. **Update the axios configuration**: Open `src/lib/axios.ts` and do following changes.

   ```typescript
   axios.defaults.baseURL = "<write your backend URL>";
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Wanna Try It

- **Check out the live site here:** [Docomate AI](https://docomate-ai.github.io/docomate-ai-frontend/)

## Author

- Gitanshu Sankhla

  [![GitHub-social](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gitax18) [![LinkedIn-social](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/gitanshu-sankhla)
  [![Instagram-social](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/gitanshusankhla)
