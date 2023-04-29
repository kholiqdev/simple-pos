import i18n, {type LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';

import {Languages} from '@localization/constants/language';
import {languageResources} from '@localization/helpers/resources';

import {getLastSelectedLanguage} from './helpers/language';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const lastSelectedLang = getLastSelectedLanguage();
    callback(lastSelectedLang);
  },
  init: () => {},
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    compatibilityJSON: 'v3',
    resources: languageResources,
    fallbackLng: Languages.en,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
