import { fromJS } from 'immutable';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { member as cons } from '../constants';

const initialState = fromJS({
  setEmailSubscriptionPending: false,
  setEmailSubscriptionSuc: false,
  setEmailSubscriptionErr: false,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.SET_EMAIL_SUBSCRIPTION_PENDING: {
      return state.merge({
        setEmailSubscriptionPending: true,
        setEmailSubscriptionSuc: false,
        setEmailSubscriptionErr: false,
      });
    }
    case cons.SET_EMAIL_SUBSCRIPTION_FULFILLED: {
      const { msg, result } = action.payload.data;
      if (result === 'success' || msg === 'This email cannot be added to this list. Please enter a different email address.') {
        return state.merge({
          setEmailSubscriptionPending: false,
          setEmailSubscriptionSuc: true,
          setEmailSubscriptionErr: false,
        });
      }
      
      return state.merge({
        setEmailSubscriptionPending: false,
        setEmailSubscriptionSuc: false,
        setEmailSubscriptionErr: true,
      });
    }
    case cons.SET_EMAIL_SUBSCRIPTION_REJECTED:
      return state.merge({
        setEmailSubscriptionPending: false,
        setEmailSubscriptionSuc: false,
        setEmailSubscriptionErr: true,
      });
    default:
      return state;
  }
}

export function setEmailSubscription(email) {
  const url = `https://dinngo.us11.list-manage.com/subscribe/post-json?u=03120e62829169244b4042512&id=911743ef54&EMAIL=${email}&subscribe=Subscribe&${new Date().getMilliseconds()}`;
  return {
    type: 'SET_EMAIL_SUBSCRIPTION',
    payload: {
      promise: axios({
        url,
        adapter: jsonpAdapter,
        callbackParamName: 'c',
      }),
    },
  };
}
