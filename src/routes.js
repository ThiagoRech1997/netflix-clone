import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from "./pages/Login"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Movie from "./pages/Movie"

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/watch" exact component={Home} />
                <Route path="/watch/play" component={Watch} />
                <Route path="/watch/:id/:name" component={Movie} />
            </Switch>
        </BrowserRouter>
    );
}