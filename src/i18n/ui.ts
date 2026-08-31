import type { Locale } from './locales';

export type UiKey =
  | 'nav.simulator'
  | 'nav.chartSimulator'
  | 'nav.markets'
  | 'nav.analytics'
  | 'nav.learn'
  | 'nav.live'
  | 'nav.toggleFullscreen'
  | 'nav.toggleTheme'
  | 'nav.startTrading'
  | 'nav.menu'
  | 'footer.tagline'
  | 'footer.product'
  | 'footer.company'
  | 'footer.legal'
  | 'footer.rights'
  | 'footer.disclaimerText'
  | 'cookie.text'
  | 'cookie.privacyLinkText'
  | 'cookie.reject'
  | 'cookie.accept'
  | 'cookie.ariaLabel'
  | 'home.stats.startingBalance'
  | 'home.stats.tradableAssets'
  | 'home.stats.assetClasses'
  | 'home.stats.costToStart';

type Dictionary = Partial<Record<UiKey, string>>;

const en: Dictionary = {
  'nav.simulator': 'Trading Simulator',
  'nav.chartSimulator': 'Chart Simulator',
  'nav.markets': 'Markets',
  'nav.analytics': 'Analytics',
  'nav.learn': 'Learn',
  'nav.live': 'Live',
  'nav.toggleFullscreen': 'Toggle fullscreen',
  'nav.toggleTheme': 'Toggle light/dark mode',
  'nav.startTrading': 'Start Trading',
  'nav.menu': 'Menu',
  'footer.tagline': 'Practice the market. Master the game. Free virtual trading — no signup required.',
  'footer.product': 'Product',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.rights': 'All rights reserved.',
  'footer.disclaimerText':
    'Stockade is a simulation platform only. All trading is done with virtual money. This is not financial advice. Past simulated performance does not indicate future real results.',
  'cookie.text':
    'We use cookies to improve your experience and serve relevant ads. By using this site, you agree to our use of cookies. Read our',
  'cookie.privacyLinkText': 'Privacy Policy',
  'cookie.reject': 'Reject non-essential',
  'cookie.accept': 'Accept',
  'cookie.ariaLabel': 'Cookie consent',
  'home.stats.startingBalance': 'Starting Balance',
  'home.stats.tradableAssets': 'Tradable Assets',
  'home.stats.assetClasses': 'Asset Classes',
  'home.stats.costToStart': 'Cost to Start',
};

const es: Dictionary = {
  'nav.simulator': 'Simulador de Trading',
  'nav.chartSimulator': 'Simulador de Gráficos',
  'nav.markets': 'Mercados',
  'nav.analytics': 'Analítica',
  'nav.learn': 'Aprender',
  'nav.live': 'En vivo',
  'nav.toggleFullscreen': 'Alternar pantalla completa',
  'nav.toggleTheme': 'Alternar modo claro/oscuro',
  'nav.startTrading': 'Empezar a Operar',
  'nav.menu': 'Menú',
  'footer.tagline': 'Practica el mercado. Domina el juego. Trading virtual gratis — sin registro requerido.',
  'footer.product': 'Producto',
  'footer.company': 'Empresa',
  'footer.legal': 'Legal',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.disclaimerText':
    'Stockade es únicamente una plataforma de simulación. Todas las operaciones se realizan con dinero virtual. Esto no es asesoramiento financiero. El rendimiento simulado pasado no indica resultados reales futuros.',
  'cookie.text':
    'Utilizamos cookies para mejorar tu experiencia y mostrar anuncios relevantes. Al usar este sitio, aceptas nuestro uso de cookies. Lee nuestra',
  'cookie.privacyLinkText': 'Política de Privacidad',
  'cookie.reject': 'Rechazar no esenciales',
  'cookie.accept': 'Aceptar',
  'cookie.ariaLabel': 'Consentimiento de cookies',
  'home.stats.startingBalance': 'Balance Inicial',
  'home.stats.tradableAssets': 'Activos Negociables',
  'home.stats.assetClasses': 'Clases de Activos',
  'home.stats.costToStart': 'Costo para Empezar',
};

export const translations: Record<Locale, Dictionary> = {
  en,
  es,
  ja: {},
  fr: {},
  de: {},
  pt: {},
  ko: {},
  it: {},
};

export function t(locale: Locale, key: UiKey): string {
  return translations[locale]?.[key] ?? translations.en[key]!;
}
