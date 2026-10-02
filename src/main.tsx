import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProgrammePage } from './components/Programme.tsx'
import { programme } from './config/event.ts'

// One hidden page, so no router: Vercel already sends every path to index.html.
const path = window.location.pathname.replace(/\/+$/, '')
const isProgramme = path === programme.path

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isProgramme ? <ProgrammePage /> : <App />}
  </StrictMode>,
)
