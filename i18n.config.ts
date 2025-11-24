import enLanguage from './locales/en.json';
import viLanguage from './locales/vi.json';

export default defineI18nConfig(() => ({
  fallbackLocale: 'vi',
  messages: {
    en: enLanguage,
    vi: viLanguage
  }
}));
