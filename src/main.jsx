import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import SignUp from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import HomePage from './pages/HomePage.jsx'
import Profile from './pages/Profile.jsx'
import LendPage from './pages/LendPage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path: "/", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/home", element: <HomePage />},
  {path: "/profile", element: <Profile />},
  {path: "/lend", element: <LendPage />}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
