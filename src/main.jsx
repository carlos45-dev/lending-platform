import { StrictMode } from 'react'
import { createRoot, } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignUp from './pages/Signup.jsx'
import SignIn from './pages/SignIn.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([

  {path: "/", element: <SignIn />},
  {path: "/SignUp", element: <SignUp />}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
