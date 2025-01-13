// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import appStore from "./utils/appStore"
import {Provider} from "react-redux"

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  /* </StrictMode>, */
)
