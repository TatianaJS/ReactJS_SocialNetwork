import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import './css/index.css'
import 'antd/dist/reset.css'
import SocialNetworkApp from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<SocialNetworkApp />)

reportWebVitals()