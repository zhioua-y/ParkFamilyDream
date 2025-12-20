# Family Dream Restaurant - React Application

This is a React-based frontend-only conversion of the original PHP/HTML Family Dream restaurant website.

## 🚀 Features

- **Public Pages**
  - Home page with featured items
  - Menu page displaying food items
  - Coffee menu page
  - Contact form

- **Authentication System**
  - Login with role-based access (Admin/Employee)
  - Protected routes for authenticated users
  - Session persistence with localStorage

- **Admin Dashboard**
  - Manage employees
  - Add/view food items
  - Add/view coffee items
  - View customer messages

- **Employee Dashboard**
  - View personal information
  - Send messages to admin

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd park-project-react
```

2. Install dependencies:
```bash
npm install
```

## 🎯 Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Demo Credentials

### Admin Access
- **Email:** admin@familydream.com
- **Password:** admin123

### Employee Access
- **Email:** employee@familydream.com
- **Password:** emp123

## 📁 Project Structure

```
park-project-react/
├── public/
│   └── images/              # All restaurant images
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── SideNav.jsx
│   │   ├── Card.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Coffee.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Admin.jsx
│   │   └── Employee.jsx
│   ├── context/             # React Context
│   │   └── AuthContext.jsx
│   ├── data/                # Mock data
│   │   ├── foodData.js
│   │   ├── coffeeData.js
│   │   └── userData.js
│   ├── styles/              # CSS files
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── menu.css
│   │   ├── coffee.css
│   │   ├── contact.css
│   │   ├── login.css
│   │   └── admin.css
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # Entry point
└── package.json
```

## 🔄 PHP to React Conversion

### Replaced PHP Functionality

| Original PHP Feature | React Implementation |
|---------------------|---------------------|
| Database queries (`SELECT * FROM food/coffee`) | Import from mock data files (`foodData.js`, `coffeeData.js`) |
| Session management (`$_SESSION`) | React Context API + localStorage |
| Form POST handling (`$_POST`) | React state + event handlers |
| File uploads | Simulated with file input preview |
| Server-side validation | Client-side validation with React |
| Redirects (`header()`) | React Router navigation |
| Dynamic HTML generation (PHP echo) | JSX with `.map()` |

### Mock Data

All data is stored in JavaScript files under `src/data/`:
- **foodData.js** - Restaurant food items
- **coffeeData.js** - Coffee menu items
- **userData.js** - User accounts, employees, and messages

**Note:** Changes are not persistent and will reset on page reload. For persistent storage, you can:
1. Use browser localStorage/IndexedDB
2. Add a backend API (Node.js, Python, etc.)
3. Use a Backend-as-a-Service (Firebase, Supabase, etc.)

## 🎨 Styling

The application maintains the original design aesthetic with:
- Global styles in `global.css`
- Component-specific styles in separate CSS files
- Responsive design with mobile hamburger menu
- Hover effects and transitions

## 🔒 Security Notes

⚠️ **Important:** This is a frontend-only application with client-side authentication, which is **NOT secure for production use**. 

- Passwords are stored in plain text in `userData.js`
- Authentication can be bypassed by manipulating localStorage
- No server-side validation

This is suitable for:
- Demos and prototypes
- Learning React
- Local development

For production, implement:
- Backend authentication server
- Encrypted password storage
- JWT tokens or session cookies
- Server-side validation

## 📱 Responsive Design

The application is responsive and includes:
- Desktop navigation bar
- Mobile hamburger menu
- Flexible card layouts
- Responsive images

## 🧪 Testing Checklist

- [x] Home page loads correctly
- [x] Navigation between pages works
- [x] Menu page displays food items
- [x] Coffee page displays coffee items
- [x] Contact form validates and submits
- [x] Login with admin credentials redirects to admin dashboard
- [x] Login with employee credentials redirects to employee dashboard
- [x] Admin can add employees, food, and coffee items
- [x] Employee can view info and send messages
- [x] Logout functionality works
- [x] Protected routes redirect to login when not authenticated

## 🚧 Future Enhancements

Potential improvements:
- Add backend API for persistent data
- Implement real authentication with JWT
- Add image upload functionality
- Create shopping cart feature
- Add online ordering system
- Implement email notifications
- Add admin analytics dashboard
- Create customer reviews section

## 📄 License

This project is for educational purposes.

## 👥 Credits

Converted from PHP/HTML to React by AI Assistant
Original design: Family Dream Restaurant
