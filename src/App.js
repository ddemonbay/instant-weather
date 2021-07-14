import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { orange, green } from '@material-ui/core/colors';
import Navbar from './data/Navbar.js'
import Content from './data/Content.js'


function App() {
    const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
        main: orange[400],
        },
        secondary: {
        main: green[200],
        },
    },
    });

    const [tab, setTab] = useState(0)

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Navbar tab={tab} setTab={setTab} />
            <Content tab={tab} />
        </ThemeProvider>
    )
}

export default App;
