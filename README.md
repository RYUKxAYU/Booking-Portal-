# 🎫 Event Booking Portal

A modern, visually stunning event booking platform built with React and Vite. Features an immersive **Art Deco Cinema Lobby** design aesthetic with a 3D Audi R8 background, smooth animations, and a premium user experience.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?style=flat-square&logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🎨 Design & UI
- **Art Deco Aesthetic** - Bold geometric patterns, gold accents, and cinema lobby vibes
- **Immersive 3D Background** - Interactive Audi R8 model using React Three Fiber
- **Glassmorphism Effects** - Modern frosted glass UI components
- **Smooth Animations** - Micro-interactions and page transitions
- **Responsive Design** - Seamless experience across all devices

### 🔐 Authentication
- User login/logout functionality
- Session persistence with localStorage
- Role-based access control (User/Admin)
- Protected route handling

### 📅 Event Management
- Browse and search events by category
- Detailed event pages with booking
- Real-time seat availability tracking
- Multiple event categories: Music, Technology, Art, Entertainment, Health, Food

### 👤 User Dashboard
- View booked events
- Manage personal bookings
- Cancel reservations

### ⚙️ Admin Panel
- Create new events
- Edit existing events
- Delete events
- Monitor bookings and seat availability

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RYUKxAYU/Booking-Portal-.git
   cd Booking-Portal-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
Booking Portal/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and media files
│   ├── components/         # Reusable UI components
│   │   ├── Background3D.jsx    # 3D Audi R8 background
│   │   ├── EventCard.jsx       # Event display card
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── RequireAuth.jsx     # Route protection HOC
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx     # Authentication state
│   │   └── EventContext.jsx    # Event data management
│   ├── pages/              # Application pages
│   │   ├── Admin.jsx           # Admin dashboard
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── EventDetails.jsx    # Event detail view
│   │   ├── Home.jsx            # Homepage/event listing
│   │   └── Login.jsx           # Login page
│   ├── utils/              # Utility functions
│   │   └── mockData.js         # Sample event data
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── Audi R8/                # 3D model assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2 |
| **Build Tool** | Vite 7.2 |
| **Styling** | TailwindCSS 4.1 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Routing** | React Router DOM 7.10 |
| **Linting** | ESLint 9.39 |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **User** | `user@example.com` | Any password |
| **Admin** | `admin@example.com` | Any password |

> **Note:** Any email containing "admin" grants admin privileges.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎭 Event Categories

- 🎵 **Music** - Jazz nights, rock concerts, live performances
- 💻 **Technology** - Conferences, hackathons, tech talks
- 🎨 **Art** - Exhibitions, galleries, creative workshops
- 🎬 **Entertainment** - Comedy shows, theater, performances
- 🧘 **Health** - Yoga retreats, wellness seminars
- 🍳 **Food** - Culinary classes, food festivals, tastings

---

## 🌟 Key Design Decisions

### Art Deco Cinema Lobby Theme
The design draws inspiration from 1920s Art Deco architecture, featuring:
- Geometric patterns and angular shapes
- Gold and brass color accents
- Deep, rich background colors
- Cinema lobby atmosphere with dramatic lighting

### 3D Background
An interactive Audi R8 model serves as a dynamic background element, rendered using:
- **React Three Fiber** for React integration
- **@react-three/drei** for enhanced 3D helpers
- Optimized for performance with lazy loading

### State Management
- **Context API** for global state (Auth & Events)
- **localStorage** for session persistence
- No external state management libraries needed

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**RYUKxAYU**

- GitHub: [@RYUKxAYU](https://github.com/RYUKxAYU)

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
