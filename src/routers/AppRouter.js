import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import homePage from '../components/HomePage';
import checkInPage from '../components/CheckInFormPage';
import checkOutPage from '../components/CheckOutPage';
import notFoundPage from '../components/NotFoundPage';
import addHostPage from '../components/createHostPage';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={homePage} exact={true} />
            <Route path="/checkInInfo" component={checkInPage} />
            <Route path="/checkOutPage/:uniqId" component={checkOutPage} />
            <Route path="/addHost" component={addHostPage} />
            <Route component={notFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
