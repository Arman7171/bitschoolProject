import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ToDo from './Components/pages/ToDo/ToDo';
import SingleTask from './Components/pages/singleTask';
import NotFound from './Components/pages/notFound';

const Routes = () => {
    return(
        <Switch>
            <Route path='/' exact component={ToDo} />
            <Route path='/task/:id' exact component={SingleTask} />
            <Route path='/not-found' exact component={NotFound} />
            <Redirect to='/not-found' />
        </Switch>
    );
}

export default Routes;