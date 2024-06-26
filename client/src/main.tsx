import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Deck from './pages/Deck.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/decks',
    element: <App />,
  },
  {
    path: '/decks/:deckId',
    element: <Deck />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
