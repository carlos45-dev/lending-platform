import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import SignUp from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import HomePage from './pages/HomePage.jsx'
import Profile from './pages/Profile.jsx'
import LendPage from './pages/LendPage.jsx'
import BorrowPage from './pages/BorrowPage.jsx'
import TrackPayments from './pages/TrackPayments.jsx'
import View from './pages/View.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path: "/", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/home", element: <HomePage />},
  {path: "/profile", element: <Profile />},
  {path: "/lend", element: <LendPage />},
  {path: "/borrow", element: <BorrowPage />},
  {path: "/view", element: <View />},
  {path:"/track-payments", element:<TrackPayments />}


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
