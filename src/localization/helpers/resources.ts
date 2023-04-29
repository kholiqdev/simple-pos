import {type Resource} from 'i18next';

import {LanguageCodes, Languages} from '@localization/constants/language';
import enJSON from '@localization/locales/en_US.json';
import idJSON from '@localization/locales/id_ID.json';

export const languageResources: Resource = {
  [Languages.en]: {
    translation: enJSON,
  },
  [Languages.id]: {
    translation: idJSON,
  },
};

export const languageFromLanguageCode = {
  [LanguageCodes.en]: Languages.en,
  [LanguageCodes.id]: Languages.id,
};

export const languageCodeFromLanguage = {
  [Languages.en]: LanguageCodes.en,
  [Languages.id]: LanguageCodes.id,
};
