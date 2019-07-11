import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
//import App from './App';
import Home from './views/home.js';
import Collections from './views/collections.js';
import Explore from './views/inventory.js';

render((
    <BrowserRouter>
        <div style={{height: "100%"}}>
            <Route exact path="/" component={Home} />
            <Route exact path="/collections" component={Collections} />
            <Route exact path="/inventory" component={Explore} />
        </div>
    </BrowserRouter>
    ),document.getElementById('root'));