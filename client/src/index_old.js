import React from 'react';

import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import App from './App';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import setAuthoizationToken from './utils/set_authorization_token';
import RootReducer from './rootreducer';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/auth_actions';

import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import EarnPoints from './components/earn_points/earn_points';
import LinkedAccounts from './components/linked_accounts/linked_accounts';




import '../style/bootstrap.min.css';
import '../style/font-awesome.min.css';
import '../style/mycss.css';


const store = createStore(
        RootReducer,
        compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

if(localStorage.jwtToken){
  setAuthoizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}







ReactDOM.render(
	
  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
      <IndexRoute component={Login}/>
       <Route path="/dashboard" component={Dashboard} />
       <Route path="/earnpoints" component={EarnPoints} />
       <Route path="/linkedaccounts" component={LinkedAccounts} />
      }
    	</Route>
    	
    	
    </Router>
  </Provider>
  , document.querySelector('.everything'));
