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
            <Route path="/" component={homePage} exact={true} />                            {/*Route for home page*/}
            <Route path="/checkInInfo" component={checkInPage} />                           {/*Route for checkIn page*/}
            <Route path="/checkOutPage/:uniqId" component={checkOutPage} />                 {/*Route for visitorCard page*/}
            <Route path="/addHost" component={addHostPage} />                               {/*Route for addHost page*/}
            <Route component={notFoundPage} />                                              {/*Route for defaul not found page*/}
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
