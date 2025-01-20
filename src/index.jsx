import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import PromisePolyfill from 'promise-polyfill'
import { BrowserRouter } from 'react-router-dom'
import store from './utils/stateStore.js'
import { Provider } from 'react-redux'
import './index.css'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
