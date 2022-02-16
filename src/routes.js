import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./pages/Home"
import Watch from "./pages/Watch"

export default () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/watch" component={Watch} />
            </Switch>
        </BrowserRouter>
    );
}