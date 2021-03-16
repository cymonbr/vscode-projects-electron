import React from "react";
import { Route, BrowserRouter } from 'react-router-dom';

import { Dashboard } from './pages';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Dashboard} path="/" exact />
        </BrowserRouter>
    );
}

export default Routes;