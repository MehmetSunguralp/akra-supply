# Akra Supply

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

> Screenshot placeholder: Desktop install prompt (`docs/images/pwa-desktop-install.png`)

### Android (Chrome)

1. Open the app in Chrome.
2. Tap the browser menu (three dots).
3. Tap **Install app** or **Add to Home screen**.
4. Confirm and open the app from your home screen.

> Screenshot placeholder: Android install prompt (`docs/images/pwa-android-install.png`)

### iOS (Safari)

1. Open the app in Safari.
2. Tap the **Share** button.
3. Scroll and select **Add to Home Screen**.
4. Tap **Add** to finish.

> Screenshot placeholder: iOS "Add to Home Screen" flow (`docs/images/pwa-ios-install.png`)
