import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ToDo from './Components/pages/ToDo/ToDo';
import SingleTask from './Components/pages/singleTask';
import Register from './Components/pages/Register/Register';
import Login from "./Components/pages/Login/Login";
import NotFound from './Components/pages/notFound';
import CustomRoute from './Components/CustomRoute';
import UserInfo from "./Components/pages/UserInfo/UserInfo";
import Contact from './Components/pages/Contact';
import About from "./Components/pages/AboutUs";

const Routes = () => {
    return(
        <Switch>
            <CustomRoute path='/' type='private' exact component={ToDo} />
            <CustomRoute path='/task/:id' type='private' exact component={SingleTask} />
            <CustomRoute path='/userInfo' type='private' exact component={UserInfo} />
            <CustomRoute path='/register' exact component={Register} />
            <CustomRoute path='/login' exact component={Login} />
            <Route path='/contact' exact component={Contact} />
            <Route path='/about' exact component={About} />
            <Route path='/not-found' exact component={NotFound} />
            <Redirect to='/not-found' />
        </Switch>
    );
}

export default Routes;