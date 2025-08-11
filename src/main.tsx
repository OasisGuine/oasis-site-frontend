import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'
import App from './App'
import '@fontsource/baloo-2/400.css'
import '@fontsource/baloo-2/600.css'
import '@fontsource/baloo-2/700.css'
import '@fontsource/baloo-2/800.css'
import './globals.css'
import './styles.scss'
import './i18n'

const initApp = async () => {
  const stripe = await getStripe()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </BrowserRouter>
    </React.StrictMode>
  )
}

initApp().catch(console.error)