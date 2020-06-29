import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ToDo from './todo';
import WrapComponent from  './wrapcomponent'

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={ ToDo }/>
            <Route  exact path="/wrapcomponent" component={ WrapComponent }/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;