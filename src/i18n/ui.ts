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
  | 'footer.nav.about'
  | 'footer.nav.contact'
  | 'footer.nav.privacy'
  | 'footer.nav.terms'
  | 'footer.nav.disclaimer'
  | 'cookie.text'
  | 'cookie.privacyLinkText'
  | 'cookie.reject'
  | 'cookie.accept'
  | 'cookie.ariaLabel'
  | 'home.stats.startingBalance'
  | 'home.stats.tradableAssets'
  | 'home.stats.assetClasses'
  | 'home.stats.costToStart'
  | 'blog.onThisPage'
  | 'blog.tableOfContents'
  | 'blog.learningCenter'
  | 'blog.minRead'
  | 'blog.keepLearning';

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
  'footer.nav.about': 'About',
  'footer.nav.contact': 'Contact',
  'footer.nav.privacy': 'Privacy',
  'footer.nav.terms': 'Terms',
  'footer.nav.disclaimer': 'Disclaimer',
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
  'blog.onThisPage': 'On this page',
  'blog.tableOfContents': 'Table of contents',
  'blog.learningCenter': 'Learning Center',
  'blog.minRead': 'min read',
  'blog.keepLearning': 'Keep learning',
};

const es: Dictionary = {
  'nav.simulator': 'Simulador de Trading',
  'nav.chartSimulator': 'Simulador de Gráficos',
  'nav.markets': 'Mercados',
  'nav.analytics': 'Análisis',
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
  'footer.nav.about': 'Acerca de',
  'footer.nav.contact': 'Contacto',
  'footer.nav.privacy': 'Privacidad',
  'footer.nav.terms': 'Términos',
  'footer.nav.disclaimer': 'Descargo de Responsabilidad',
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
  'blog.onThisPage': 'En esta página',
  'blog.tableOfContents': 'Tabla de contenidos',
  'blog.learningCenter': 'Centro de Aprendizaje',
  'blog.minRead': 'min de lectura',
  'blog.keepLearning': 'Sigue aprendiendo',
};

const pt: Dictionary = {
  'nav.simulator': 'Simulador de Trading',
  'nav.chartSimulator': 'Simulador de Gráficos',
  'nav.markets': 'Mercados',
  'nav.analytics': 'Análises',
  'nav.learn': 'Aprender',
  'nav.live': 'Ao vivo',
  'nav.toggleFullscreen': 'Alternar tela cheia',
  'nav.toggleTheme': 'Alternar modo claro/escuro',
  'nav.startTrading': 'Começar a Operar',
  'nav.menu': 'Menu',
  'footer.tagline': 'Pratique o mercado. Domine o jogo. Trading virtual grátis — sem necessidade de cadastro.',
  'footer.product': 'Produto',
  'footer.company': 'Empresa',
  'footer.legal': 'Legal',
  'footer.rights': 'Todos os direitos reservados.',
  'footer.disclaimerText':
    'Stockade é apenas uma plataforma de simulação. Todas as operações são feitas com dinheiro virtual. Isto não é aconselhamento financeiro. O desempenho simulado passado não indica resultados reais futuros.',
  'footer.nav.about': 'Sobre',
  'footer.nav.contact': 'Contato',
  'footer.nav.privacy': 'Privacidade',
  'footer.nav.terms': 'Termos',
  'footer.nav.disclaimer': 'Aviso Legal',
  'cookie.text':
    'Usamos cookies para melhorar sua experiência e exibir anúncios relevantes. Ao usar este site, você concorda com nosso uso de cookies. Leia nossa',
  'cookie.privacyLinkText': 'Política de Privacidade',
  'cookie.reject': 'Rejeitar não essenciais',
  'cookie.accept': 'Aceitar',
  'cookie.ariaLabel': 'Consentimento de cookies',
  'home.stats.startingBalance': 'Saldo Inicial',
  'home.stats.tradableAssets': 'Ativos Negociáveis',
  'home.stats.assetClasses': 'Classes de Ativos',
  'home.stats.costToStart': 'Custo para Começar',
  'blog.onThisPage': 'Nesta página',
  'blog.tableOfContents': 'Índice',
  'blog.learningCenter': 'Centro de Aprendizado',
  'blog.minRead': 'min de leitura',
  'blog.keepLearning': 'Continue aprendendo',
};

