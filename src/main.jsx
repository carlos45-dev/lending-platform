import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SignUp from './pages/Signup.jsx';
import SignIn from './pages/SignIn.jsx';
import HomePage from './pages/HomePage.jsx';
import Profile from './pages/Profile.jsx';
import LendPage from './pages/LendPage.jsx';
import BorrowPage from './pages/BorrowPage.jsx';
import LoanHistory from './pages/LoanHistory.jsx';
import View from './pages/View.jsx';
import Contact from './pages/Contact.jsx';
import TrackPayments from './pages/TrackPayments.jsx';
import MarkAsPaid from './pages/MarkPaid.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TermsPage from './pages/Terms.jsx';
import AddOfferPage from './pages/AddOfferPage.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import { UserProvider } from './UserContext.jsx'; 
import PrivateRoute from './PrivateRoute.jsx';

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },

  { path: "/home", element: <PrivateRoute><HomePage /></PrivateRoute> },
  { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
  { path: "/lend", element: <PrivateRoute><LendPage /></PrivateRoute> },
  { path: "/borrow", element: <PrivateRoute><BorrowPage /></PrivateRoute> },
  { path: "/view", element: <PrivateRoute><View /></PrivateRoute> },
  { path: "/loan-history", element: <PrivateRoute><LoanHistory /></PrivateRoute> },
  { path: "/contact", element: <PrivateRoute><Contact /></PrivateRoute> },
  { path: "/track-payments", element: <PrivateRoute><TrackPayments /></PrivateRoute> },
  { path: "/mark-paid", element: <PrivateRoute><MarkAsPaid /></PrivateRoute> },
  { path: "/add-offer", element: <PrivateRoute><AddOfferPage /></PrivateRoute> },
  { path: "/verify-email", element: <PrivateRoute><VerifyEmail /></PrivateRoute> },

  { path: "/about", element: <AboutPage /> },
  { path: "/terms", element: <TermsPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider> 
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
