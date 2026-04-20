# Akra Supply | [Live Demo](https://mehmetsunguralp.github.io/akra-supply/).
## Screen Shots
<img width="1907" height="942" alt="image" src="https://github.com/user-attachments/assets/2ef895b1-3dac-4fcb-9b6f-a4b46366d20d" />

---

<img width="1901" height="932" alt="image" src="https://github.com/user-attachments/assets/da2088f8-8c1e-45be-9382-0251282a86a4" />

---

<img alt="image" src="https://github.com/user-attachments/assets/4152c61d-fc56-46b2-938e-b3d834783a50" />

---

<img alt="image" src="https://github.com/user-attachments/assets/2931fa17-38af-4e5e-9f44-41310e767af7" />


---

<img alt="image" src="https://github.com/user-attachments/assets/3d3b3198-5e4b-4cfa-a655-4c5a9bb060a8" />

---

<img alt="image" src="https://github.com/user-attachments/assets/91bcbcae-9335-4241-8061-607fa0145fb2" />

## About the App
Akra Supply is a web application built to manage supply and ordering workflows through a modern, fast user interface.
### Tech Stack
- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **UI:** MUI
- **State Management:** Redux Toolkit + React Redux
- **Forms & Validation:** Formik + Yup
- **Routing:** React Router
- **API & Mocking:** Axios + JSON Server
- **Extra:** PWA support (`vite-plugin-pwa`)

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (comes with Node.js)

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

3. Start mock API server (Terminal 1):

   ```bash
   npx json-server db.json --port 3000
   ```

4. Start Vite dev server (Terminal 2):

   ```bash
   npm run dev
   ```

5. Open the app in your browser (default):

   ```text
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds production assets
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint

## Install As a PWA

The app supports installation as a Progressive Web App (PWA) on both desktop and mobile.

### Desktop (Chrome / Edge)

1. Open the app URL in your browser.
2. In the address bar, click the **Install app** icon (or open the browser menu and choose **Install Akra Supply**).
3. Confirm installation.
4. Launch the installed app from your desktop/start menu.

<img width="642" height="854" alt="image" src="https://github.com/user-attachments/assets/34bc7879-c331-4587-a6ba-2a843523d05e" />


### Android (Chrome)

1. Open the app in Chrome.
2. Tap the browser menu (three dots).
3. Tap **Install app** or **Add to Home screen**.
4. Confirm and open the app from your home screen.

<img alt="image" src="https://github.com/user-attachments/assets/bfc03190-9221-414d-a2d5-a2b70cca17cf" />


### iOS (Safari)

1. Open the app in Safari.
2. Tap the **Share** button.
3. Scroll and select **Add to Home Screen**.
4. Tap **Add** to finish.

<img  alt="image" src="https://github.com/user-attachments/assets/053afd9e-9b40-4134-a107-827ea738c732" />

