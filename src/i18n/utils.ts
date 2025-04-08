export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}

export function useTranslations(lang: string) {
  return function t(key: string) {
    const translations = {
      'nav.amenities': {
        en: 'Amenities',
        es: 'Amenidades'
      },
      'nav.location': {
        en: 'Location',
        es: 'Ubicación'
      },
      'nav.pricing': {
        en: 'Pricing',
        es: 'Cotizador'
      },
      'nav.masterplan': {
        en: 'Master Plan',
        es: 'Plan Maestro'
      },
      'nav.contact': {
        en: 'Contact',
        es: 'Contacto'
      }
    };
    return translations[key][lang];
  };
}