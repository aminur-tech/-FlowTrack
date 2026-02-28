import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthProvider'
import { RouterProvider } from 'react-router'
import { routes } from './routes/route'
import { Toaster } from 'react-hot-toast'
import { SearchProvider } from './hooks/SearchContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SearchProvider> */}
    <SearchProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Toaster position='top-right' />
      </AuthProvider>
    </SearchProvider>
  </StrictMode>,
)
