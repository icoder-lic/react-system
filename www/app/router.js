import React from "react";
import { ConnectedRouter } from "react-router-redux";
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';

const history = createHistory();

import Index from "./containers/Index.js";
import InfoList from "./columns/show/InfoList";
import AddInfo from "./columns/do/AddInfo";

export default () => {
	return <ConnectedRouter history={history}>
		<div>
			<Route exact path="/" component={Index} />
			<Route exact path="/show/table" component={InfoList} />
			<Route exact path="/do/form" component={AddInfo} />
		</div>
	</ConnectedRouter>
}