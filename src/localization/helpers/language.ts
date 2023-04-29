import {
  type LanguageCodes,
  type Languages,
} from '@localization/constants/language';
import {languageFromLanguageCode} from '@localization/helpers/resources';

export const isLanguageCode = (data: unknown): data is LanguageCodes => {
  return (data as string).includes('_');
};

export const getLastSelectedLanguage = (): Languages => {
  const deviceNativeLang = 'id_ID';

  if (isLanguageCode(deviceNativeLang)) {
    return languageFromLanguageCode[deviceNativeLang];
  } else {
    return deviceNativeLang as Languages;
  }
};