const ja: Dictionary = {
  'nav.simulator': 'トレーディングシミュレーター',
  'nav.chartSimulator': 'チャートシミュレーター',
  'nav.markets': 'マーケット',
  'nav.analytics': '分析',
  'nav.learn': '学ぶ',
  'nav.live': 'ライブ',
  'nav.toggleFullscreen': '全画面表示を切り替え',
  'nav.toggleTheme': 'ライト/ダークモードを切り替え',
  'nav.startTrading': '取引を始める',
  'nav.menu': 'メニュー',
  'footer.tagline': 'マーケットを練習する。ゲームを制覇する。無料の仮想トレーディング — 登録不要。',
  'footer.product': '製品',
  'footer.company': '会社',
  'footer.legal': '法的情報',
  'footer.rights': '全著作権所有。',
  'footer.disclaimerText':
    'Stockadeはシミュレーションプラットフォームです。すべての取引は仮想資金で行われます。これは投資助言ではありません。過去のシミュレーション実績は将来の実際の結果を示すものではありません。',
  'footer.nav.about': '会社概要',
  'footer.nav.contact': 'お問い合わせ',
  'footer.nav.privacy': 'プライバシー',
  'footer.nav.terms': '利用規約',
  'footer.nav.disclaimer': '免責事項',
  'cookie.text':
    'エクスペリエンスの向上と関連広告の配信のためにCookieを使用しています。本サイトを利用することで、Cookieの使用に同意したことになります。詳しくは',
  'cookie.privacyLinkText': 'プライバシーポリシー',
  'cookie.reject': '非必須を拒否',
  'cookie.accept': '同意する',
  'cookie.ariaLabel': 'Cookieの同意',
  'home.stats.startingBalance': '初期資金',
  'home.stats.tradableAssets': '取引可能資産数',
  'home.stats.assetClasses': '資産クラス数',
  'home.stats.costToStart': '開始費用',
  'blog.onThisPage': 'このページの内容',
  'blog.tableOfContents': '目次',
  'blog.learningCenter': '学習センター',
  'blog.minRead': '分で読了',
  'blog.keepLearning': '学習を続ける',
};

const fr: Dictionary = {
  'nav.simulator': 'Simulateur de Trading',
  'nav.chartSimulator': 'Simulateur de Graphiques',
  'nav.markets': 'Marchés',
  'nav.analytics': 'Analyses',
  'nav.learn': 'Apprendre',
  'nav.live': 'En direct',
  'nav.toggleFullscreen': 'Basculer le plein écran',
  'nav.toggleTheme': 'Basculer le mode clair/sombre',
  'nav.startTrading': 'Commencer à Trader',
  'nav.menu': 'Menu',
  'footer.tagline': 'Entraînez-vous sur le marché. Maîtrisez le jeu. Trading virtuel gratuit — sans inscription.',
  'footer.product': 'Produit',
  'footer.company': 'Entreprise',
  'footer.legal': 'Mentions légales',
  'footer.rights': 'Tous droits réservés.',
  'footer.disclaimerText':
    'Stockade est uniquement une plateforme de simulation. Toutes les opérations sont effectuées avec de l\'argent virtuel. Ceci ne constitue pas un conseil financier. Les performances simulées passées ne préjugent pas des résultats réels futurs.',
  'footer.nav.about': 'À propos',
  'footer.nav.contact': 'Contact',
  'footer.nav.privacy': 'Confidentialité',
  'footer.nav.terms': 'Conditions',
  'footer.nav.disclaimer': 'Avertissement',
  'cookie.text':
    'Nous utilisons des cookies pour améliorer votre expérience et diffuser des publicités pertinentes. En utilisant ce site, vous acceptez notre utilisation des cookies. Lisez notre',
  'cookie.privacyLinkText': 'Politique de Confidentialité',
  'cookie.reject': 'Refuser les non essentiels',
  'cookie.accept': 'Accepter',
  'cookie.ariaLabel': 'Consentement aux cookies',
  'home.stats.startingBalance': 'Solde de Départ',
  'home.stats.tradableAssets': 'Actifs Négociables',
  'home.stats.assetClasses': "Classes d'Actifs",
  'home.stats.costToStart': 'Coût de Démarrage',
  'blog.onThisPage': 'Sur cette page',
  'blog.tableOfContents': 'Table des matières',
  'blog.learningCenter': "Centre d'Apprentissage",
  'blog.minRead': 'min de lecture',
  'blog.keepLearning': "Continuer l'apprentissage",
};

export const translations: Record<Locale, Dictionary> = {
  en,
  es,
  ja,
  fr,
  de: {},
  pt,
  ko: {},
  it: {},
};

export function t(locale: Locale, key: UiKey): string {
  return translations[locale]?.[key] ?? translations.en[key]!;
}
