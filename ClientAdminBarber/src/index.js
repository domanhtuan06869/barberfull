import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import thunk from "redux-thunk";
import reducer from '../src/combinereducers/combineReducers'
import registerServiceWorker, { unregister } from '../src/Admin/registerServiceWorker';
import "react-app-polyfill/ie9"
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import 'raf/polyfill';
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker()
unregister()
