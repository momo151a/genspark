# CareMé Beauty Reviews - React + Firebase

A modern beauty powder reviews platform built with React 19, Vite, and Firebase.

## 🚀 Migration Status

This project is being migrated from Cloudflare Pages + Hono + D1 to React + Vite + Firebase.

**Current Phase**: Week 1 - Infrastructure Setup ✅

### Completed Tasks
- ✅ Firebase project configuration (firestore.rules, storage.rules, indexes)
- ✅ Environment variables setup
- ✅ Firebase SDK initialization
- ✅ React Router setup with basic routes
- ✅ Core services (auth, reviews, products, storage)
- ✅ Authentication context and hooks
- ✅ Common components (Header, Footer, Modal, Toast, Loading)
- ✅ Global styles and CSS variables
- ✅ Project folder structure

### Next Steps
1. Configure Firebase project in Firebase Console
2. Add Firebase credentials to `.env` file
3. Deploy Firestore rules and indexes
4. Create data migration script (from D1 to Firestore)
5. Build review components
6. Implement remaining features

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase CLI: `npm install -g firebase-tools`
- Firebase account and project

## 🔧 Installation

1. **Clone and install dependencies:**
```bash
cd genspark
npm install
```

2. **Configure Firebase:**

Get your Firebase configuration from Firebase Console → Project Settings → General

Update `.env` with your Firebase credentials:
```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=genspark-c7767.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=genspark-c7767
VITE_FIREBASE_STORAGE_BUCKET=genspark-c7767.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Enable Firebase services:**

In Firebase Console, enable:
- Authentication (Email/Password)
- Firestore Database
- Cloud Storage

4. **Deploy Firebase rules and indexes:**
```bash
firebase login
firebase use genspark-c7767
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 📁 Project Structure

```
genspark/
├── src/
│   ├── components/           # React components
│   │   ├── common/          # Reusable components
│   │   ├── auth/            # Authentication components
│   │   ├── reviews/         # Review components
│   │   └── products/        # Product components
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── contexts/            # React contexts
│   │   └── AuthContext.jsx  # Global auth state
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useToast.js
│   │   └── useFirestore.js
│   │
│   ├── services/            # Firebase service wrappers
│   │   ├── auth.service.js
│   │   ├── reviews.service.js
│   │   ├── products.service.js
│   │   └── storage.service.js
│   │
│   ├── utils/               # Helper functions
│   ├── firebase.js          # Firebase initialization
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
│
├── public/                  # Static assets
├── firestore.rules          # Firestore security rules
├── storage.rules            # Storage security rules
├── firestore.indexes.json   # Firestore indexes
├── firebase.json            # Firebase configuration
└── package.json
```

## 🔐 Firebase Security

### Firestore Rules
- Users can read all public profiles
- Users can only edit their own profile
- Reviews are public (read) but only creators can edit/delete
- Products and categories are read-only (admin managed)

### Storage Rules
- All images are publicly readable
- Users can only upload/delete their own avatars
- Authenticated users can upload review images
- Product images are admin-only

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **Backend**: Firebase (Firestore, Auth, Storage, Hosting)
- **Routing**: React Router v7
- **State Management**: Zustand
- **Styling**: CSS Variables + Custom CSS

## 📦 Key Dependencies

```json
{
  "firebase": "^12.4.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.2.0",
  "zustand": "^5.0.3"
}
```

## 🔄 Data Migration

The migration from D1 (SQLite) to Firestore is documented in `firebase_migration_plan.md`.

Key changes:
- SQL → NoSQL (Firestore)
- Base64 images → Firebase Storage URLs
- Custom auth → Firebase Authentication
- Sessions table → Firebase Auth tokens

## 🎨 Styling

The project uses CSS Variables for theming:

```css
--primary-color: #e91e63
--secondary-color: #ff4081
--accent-color: #ffc107
```

All styles are defined in `src/index.css` with responsive design support.

## 🔗 Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/products` - Products listing
- `/profile` - User profile (protected)
- `*` - 404 Not Found

## 🧪 Development with Firebase Emulators (Optional)

1. Install emulators:
```bash
firebase init emulators
```

2. Start emulators:
```bash
firebase emulators:start
```

3. Update `.env`:
```bash
VITE_USE_EMULATORS=true
```

This will connect to local Firebase emulators instead of production.

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIza...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain | `genspark-c7767.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project ID | `genspark-c7767` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket | `genspark-c7767.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | App ID | `1:123:web:abc` |
| `VITE_USE_EMULATORS` | Use local emulators | `true` or omit |

## 🚀 Deployment

The site is hosted on Firebase Hosting.

**Production URL**: `https://genspark-c7767.web.app`

Deploy command:
```bash
npm run build && firebase deploy
```

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a migration project. See `firebase_migration_plan.md` for the full migration roadmap.

---

**Last Updated**: 2025-10-29
**Status**: In Development (Week 1 Complete)
