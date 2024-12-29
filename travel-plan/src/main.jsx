import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Header from './components/custom/Header.jsx'
import SearchPage from './search-page/searchPage.jsx'
import GeneratePage from './generate-page/GeneratePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/search-page",
    element: <SearchPage />
  },

  {
    path: "/generate-page",
    element: <GeneratePage />
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Header />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
