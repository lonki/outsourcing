import { loadIntlPolyfill, loadIntlLocaleData } from './localeData';
import Util from './util';

const defaultLocale = 'en';

export async function loadResourceStrings(lang) {
  let langResource;
  let finalLang = lang;

  switch (finalLang) {
    case 'en': {
      langResource = await import(/* webpackChunkName: "lang.en" */ './locales/en');
      break;
    }

    default: {
      langResource = await import(/* webpackChunkName: "lang.en" */ './locales/en');
      finalLang = 'en';
    }
  }

  await loadIntlPolyfill(finalLang);
  await loadIntlLocaleData(finalLang);

  return [finalLang, langResource.default];
}

export function getDefaultLocale(locale) {
  const userLang = locale || Util.getURLParam('lang') || navigator.language || navigator.userLanguage || defaultLocale;
  return userLang.toLowerCase();
}
