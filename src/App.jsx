import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom'
import './App.css'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Home from './components/home/Home'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserContext from './components/userContext'

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
       path : '/',
       element : <Navigate to={"/signin"}/>
    },
    {
      path : '/signin',
      element : <Login/>
    },
    {
      path : "/signup",
      element : <Signup/>
    },
    {
      path : "/home",
      element : <Home/>
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext>
      <RouterProvider router={router} />
      </UserContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
