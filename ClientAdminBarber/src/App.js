import React, { useEffect } from 'react';
import '../src/assets/css/laptopdesktop.css';
import '../src/assets/css/stylemobile.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from '../src/Admin/Admin'
import Login from '../src/Admin/Login'
import Sigup from '../src/Admin/SignUp'
import withAuth from '../src/Admin/withAuth'
import withAuthLogin from '../src/Admin/withAuthLogin'

function App() {
    useEffect(() => {
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin" component={withAuth(Admin)}></Route>
                <Route path="/login" component={withAuthLogin(Login)}></Route>
                <Route path="/signup" component={withAuthLogin(Sigup)}></Route>

            </Switch>
        </BrowserRouter>

    );
}

export default App;
