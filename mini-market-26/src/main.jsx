import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import ClickSpark from '@/components/reactbits/ClickSpark'
import { CartProvider } from '@/context/CartProvider'
import '@/styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ClickSpark sparkColor="#ffc72c" sparkSize={11} sparkRadius={24} sparkCount={9} duration={520}>
          <App />
        </ClickSpark>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
