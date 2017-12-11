import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import UserProfilePage from './containers/UserProfilePage';
import EventListPage from './containers/EventListPage';
import EventPage from './containers/EventPage';
import EventEditPage from './containers/EventEditPage';
import EventCreatePage from './containers/EventCreatePage';
import NotFoundPage from './components/NotFoundPage';

export default (
	<Switch>
		<Route path="/login" component={LoginPage} />
		<Route path="/register" component={RegisterPage} />
		<Route path="/profile" component={UserProfilePage} />
		<Route path="/events" component={EventListPage} />
		<Route path="/event/:id/edit" component={EventEditPage} />
		<Route exact path="/event/create" component={EventCreatePage} />
		<Route path="/event/:id" component={EventPage} />
		<Route path="/notfound" component={NotFoundPage} />
	</Switch>
);
