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
  | 'blog.keepLearning'
  | 'legal.translationNotice'
  | 'legal.viewEnglish';

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
  'legal.translationNotice':
    'This page has been translated for your convenience. In case of any discrepancy, the English version is authoritative.',
  'legal.viewEnglish': 'View the English version',
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
  'legal.translationNotice':
    'Esta página ha sido traducida por comodidad. En caso de discrepancia, la versión en inglés prevalece.',
  'legal.viewEnglish': 'Ver la versión en inglés',
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
  'legal.translationNotice':
    'Esta página foi traduzida para sua conveniência. Em caso de discrepância, a versão em inglês prevalece.',
  'legal.viewEnglish': 'Ver a versão em inglês',
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
  'legal.translationNotice':
    'このページは利便性のために翻訳されています。内容に相違がある場合は、英語版が優先されます。',
  'legal.viewEnglish': '英語版を見る',
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
  'legal.translationNotice':
    "Cette page a été traduite pour votre confort. En cas de divergence, la version anglaise fait foi.",
  'legal.viewEnglish': 'Voir la version anglaise',
};

const de: Dictionary = {
  'nav.simulator': 'Trading-Simulator',
  'nav.chartSimulator': 'Chart-Simulator',
  'nav.markets': 'Märkte',
  'nav.analytics': 'Analysen',
  'nav.learn': 'Lernen',
  'nav.live': 'Live',
  'nav.toggleFullscreen': 'Vollbild umschalten',
  'nav.toggleTheme': 'Hell-/Dunkelmodus umschalten',
  'nav.startTrading': 'Jetzt Traden',
  'nav.menu': 'Menü',
  'footer.tagline': 'Üben Sie den Markt. Meistern Sie das Spiel. Kostenloses virtuelles Trading — keine Anmeldung nötig.',
  'footer.product': 'Produkt',
  'footer.company': 'Unternehmen',
  'footer.legal': 'Rechtliches',
  'footer.rights': 'Alle Rechte vorbehalten.',
  'footer.disclaimerText':
    'Stockade ist ausschließlich eine Simulationsplattform. Sämtlicher Handel erfolgt mit virtuellem Geld. Dies ist keine Finanzberatung. Vergangene simulierte Ergebnisse lassen keine Rückschlüsse auf zukünftige reale Ergebnisse zu.',
  'footer.nav.about': 'Über uns',
  'footer.nav.contact': 'Kontakt',
  'footer.nav.privacy': 'Datenschutz',
  'footer.nav.terms': 'AGB',
  'footer.nav.disclaimer': 'Haftungsausschluss',
  'cookie.text':
    'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und relevante Werbung anzuzeigen. Durch die Nutzung dieser Website stimmen Sie unserer Verwendung von Cookies zu. Lesen Sie unsere',
  'cookie.privacyLinkText': 'Datenschutzrichtlinie',
  'cookie.reject': 'Nicht essenzielle ablehnen',
  'cookie.accept': 'Akzeptieren',
  'cookie.ariaLabel': 'Cookie-Zustimmung',
  'home.stats.startingBalance': 'Startguthaben',
  'home.stats.tradableAssets': 'Handelbare Assets',
  'home.stats.assetClasses': 'Anlageklassen',
  'home.stats.costToStart': 'Startkosten',
  'blog.onThisPage': 'Auf dieser Seite',
  'blog.tableOfContents': 'Inhaltsverzeichnis',
  'blog.learningCenter': 'Lernzentrum',
  'blog.minRead': 'Min. Lesezeit',
  'blog.keepLearning': 'Weiterlernen',
  'legal.translationNotice':
    'Diese Seite wurde zu Ihrer Bequemlichkeit übersetzt. Im Falle von Abweichungen ist die englische Version maßgeblich.',
  'legal.viewEnglish': 'Englische Version ansehen',
};

