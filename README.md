# 🎨 Imagify - AI Image Generation Platform

A full-stack web application for generating AI-powered images using ClipDrop API with credit-based system and payment integration.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [License](#license)

## ✨ Features

### User Management
- 🔐 User Registration & Login with JWT authentication
- 👤 User Profile Management
- 💳 Credit-based system for image generation
- 🔄 Real-time credit balance tracking

### Image Generation
- 🎯 AI-powered image generation using ClipDrop API
- 📥 One-click image download
- 🎨 High-quality generated images
- ⚡ Fast and reliable image processing
- 🔄 Automatic fallback to mock images if API fails

### UI/UX
- 🎨 Modern, responsive design with TailwindCSS
- 🔥 Smooth animations with Framer Motion
- 📱 Mobile-friendly interface
- 🎭 Beautiful gradient backgrounds
- ⚡ Fast performance with Vite

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI Framework
- **Vite 5.4** - Build tool & Dev server
- **TailwindCSS 3.4** - Utility-first CSS
- **React Router DOM 6** - Client-side routing
- **Axios 1.7** - HTTP client
- **Framer Motion 11** - Animation library
- **React Toastify 10** - Notifications
- **ESLint** - Code quality

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Axios** - HTTP requests
- **dotenv** - Environment management
- **CORS** - Cross-origin requests
- **Razorpay SDK** - Payment gateway
- **Stripe SDK** - Payment gateway

### APIs
- **ClipDrop API** - AI Image Generation
- **Razorpay API** - Payment Processing
- **Stripe API** - Payment Processing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Clone the Repository

```bash
git clone https://github.com/OPJASH448/image-generation.git
cd imagify
```

### Install Dependencies

#### Server Setup
```bash
cd server
npm install
```

#### Client Setup
```bash
cd client
npm install
```

## ⚙️ Configuration

### Server Configuration

1. Navigate to `server` directory:
```bash
cd server
```

2. Create/update `.env` file with the following variables:

```env
# JWT Configuration
JWT_SECRET=your-secret-key

# MongoDB Setup
MONGODB_URI=mongodb://localhost:27017

# ClipDrop API (for image generation)
CLIPDROP_API=your-clipdrop-api-key

# Razorpay Payment Gateway
CURRENCY=INR
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Stripe Payment Gateway
STRIPE_SECRET_KEY=your-stripe-secret-key

# Server Port
PORT=4000
```

### Client Configuration

1. Navigate to `client` directory:
```bash
cd client
```

2. Create/update `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

## 🚀 Usage

### Start the Development Servers

#### Terminal 1 - Start Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:4000`

#### Terminal 2 - Start Frontend Dev Server
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

### Build for Production

#### Build Frontend
```bash
cd client
npm run build
```

#### Build Backend
The server is production-ready with `npm start`

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/credits` | Get user credits (requires auth) |
| POST | `/pay-razor` | Create Razorpay order (requires auth) |
| POST | `/verify-razor` | Verify Razorpay payment |
| POST | `/pay-stripe` | Create Stripe session (requires auth) |
| POST | `/verify-stripe` | Verify Stripe payment (requires auth) |

### Image Routes (`/api/image`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-image` | Generate image from prompt (requires auth) |

#### Example Request - Generate Image
```bash
curl -X POST http://localhost:4000/api/image/generate-image \
  -H "Content-Type: application/json" \
  -H "token: your-jwt-token" \
  -d '{
    "prompt": "A beautiful sunset over mountains"
  }'
```

## 📁 Project Structure

```
imagify/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context API
│   │   ├── assets/        # Images and SVGs
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js Backend
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middleware
│   ├── configs/           # Configuration files
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env               # Environment variables
│
└── README.md
```

## 🔑 Environment Variables

### Server `.env`

```env
JWT_SECRET=your-jwt-secret-key-here
MONGODB_URI=mongodb://localhost:27017/ai-image
CLIPDROP_API=your-clipdrop-api-key-here
CURRENCY=INR
RAZORPAY_KEY_ID=your-razorpay-key-id-here
RAZORPAY_KEY_SECRET=your-razorpay-key-secret-here
STRIPE_SECRET_KEY=your-stripe-secret-key-here
PORT=4000
```

### Client `.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id-here
```

## 🔐 Getting API Keys

### ClipDrop API
1. Visit [clipdrop.co](https://clipdrop.co)
2. Sign up for an account
3. Go to API Keys section
4. Create and copy your API key
5. Add to server `.env` as `CLIPDROP_API`

### Razorpay
1. Visit [razorpay.com](https://razorpay.com)
2. Create a business account
3. Go to Settings → API Keys
4. Copy Key ID and Key Secret
5. Add to server `.env`

### Stripe
1. Visit [stripe.com](https://stripe.com)
2. Create an account
3. Go to Developers → API Keys
4. Copy Secret Key
5. Add to server `.env` as `STRIPE_SECRET_KEY`

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  creditBalance: Number (default: 5)
}
```

### Transaction Model
```javascript
{
  userId: ObjectId,
  plan: String,
  amount: Number,
  credits: Number,
  payment: Boolean,
  date: Date
}
```

## 🎯 Features Breakdown

### Authentication
- User registration with email and password
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes with auth middleware

### Image Generation
- Real-time image generation via ClipDrop API
- Credit deduction on successful generation
- Automatic mock image fallback on API failure
- Base64 image encoding for client transfer

### Payment System
- Two payment gateway integration (Razorpay & Stripe)
- Flexible credit packages
- Transaction history tracking
- Credit verification before image generation

### UI Features
- Responsive design for all devices
- Toast notifications for user feedback
- Loading states during image generation
- Error handling and validation
- Beautiful gradient animations

## 🐛 Troubleshooting

### Issue: ClipDrop API returns 402 error
**Solution:** Your ClipDrop account has insufficient credits. Purchase credits from ClipDrop dashboard.

### Issue: Images not generating
**Solution:** Check that all API keys are correctly configured in `.env` file. Restart the server after updating `.env`.

### Issue: MongoDB connection failed
**Solution:** Ensure MongoDB is running locally on port 27017 or update `MONGODB_URI` with your MongoDB Atlas connection string.

### Issue: CORS errors
**Solution:** Ensure backend is running on correct port and frontend is configured with correct `VITE_BACKEND_URL`.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**OPJASH448**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue on [GitHub](https://github.com/OPJASH448/image-generation/issues).

---

**Happy Image Generation! 🎨✨**
