import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './src/App'

import './index.css'

// Montamos la aplicación
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
