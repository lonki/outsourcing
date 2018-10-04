import { fromJS } from 'immutable';
import { app as cons } from '../constants';

const initialState = fromJS({
  viewPort: '',
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.SET_SECTION_VIEWPORT: {
      return state.merge({
        viewPort: action.viewPort,
      });
    }
    default:
      return state;
  }
}

export function setSectionViewPort(viewPort) {
  return {
    type: cons.SET_SECTION_VIEWPORT,
    viewPort,
  };
}
