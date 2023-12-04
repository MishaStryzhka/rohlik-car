import { combineReducers } from 'redux';
import { contactsReducer } from './slice';

export const reducer = combineReducers({
  contacts: contactsReducer,
});
