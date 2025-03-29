# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Smart Waste Management System

This project is a Smart Waste Bin Management application that helps monitor and manage waste bins efficiently.

## Features

- Real-time bin monitoring
- User authentication with Firebase
- Responsive dashboard
- Waste trend analytics
- Notification system

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd my-vite-app
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password and Google providers)
- Copy your Firebase configuration

4. Set up environment variables
- Copy `.env.example` to a new file called `.env`
```bash
cp .env.example .env
```
- Replace the placeholder values in `.env` with your actual Firebase configuration

5. Start the development server
```bash
npm run dev
```

## Environment Variables

This project uses environment variables to manage sensitive configuration. The following variables are required:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

## Deployment

1. Build the project
```bash
npm run build
```

2. Deploy to hosting service of your choice
- Make sure to set the appropriate environment variables on your hosting platform

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Submit a pull request

## License

[MIT](LICENSE)
