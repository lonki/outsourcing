import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  browserHistory,
} from 'react-router';

import App from './containers/App/App';

// useRouterHistory creates a composable higher-order function
browserHistory.listen(() => {
  const $body = $('html,body');
  $body.scrollTop(0);
});


function asyncGetHome(location, cb) {
  import('./containers/Home/Home').then(module => cb(null, module.default));
}

export default function () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} >

        <IndexRoute getComponent={asyncGetHome} />

        {
          // 使用者亂輸入url, 就一律導回home頁
        }
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  );
}
