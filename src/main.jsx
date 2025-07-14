import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import SignUp from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import HomePage from './pages/HomePage.jsx'
import Profile from './pages/Profile.jsx'
import LendPage from './pages/LendPage.jsx'
import BorrowPage from './pages/BorrowPage.jsx'
import LoanHistory from './pages/LoanHistory.jsx'
import View from './pages/View.jsx'
import Contact from './pages/Contact.jsx'
import TrackPayments from './pages/TrackPayments.jsx'
import MarkAsPaid from './pages/MarkPaid.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path: "/", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/home", element: <HomePage />},
  {path: "/profile", element: <Profile />},
  {path: "/lend", element: <LendPage />},
  {path: "/borrow", element: <BorrowPage />},
  {path: "/view", element: <View />},
  {path:"/loan-history", element:<LoanHistory />},
  {path:"/contact", element:<Contact />},
  {path:"/track-payments", element:<TrackPayments />},
  {path:"/mark-paid", element:<MarkAsPaid />},
  {path:"/about", element:<AboutPage />}


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
