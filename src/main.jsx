import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import SignUp from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import HomePage from './pages/HomePage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path: "/", element: <SignIn />},
  {path: "/signup", element: <SignUp />},
  {path: "/home", element: <HomePage />}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
