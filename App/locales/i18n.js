import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';
// Import all locales
import en from './en.json';
import pt from './pt-BR.json';

// Should the app fallback to English if user locale doesn't exists
I18n.defaultLocale = "pt-BR";
I18n.currentLocale();

I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  pt
};



console.log(I18n.currentLocale());

// Localizing momentjs to Portuguese or English
//if (currentLocale.indexOf('pt-BR') === 0) {
  //require('moment/locales/pt-BR.json');
  //moment.locale('pt-BR');
//} else {
  //moment.locale('en');
//}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;