const ko: Dictionary = {
  'nav.simulator': '트레이딩 시뮬레이터',
  'nav.chartSimulator': '차트 시뮬레이터',
  'nav.markets': '마켓',
  'nav.analytics': '분석',
  'nav.learn': '학습',
  'nav.live': '실시간',
  'nav.toggleFullscreen': '전체화면 전환',
  'nav.toggleTheme': '라이트/다크 모드 전환',
  'nav.startTrading': '거래 시작하기',
  'nav.menu': '메뉴',
  'footer.tagline': '시장을 연습하세요. 게임을 정복하세요. 무료 가상 트레이딩 — 가입 불필요.',
  'footer.product': '제품',
  'footer.company': '회사',
  'footer.legal': '법적 정보',
  'footer.rights': '모든 권리 보유.',
  'footer.disclaimerText':
    'Stockade는 시뮬레이션 플랫폼입니다. 모든 거래는 가상 자금으로 이루어집니다. 이는 투자 자문이 아닙니다. 과거 시뮬레이션 성과는 미래의 실제 결과를 나타내지 않습니다.',
  'footer.nav.about': '회사 소개',
  'footer.nav.contact': '문의하기',
  'footer.nav.privacy': '개인정보처리방침',
  'footer.nav.terms': '이용약관',
  'footer.nav.disclaimer': '면책조항',
  'cookie.text':
    '저희는 사용자 경험을 개선하고 관련 광고를 제공하기 위해 쿠키를 사용합니다. 본 사이트를 이용하면 쿠키 사용에 동의하는 것으로 간주됩니다. 자세한 내용은',
  'cookie.privacyLinkText': '개인정보처리방침',
  'cookie.reject': '필수 외 거부',
  'cookie.accept': '동의',
  'cookie.ariaLabel': '쿠키 동의',
  'home.stats.startingBalance': '시작 자금',
  'home.stats.tradableAssets': '거래 가능 자산',
  'home.stats.assetClasses': '자산군',
  'home.stats.costToStart': '시작 비용',
  'blog.onThisPage': '이 페이지에서',
  'blog.tableOfContents': '목차',
  'blog.learningCenter': '학습 센터',
  'blog.minRead': '분 읽기',
  'blog.keepLearning': '계속 학습하기',
  'legal.translationNotice':
    '이 페이지는 편의를 위해 번역되었습니다. 내용에 차이가 있는 경우 영어 버전이 우선합니다.',
  'legal.viewEnglish': '영어 버전 보기',
};

const it: Dictionary = {
  'nav.simulator': 'Simulatore di Trading',
  'nav.chartSimulator': 'Simulatore di Grafici',
  'nav.markets': 'Mercati',
  'nav.analytics': 'Analisi',
  'nav.learn': 'Impara',
  'nav.live': 'Live',
  'nav.toggleFullscreen': 'Attiva/disattiva schermo intero',
  'nav.toggleTheme': 'Attiva/disattiva modalità chiara/scura',
  'nav.startTrading': 'Inizia a Fare Trading',
  'nav.menu': 'Menu',
  'footer.tagline': 'Esercitati sul mercato. Domina il gioco. Trading virtuale gratuito — nessuna registrazione richiesta.',
  'footer.product': 'Prodotto',
  'footer.company': 'Azienda',
  'footer.legal': 'Legale',
  'footer.rights': 'Tutti i diritti riservati.',
  'footer.disclaimerText':
    'Stockade è solo una piattaforma di simulazione. Tutte le operazioni vengono effettuate con denaro virtuale. Questo non è un consiglio finanziario. Le performance simulate passate non indicano risultati reali futuri.',
  'footer.nav.about': 'Chi siamo',
  'footer.nav.contact': 'Contatti',
  'footer.nav.privacy': 'Privacy',
  'footer.nav.terms': 'Termini',
  'footer.nav.disclaimer': 'Disclaimer',
  'cookie.text':
    'Utilizziamo i cookie per migliorare la tua esperienza e mostrare annunci pertinenti. Utilizzando questo sito, accetti il nostro uso dei cookie. Leggi la nostra',
  'cookie.privacyLinkText': 'Informativa sulla Privacy',
  'cookie.reject': 'Rifiuta non essenziali',
  'cookie.accept': 'Accetta',
  'cookie.ariaLabel': 'Consenso ai cookie',
  'home.stats.startingBalance': 'Saldo Iniziale',
  'home.stats.tradableAssets': 'Asset Negoziabili',
  'home.stats.assetClasses': 'Classi di Asset',
  'home.stats.costToStart': 'Costo per Iniziare',
  'blog.onThisPage': 'In questa pagina',
  'blog.tableOfContents': 'Indice',
  'blog.learningCenter': 'Centro di Apprendimento',
  'blog.minRead': 'min di lettura',
  'blog.keepLearning': 'Continua a imparare',
  'legal.translationNotice':
    'Questa pagina è stata tradotta per tua comodità. In caso di discrepanza, prevale la versione in inglese.',
  'legal.viewEnglish': 'Visualizza la versione in inglese',
};

export const translations: Record<Locale, Dictionary> = {
  en,
  es,
  ja,
  fr,
  de,
  pt,
  ko,
  it,
};

export function t(locale: Locale, key: UiKey): string {
  return translations[locale]?.[key] ?? translations.en[key]!;
}
