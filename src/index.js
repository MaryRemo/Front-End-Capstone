import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Bored from './components/Bored'
import './index.css'

ReactDOM.render(
    <Router>
        <Bored />
    </Router>
    , document.getElementById('root'))
