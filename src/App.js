import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { ThemeProvider } from 'react-bootstrap'
const App = () => {
    return (
        <ThemeProvider dir={'rtl'}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
