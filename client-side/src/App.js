import React, {useState} from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/nav';
import Home from './home'
import Auth from './components/Auth/user'
function App() {


    return (
        <Router>
            <Container maxWidth='lg'>
                <Nav />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={Auth} />
                </Switch>
                {/* <Home /> */}
            </Container>
        </Router>

    )
}

export default App
