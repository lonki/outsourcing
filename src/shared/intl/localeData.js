import isIntlLocaleSupported from 'intl-locales-supported';
import { addLocaleData } from 'react-intl';

export function loadIntlPolyfill(lang) {
  if (window.Intl && isIntlLocaleSupported(lang)) {
    // all fine: Intl is in the global scope and the locale data is available
    return Promise.resolve();
  }

  console.warn('[Style.me] Intl or locale data for %s not available, downloading the polyfill...', lang);
  return import(/* webpackChunkName: "intl" */ 'intl');
}

export function loadIntlLocaleData(locale) {
  // Returns a promise which is resolved as the required locale-data chunks
  // has been downloaded with webpack's require.ensure. For each language,
  // we make two different chunks: one for browsers supporting `intl` and one
  // for those who don't.
  // The react-intl locale-data is required, for example, by the FormattedRelative
  // component.
  return new Promise((resolve) => {
    const hasIntl = isIntlLocaleSupported(locale);

    // Make sure ReactIntl is in the global scope: this is required for adding locale-data
    // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
    // this require here, when loadIntlPolyfill is supposed to be present
    switch (locale) {
      case 'zh-cn':
        if (!hasIntl) {
          Promise.all([
            import(/* webpackChunkName: "intl/locale-data/jsonp/zh-Hans-CN" */ 'intl/locale-data/jsonp/zh-Hans-CN'),
            import(/* webpackChunkName: "react-intl/locale-data/zh" */ 'react-intl/locale-data/zh'),
          ]).then((data) => {
            addLocaleData(Object.values(data[1]));
            resolve(locale);
            console.warn('Intl and ReactIntl locale-data for %s has been downloaded', locale);
          });
        } else {
          import(/* webpackChunkName: "react-intl/locale-data/zh" */ 'react-intl/locale-data/zh').then(({ default: data }) => {
            addLocaleData(data);
            resolve(locale);
            console.warn('ReactIntl locale-data for %s has been downloaded', locale);
          });
        }
        break;

      case 'zh-tw':
        if (!hasIntl) {
          Promise.all([
            import(/* webpackChunkName: "intl/locale-data/jsonp/zh-Hant-TW" */ 'intl/locale-data/jsonp/zh-Hant-TW'),
            import(/* webpackChunkName: "react-intl/locale-data/zh" */ 'react-intl/locale-data/zh'),
          ]).then((data) => {
            addLocaleData(Object.values(data[1]));
            resolve(locale);
            console.warn('Intl and ReactIntl locale-data for %s has been downloaded', locale);
          });
        } else {
          import(/* webpackChunkName: "react-intl/locale-data/zh" */ 'react-intl/locale-data/zh').then(({ default: data }) => {
            addLocaleData(data);
            resolve(locale);
            console.warn('ReactIntl locale-data for %s has been downloaded', locale);
          });
        }
        break;

      default: // en
        if (!hasIntl) {
          Promise.all([
            import(/* webpackChunkName: "intl/locale-data/jsonp/en" */ 'intl/locale-data/jsonp/en'),
            import(/* webpackChunkName: "react-intl/locale-data/en" */ 'react-intl/locale-data/en'),
          ]).then((data) => {
            addLocaleData(Object.values(data[1]));
            resolve('en');
            console.warn('Intl and ReactIntl locale-data for %s has been downloaded', 'en');
          });
        } else {
          import(/* webpackChunkName: "react-intl/locale-data/en" */ 'react-intl/locale-data/en').then(({ default: data }) => {
            addLocaleData(data);
            resolve('en');
            console.warn('ReactIntl locale-data for %s has been downloaded', 'en');
          });
        }
    }
  });
}
