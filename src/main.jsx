import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'
import { ItemsProvider } from './context/ItemsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </BrowserRouter>
  </StrictMode>,
)
