import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import App from './App'
import './globals.css'
import './styles.scss'
import './i18n'

const initApp = async () => {
  const stripe = await getStripe()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </BrowserRouter>
    </React.StrictMode>
  )
}

initApp().catch(console.error)