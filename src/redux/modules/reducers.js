import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import member from './member';
import app from './app';

export default () => {
  const appReducer = combineReducers({
    form,
    member,
    app,
  });

  return (state, action) => {
    return appReducer(state, action);
  };
};
