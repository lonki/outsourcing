import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './modules/reducers';

export default function (initialState) {

  if (__DEVELOPMENT__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(reducers(), initialState, composeEnhancers(
      applyMiddleware(promiseMiddleware()),
    ));
  }

  return createStore(reducers(), initialState, compose(
    applyMiddleware(promiseMiddleware()),
  ));
}
