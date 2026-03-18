import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {isNull} from "lodash";

const root: HTMLElement | null = document.getElementById('root')
if (isNull(root)) {
    throw new Error("Root element not found")
}
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
