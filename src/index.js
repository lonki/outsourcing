import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import createStore from './redux/storeCreator';

import route from './route';
import { loadResourceStrings } from './shared/intl/locale';

// third party
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// css normalize
import 'style/css/normalize.css';

// 切板完成後的css放在這
import 'style/css/bundle.css';


async function initApp() {
  const lang = 'en';
  const localeData = await loadResourceStrings(lang);
  const store = createStore({});

  return [...localeData, store];
}

initApp().then((values) => {
  const lang = values[0];
  const localeData = values[1];
  const store = values[2];
  const routes = route();
  const appRoot = document.getElementById('root');

  ReactDOM.render(
    <IntlProvider locale={lang} messages={localeData}>
      <Provider store={store}>
        {routes}
      </Provider>
    </IntlProvider>,
    appRoot,
  );
});
