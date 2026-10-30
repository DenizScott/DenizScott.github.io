import type { L } from './types.ts';

/**
 * Project content. To add a project: append one object to `projects`, put its images in
 * src/assets/projects/<slug>/ and register them in src/lib/media.ts. No component changes needed.
 *
 * Content rules: only verified facts (reference CVs, project documents, real captures).
 * Optional sections that have no verified content are simply omitted and the page hides them.
 */

export type ProjectStatus = 'in-development' | 'paused-beta' | 'independent';
export type Accent = 'blue' | 'teal' | 'violet' | 'magenta';

/** How the project card / hero visual is composed. */
export type CoverKind =
  /** Full-bleed screenshot. */
  | 'image'
  /** A real UI capture shown inside a neutral decorative window frame. */
  | 'window'
  /** A fan of real card designs. */
  | 'cards'
  /** No real media yet: an honest typographic placeholder, never presented as a product shot. */
  | 'placeholder';

export interface GalleryItem {
  /** Media id registered in src/lib/media.ts */
  media: string;
  alt: L<string>;
  caption?: L<string>;
}

export interface TitledBlock {
  title: string;
  body: string;
}

export interface ProjectDetail {
  tagline: string;
  overview: string[];
  idea?: string[];
  role?: string[];
  process?: TitledBlock[];
  features?: TitledBlock[];
  outcome?: string[];
  /** Things that exist only as plans or are not verified. Shown transparently. */
  notClaimed?: string[];
  /** Shown above the gallery to describe how the media should be read. */
  mediaNote?: string;
}

export interface Project {
  id: string;
  slug: string;
  /** 1 = first. The site renders featured projects sorted by this value. */
  featuredOrder: number;
  emphasis: 'lead' | 'standard';
  accent: Accent;
  title: string;
  category: L<string>;
  summary: L<string>;
  /** Only technologies verified in the reference CV or project sources. */
  technologies: string[];
  /** Methods (not a tech stack) used when the exact stack is not documented. */
  approach?: string[];
  status: ProjectStatus;
  cover: { kind: CoverKind; media?: string[] };
  gallery: GalleryItem[];
  /** Real gameplay / demo video. `null` keeps a clearly marked empty slot on the page. */
  video: { src: string; poster?: string } | null;
  links: { github?: string; live?: string };
  detail: L<ProjectDetail>;
}

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'underwake',
    slug: 'underwake',
    featuredOrder: 1,
    emphasis: 'lead',
    accent: 'teal',
    title: 'Underwake',
    category: { en: 'Game Development / Unreal Engine', tr: 'Oyun Geliştirme / Unreal Engine' },
    summary: {
      en: 'A playable Unreal Engine prototype that pairs cinematic storytelling with action mechanics, built around scene flow, interaction systems and Dash/Lasso movement.',
      tr: 'Sinematik anlatımı aksiyon mekanikleriyle buluşturan, Unreal Engine tabanlı oynanabilir bir prototip; sahne akışı, etkileşim sistemleri ve Dash/Lasso hareketleri üzerine kurulu.',
    },
    technologies: ['Unreal Engine'],
    status: 'in-development',
    cover: { kind: 'image', media: ['underwake/street-night'] },
    gallery: [
      {
        media: 'underwake/street-night',
        alt: {
          en: 'Development capture of a night-time city street in Underwake, seen from a first-person view.',
          tr: 'Underwake içinde birinci şahıs bakışıyla gece vakti bir şehir sokağının geliştirme görüntüsü.',
        },
        caption: { en: 'Night street', tr: 'Gece sokağı' },
      },
      {
        media: 'underwake/station-mercer-row',
        alt: {
          en: 'Development capture of the Mercer Row subway platform with a train waiting.',
          tr: 'Tren bekleyen Mercer Row metro peronunun geliştirme görüntüsü.',
        },
        caption: { en: 'Mercer Row platform', tr: 'Mercer Row peronu' },
      },
      {
        media: 'underwake/train-interior',
        alt: {
          en: 'Development capture of a subway train interior with a distant figure standing in the carriage.',
          tr: 'Vagonun uzağında duran bir figürün göründüğü metro treni içinin geliştirme görüntüsü.',
        },
        caption: { en: 'Train interior', tr: 'Tren içi' },
      },
      {
        media: 'underwake/train-boarding',
        alt: {
          en: 'First-person development capture of the player\'s gloved hands next to an open train door.',
          tr: 'Açık tren kapısının yanında oyuncunun eldivenli ellerini gösteren birinci şahıs geliştirme görüntüsü.',
        },
        caption: { en: 'Boarding the train', tr: 'Trene biniş' },
      },
      {
        media: 'underwake/turnstiles',
        alt: {
          en: 'Development capture of subway turnstiles leading toward a platform.',
          tr: 'Perona açılan metro turnikelerinin geliştirme görüntüsü.',
        },
        caption: { en: 'Turnstiles', tr: 'Turnikeler' },
      },
      {
        media: 'underwake/office-desk',
        alt: {
          en: 'Development capture of an office desk with a monitor, keyboard and papers.',
          tr: 'Monitör, klavye ve kâğıtların bulunduğu bir ofis masasının geliştirme görüntüsü.',
        },
        caption: { en: 'Office interior', tr: 'Ofis iç mekânı' },
      },
      {
        media: 'underwake/office-interaction',
        alt: {
          en: 'First-person development capture of the player\'s hand reaching toward papers on an office desk.',
          tr: 'Oyuncunun elinin ofis masasındaki kâğıtlara uzandığı birinci şahıs geliştirme görüntüsü.',
        },
        caption: { en: 'Interaction prompt', tr: 'Etkileşim istemi' },
      },
      {
        media: 'underwake/hands-light',
        alt: {
          en: 'Development capture of two hands silhouetted against a bright, hazy light.',
          tr: 'Parlak ve puslu bir ışığa karşı siluet hâlinde iki elin geliştirme görüntüsü.',
        },
        caption: { en: 'Light and silhouette study', tr: 'Işık ve siluet çalışması' },
      },
    ],
    video: null,
    links: {},
    detail: {
      en: {
        tagline: 'A first-person prototype about waking beneath a dead city.',
        overview: [
          'Underwake is a playable Unreal Engine game prototype that combines cinematic storytelling with action mechanics. Development has focused on scene flow, interaction systems and the Dash and Lasso abilities.',
          'The working title belongs to a first-person psychological sci-fi project. The captures on this page show a night street, a subway platform and train, and an office interior.',
        ],
        idea: [
          'The prototype explores how a quiet, cinematic first-person narrative can share space with responsive action mechanics. The technical challenge is joining scenes, interactions and movement abilities into one continuous, playable flow instead of a set of isolated test levels.',
        ],
        role: [
          'Game design and prototyping direction',
          'Gameplay systems: scene progression, interactions, Dash and Lasso',
          'Technical problem solving inside Unreal Engine',
          'AI-assisted workflows for iteration, debugging and testing',
        ],
        process: [
          {
            title: 'Play-driven iteration',
            body: 'Each slice is built into a packaged test build and played through before the next round of changes, so problems show up in play rather than in the editor.',
          },
          {
            title: 'Scene flow first',
            body: 'The route between spaces and the interactions along it were made to work end to end before surfaces, materials and props were polished.',
          },
          {
            title: 'Verification',
            body: 'Automated source tests and packaged-build route checks supported the work. The remaining effort is visual and audio polish rather than new systems.',
          },
        ],
        features: [
          { title: 'First-person gameplay', body: 'The whole prototype is played from the player\'s own viewpoint, including hand-level interaction.' },
          { title: 'Cinematic storytelling', body: 'Spaces and lighting are composed to carry the narrative and mood.' },
          { title: 'Scene progression', body: 'Connected environments — street, station, train and office — rather than separate test maps.' },
          { title: 'Interaction systems', body: 'Contextual prompts and object interactions, such as handling items on a desk.' },
          { title: 'Dash and Lasso mechanics', body: 'Two movement and action abilities that are a core focus of the prototype.' },
          { title: 'Gameplay prototyping', body: 'Rapid build–play–refine cycles to test mechanics early.' },
        ],
        outcome: [
          'Status: in development — a playable prototype. The technical flow runs end to end in test builds.',
          'Visual polish (hand and item detail, uniform and tunnel surfaces) and audio are still pending, so these captures are work in progress and not final quality.',
        ],
        mediaNote: 'Captures from in-development builds. Visuals are not final.',
      },
      tr: {
        tagline: 'Ölü bir şehrin altında uyanmak üzerine birinci şahıs prototipi.',
        overview: [
          'Underwake, sinematik anlatımı aksiyon mekanikleriyle birleştiren, Unreal Engine tabanlı oynanabilir bir oyun prototipidir. Geliştirme; sahne akışı, etkileşim sistemleri ve Dash ile Lasso yetenekleri üzerine odaklanmıştır.',
          'Çalışma adı, birinci şahıs psikolojik bilim kurgu türündeki bir projeye aittir. Bu sayfadaki görüntülerde gece sokağı, metro peronu ve treni, ayrıca bir ofis iç mekânı görülür.',
        ],
        idea: [
          'Prototip, sakin ve sinematik bir birinci şahıs anlatısının duyarlı aksiyon mekanikleriyle aynı alanı nasıl paylaşabileceğini araştırır. Teknik zorluk; sahneleri, etkileşimleri ve hareket yeteneklerini birbirinden bağımsız test seviyeleri yerine kesintisiz, oynanabilir tek bir akışta birleştirmektir.',
        ],
        role: [
          'Oyun tasarımı ve prototipleme yönü',
          'Oynanış sistemleri: sahne ilerleyişi, etkileşimler, Dash ve Lasso',
          'Unreal Engine içinde teknik problem çözme',
          'Yineleme, hata ayıklama ve test için yapay zekâ destekli iş akışları',
        ],
        process: [
          {
            title: 'Oynayarak yineleme',
            body: 'Her dilim paketli bir test sürümüne dönüştürülür ve bir sonraki değişiklikten önce baştan sona oynanır; böylece sorunlar editörde değil oynanışta ortaya çıkar.',
          },
          {
            title: 'Önce sahne akışı',
            body: 'Mekânlar arasındaki rota ve üzerindeki etkileşimler; yüzeyler, malzemeler ve objeler cilalanmadan önce baştan sona çalışır hâle getirildi.',
          },
          {
            title: 'Doğrulama',
            body: 'Otomatik kaynak testleri ve paketli sürüm rota kontrolleri çalışmayı destekledi. Kalan emek yeni sistemlerden çok görsel ve ses cilasına yönelik.',
          },
        ],
        features: [
          { title: 'Birinci şahıs oynanış', body: 'Prototipin tamamı, el seviyesindeki etkileşimler dâhil, oyuncunun kendi bakış açısından oynanır.' },
          { title: 'Sinematik anlatım', body: 'Mekânlar ve ışık, anlatıyı ve atmosferi taşıyacak biçimde kurgulanır.' },
          { title: 'Sahne ilerleyişi', body: 'Ayrı test haritaları yerine birbirine bağlanan ortamlar: sokak, istasyon, tren ve ofis.' },
          { title: 'Etkileşim sistemleri', body: 'Masadaki nesnelerle ilgili olanlar gibi bağlamsal istemler ve nesne etkileşimleri.' },
          { title: 'Dash ve Lasso mekanikleri', body: 'Prototipin odağındaki iki hareket ve aksiyon yeteneği.' },
          { title: 'Oynanış prototipleme', body: 'Mekanikleri erken test etmek için hızlı yap–oyna–iyileştir döngüleri.' },
        ],
        outcome: [
          'Durum: geliştirme aşamasında — oynanabilir bir prototip. Teknik akış test sürümlerinde baştan sona çalışıyor.',
          'Görsel cila (el ve eşya detayları, üniforma ve tünel yüzeyleri) ile ses henüz tamamlanmadı; bu nedenle görüntüler çalışma aşamasındadır ve nihai kaliteyi temsil etmez.',
        ],
        mediaNote: 'Geliştirme aşamasındaki sürümlerden alınmış görüntüler. Görseller nihai değildir.',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'omni',
    slug: 'omni',
    featuredOrder: 2,
    emphasis: 'lead',
    accent: 'blue',
    title: 'Omni',
    category: { en: 'Desktop Application / Productivity Software', tr: 'Masaüstü Uygulaması / Verimlilik Yazılımı' },
    summary: {
      en: 'A modular Windows desktop workspace built with Electron, React and TypeScript that brings agenda, tasks, notes and connected services into one customizable interface.',
      tr: 'Ajanda, görevler, notlar ve bağlı servisleri tek ve özelleştirilebilir bir arayüzde buluşturan; Electron, React ve TypeScript ile geliştirilmiş modüler bir Windows masaüstü çalışma alanı.',
    },
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', '.NET (Windows media bridge)'],
    status: 'paused-beta',
    cover: { kind: 'window', media: ['omni/weather-panel'] },
    gallery: [
      {
        media: 'omni/weather-panel',
        alt: {
          en: 'Screenshot of the Omni weather panel showing the current temperature and a four-day forecast.',
          tr: 'Omni hava durumu panelinin, güncel sıcaklığı ve dört günlük tahmini gösteren ekran görüntüsü.',
        },
        caption: { en: 'Weather panel (real capture)', tr: 'Hava durumu paneli (gerçek ekran görüntüsü)' },
      },
    ],
    video: null,
    links: {},
    detail: {
      en: {
        tagline: 'One modular workspace for the scattered tools of a working day.',
        overview: [
          'Omni is a Windows desktop application that brings a local agenda, tasks, notes, mail, weather, news and Windows media control into a single workspace. It is meant as a personal control centre, not a launcher or a collection of links.',
          'The interface is panel-based: panels can be moved, resized and docked, and the layout is saved between sessions.',
        ],
        idea: [
          'Daily information lives in many separate apps. The idea behind Omni is to gather the sources a person actually uses into one context-aware surface that can be rearranged to fit their routine.',
        ],
        role: [
          'Product concept and interface direction',
          'Modular workspace and panel design',
          'Implementation and testing through AI-assisted development workflows',
        ],
        process: [
          {
            title: 'Interface approach',
            body: 'A dark working surface with glass-like panels, centralised design tokens for colour, spacing, radius and motion, and two selectable themes (Modern and Cyberpunk) that honour reduced-motion preferences.',
          },
          {
            title: 'Architecture',
            body: 'A React and TypeScript renderer on top of an Electron main process connected through typed IPC. A small native .NET bridge handles Windows media sessions.',
          },
          {
            title: 'Local-first data',
            body: 'Notes, tasks and agenda data are stored locally with atomic, revision-checked writes and JSON backup/restore. Account secrets are kept in the Windows secure store and are not given to the renderer.',
          },
          {
            title: 'Verification',
            body: 'Type checks, a lint script, an automated test suite and a scripted desktop UI check across several window sizes accompany each change.',
          },
        ],
        features: [
          { title: 'Movable, dockable panels', body: 'Drag, resize and single-level docking with a persisted layout and a reset option.' },
          { title: 'Agenda', body: 'A local calendar with .ics import and export, plus calendar adapters for Google, Microsoft and iCloud (CalDAV).' },
          { title: 'Tasks and notes', body: 'Quick capture with Ctrl+Shift+N and a command palette on Ctrl+K.' },
          { title: 'Mail, weather and news', body: 'A mail panel (sending only on explicit opt-in), a weather panel, and topic-based news from RSS sources.' },
          { title: 'Windows media control', body: 'Controls the media session Windows already exposes, with no account required.' },
        ],
        outcome: [
          'Status: beta (version 0.27.1), currently paused. It is not presented as a public release.',
          'The local features were verified in an isolated test profile. The architecture is built around a modular workspace that can grow, but only what is listed above exists today.',
        ],
        notClaimed: [
          'Google, Microsoft and iCloud connectors are implemented in code, but have not been verified against live accounts.',
          'An experimental local voice-assistant branch exists. It has not been verified on its target hardware and is not a finished feature.',
          'No Android companion app is part of this project.',
        ],
        mediaNote: 'Only one real capture is available so far. The window frame around it is decorative.',
      },
      tr: {
        tagline: 'Bir iş gününün dağınık araçları için tek bir modüler çalışma alanı.',
        overview: [
          'Omni; yerel ajanda, görevler, notlar, posta, hava durumu, haberler ve Windows medya denetimini tek çalışma alanında toplayan bir Windows masaüstü uygulamasıdır. Bir başlatıcı ya da bağlantı koleksiyonu değil, kişisel bir kontrol merkezi olarak tasarlanmıştır.',
          'Arayüz panel tabanlıdır: paneller taşınabilir, yeniden boyutlandırılabilir ve yerleştirilebilir; düzen oturumlar arasında saklanır.',
        ],
        idea: [
          'Günlük bilgi birçok ayrı uygulamaya dağılmış durumda. Omni\'nin arkasındaki fikir, kişinin gerçekten kullandığı kaynakları, rutinine göre yeniden düzenlenebilen ve bağlamı gözeten tek bir yüzeyde toplamaktır.',
        ],
        role: [
          'Ürün konsepti ve arayüz yönü',
          'Modüler çalışma alanı ve panel tasarımı',
          'Yapay zekâ destekli geliştirme iş akışlarıyla uygulama ve test',
        ],
        process: [
          {
            title: 'Arayüz yaklaşımı',
            body: 'Cam görünümlü panellerle koyu bir çalışma yüzeyi; renk, boşluk, yarıçap ve hareket için merkezi tasarım tokenları; azaltılmış hareket tercihine uyan iki seçilebilir tema (Modern ve Cyberpunk).',
          },
          {
            title: 'Mimari',
            body: 'Tipli IPC ile bağlanan bir Electron ana süreci üzerinde React ve TypeScript renderer\'ı. Windows medya oturumlarını küçük bir yerel .NET köprüsü yönetir.',
          },
          {
            title: 'Önce yerel veri',
            body: 'Notlar, görevler ve ajanda verisi; atomik ve revizyon denetimli yazımlarla yerelde saklanır, JSON yedekleme/geri yükleme vardır. Hesap sırları Windows güvenli deposunda tutulur ve renderer\'a verilmez.',
          },
          {
            title: 'Doğrulama',
            body: 'Her değişikliğe tip denetimi, lint betiği, otomatik test paketi ve birkaç pencere boyutunda betikli masaüstü arayüz kontrolü eşlik eder.',
          },
        ],
        features: [
          { title: 'Taşınabilir, yerleştirilebilir paneller', body: 'Sürükleme, yeniden boyutlandırma ve tek seviyeli yerleştirme; kalıcı düzen ve sıfırlama seçeneği.' },
          { title: 'Ajanda', body: '.ics içe/dışa aktarmalı yerel takvim; ayrıca Google, Microsoft ve iCloud (CalDAV) için takvim adaptörleri.' },
          { title: 'Görevler ve notlar', body: 'Ctrl+Shift+N ile hızlı not yakalama ve Ctrl+K ile komut paleti.' },
          { title: 'Posta, hava durumu ve haberler', body: 'Bir posta paneli (gönderim yalnızca açık onayla), hava durumu paneli ve RSS kaynaklarından konu bazlı haberler.' },
          { title: 'Windows medya denetimi', body: 'Windows\'un zaten sunduğu medya oturumunu, hesap gerektirmeden yönetir.' },
        ],
        outcome: [
          'Durum: beta (sürüm 0.27.1), şu an duraklatıldı. Herkese açık bir sürüm olarak sunulmamaktadır.',
          'Yerel özellikler yalıtılmış bir test profilinde doğrulandı. Mimari büyüyebilen modüler bir çalışma alanı etrafında kurulu, ancak bugün yalnızca yukarıda listelenenler mevcuttur.',
        ],
        notClaimed: [
          'Google, Microsoft ve iCloud bağlayıcıları kodda uygulanmıştır, ancak canlı hesaplarla doğrulanmamıştır.',
          'Deneysel bir yerel sesli asistan dalı vardır. Hedef donanımda doğrulanmamıştır ve tamamlanmış bir özellik değildir.',
          'Bu projenin bir Android eşlikçi uygulaması yoktur.',
        ],
        mediaNote: 'Şimdilik yalnızca tek bir gerçek ekran görüntüsü mevcut. Çevresindeki pencere çerçevesi dekoratiftir.',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ludenos',
    slug: 'ludenos',
    featuredOrder: 3,
    emphasis: 'standard',
    accent: 'violet',
    title: 'LudenOS',
    category: { en: 'Web Platform / Gaming', tr: 'Web Platformu / Oyun' },
    summary: {
      en: 'An Idea & Prototype Hub for game developers and ludologists, engineered independently with Next.js 14, Prisma ORM, and AI-assisted vibe coding workflows.',
      tr: 'Oyun geliştiricileri ve ludoloji meraklıları için Next.js 14, Prisma ORM ve yapay zekâ destekli vibe coding akışlarıyla geliştirilen bağımsız fikir ve prototip merkezi.',
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS'],
    approach: ['Vibe coding', 'AI-assisted development', 'Claude & LLM Workflows'],
    status: 'independent',
    cover: { kind: 'image', media: ['ludenos/hero'] },
    gallery: [
      {
        media: 'ludenos/hero',
        alt: {
          en: 'LudenOS platform desktop interface showcasing game developer ideas and prototype hub.',
          tr: 'Oyun geliştirici fikirleri ve prototip merkezini sergileyen LudenOS platformu masaüstü arayüzü.',
        },
        caption: { en: 'LudenOS platform home and navigation', tr: 'LudenOS platform ana sayfası ve navigasyon' },
      },
      {
        media: 'ludenos/feed',
        alt: {
          en: 'LudenOS prototype and developer log feed view with community updates.',
          tr: 'Topluluk güncellemeleri ve geliştirici günlüklerini içeren LudenOS prototip akışı.',
        },
        caption: { en: 'Community ideas and build feed', tr: 'Topluluk fikirleri ve geliştirme akışı' },
      },
    ],
    video: null,
    links: {
      live: 'https://project-ludenx-1.vercel.app',
      github: 'https://github.com/DenizScott/project_ludenx_1',
    },
    detail: {
      en: {
        tagline: 'An Idea & Prototype Hub for game developers, built independently with AI assistance.',
        overview: [
          'LudenOS takes its name from "Ludology" (the study of games) and the concept of an operating system ("OS"). It is a dedicated Idea & Prototype Hub designed for indie game developers, game designers, and passionate players to share build notes, early-stage ideas, and collect community feedback.',
          'Built independently using modern AI-assisted engineering and vibe coding methodologies, the platform combines a robust full-stack architecture with Next.js 14, React 18, Prisma ORM, and PostgreSQL.',
        ],
        role: [
          'Full-stack architecture and frontend/backend engineering',
          'AI-assisted workflow orchestration with Claude and LLM systems',
          'UI/UX design, database schema modeling with Prisma ORM, and responsive layout implementation',
        ],
        outcome: [
          'Deployed live as a functional web application with live demo and open-source codebase available on GitHub.',
        ],
      },
      tr: {
        tagline: 'Oyun geliştiricileri için fikir ve prototip merkezi; yapay zekâ desteğiyle bağımsız inşa edildi.',
        overview: [
          'LudenOS, adını oyun bilimi anlamına gelen "Ludology" teriminden ve kapsamlı bir merkez işletim sistemi ("OS") kavramından alır. Indie oyun yapımcıları, oyun tasarımcıları ve tutkulu oyuncular için geliştirme günlüklerini, prototip aşamalarını ve erken aşama fikirlerini paylaşabilecekleri bir sosyal fikir ve prototip merkezidir.',
          'Süreç boyunca modern yapay zekâ destekli mühendislik ve vibe coding yöntemleri aktif biçimde kullanılarak Next.js 14, React 18, Prisma ORM ve PostgreSQL altyapısıyla sıfırdan geliştirilmiştir.',
        ],
        role: [
          'Uçtan uca full-stack mimari, arayüz ve veritabanı geliştirme',
          'Claude ve LLM sistemleriyle yapay zekâ destekli iş akışlarının yönetimi',
          'Prisma ORM ile veri modelleme, UI/UX tasarımı ve responsive arayüz kodlaması',
        ],
        outcome: [
          'Çalışır durumda canlıya alınmış web uygulaması; canlı demo ve kaynak kod deposu GitHub üzerinde incelenebilir.',
        ],
      },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'cyber-rebirth',
    slug: 'cyber-rebirth',
    featuredOrder: 4,
    emphasis: 'standard',
    accent: 'magenta',
    title: 'Cyber Rebirth',
    category: { en: 'Game Design / Tabletop Strategy', tr: 'Oyun Tasarımı / Masaüstü Strateji' },
    summary: {
      en: 'A turn-based tabletop strategy game for which I developed all 2D visuals and card layouts — wrapped in a neon cyberpunk identity.',
      tr: 'Tüm 2D görsellerini ve kart dizgilerini geliştirdiğim, neon siberpunk kimliğine sahip, sıra tabanlı bir masaüstü strateji kutu oyunu.',
    },
    technologies: ['Adobe Photoshop'],
    status: 'independent',
    cover: {
      kind: 'cards',
      media: ['cyber-rebirth/kod-kirici', 'cyber-rebirth/rock-yildizi', 'cyber-rebirth/sehir-yoneticisi'],
    },
    gallery: [
      {
        media: 'cyber-rebirth/back',
        alt: {
          en: 'The Cyber Rebirth card back: the game logo in neon pink and blue on a dark background.',
          tr: 'Cyber Rebirth kart arkası: koyu zemin üzerinde neon pembe ve mavi oyun logosu.',
        },
        caption: { en: 'Card back and logo', tr: 'Kart arkası ve logo' },
      },
      {
        media: 'cyber-rebirth/kod-kirici',
        alt: {
          en: 'Character card of a hacker in a dark jacket holding a tablet, with a numeric value in the corner.',
          tr: 'Köşesinde sayısal değer bulunan, elinde tablet tutan koyu ceketli bir hacker karakter kartı.',
        },
        caption: { en: 'Character card — Kod Kırıcı', tr: 'Karakter kartı — Kod Kırıcı' },
      },
      {
        media: 'cyber-rebirth/rock-yildizi',
        alt: {
          en: 'Character card of a punk rock guitarist with a mohawk, with a numeric value in the corner.',
          tr: 'Köşesinde sayısal değer bulunan, mohawk saçlı punk bir rock gitaristi karakter kartı.',
        },
        caption: { en: 'Character card — Rock Yıldızı', tr: 'Karakter kartı — Rock Yıldızı' },
      },
      {
        media: 'cyber-rebirth/cerrah',
        alt: {
          en: 'Character card of an unlicensed surgeon in a pale coat with cybernetic hands.',
          tr: 'Açık renkli önlük giyen, sibernetik elli ruhsatsız bir cerrah karakter kartı.',
        },
        caption: { en: 'Character card — Tescilsiz Cerrah', tr: 'Karakter kartı — Tescilsiz Cerrah' },
      },
      {
        media: 'cyber-rebirth/guvenlik-sefi',
        alt: {
          en: 'Character card of a security chief in a navy suit with a golden cybernetic arm.',
          tr: 'Lacivert takım elbiseli, altın renkli sibernetik kollu bir güvenlik şefi karakter kartı.',
        },
        caption: { en: 'Character card — Güvenlik Şefi', tr: 'Karakter kartı — Güvenlik Şefi' },
      },
      {
        media: 'cyber-rebirth/sehir-yoneticisi',
        alt: {
          en: 'Character card of a city administrator in a black suit with a holographic panel.',
          tr: 'Holografik panel tutan, siyah takım elbiseli bir şehir yöneticisi karakter kartı.',
        },
        caption: { en: 'Character card — Şehir Yöneticisi', tr: 'Karakter kartı — Şehir Yöneticisi' },
      },
      {
        media: 'cyber-rebirth/veri-copcusu',
        alt: {
          en: 'Character card of a data scavenger wearing a backpack covered in glowing hardware.',
          tr: 'Işıklı donanımlarla kaplı bir sırt çantası taşıyan veri çöpçüsü karakter kartı.',
        },
        caption: { en: 'Character card — Veri Çöpçüsü', tr: 'Karakter kartı — Veri Çöpçüsü' },
      },
      {
        media: 'cyber-rebirth/neon-ussu',
        alt: {
          en: 'Location card showing a pink-lit control room, with a value in the corner.',
          tr: 'Köşesinde bir değer bulunan, pembe ışıklı bir kontrol odasını gösteren mekân kartı.',
        },
        caption: { en: 'Location card — Neon Üssü', tr: 'Mekân kartı — Neon Üssü' },
      },
      {
        media: 'cyber-rebirth/akim-galerisi',
        alt: {
          en: 'Location card showing a corridor of glowing cables, with rule text at the bottom.',
          tr: 'Altında kural metni bulunan, ışıklı kablolarla dolu bir koridoru gösteren mekân kartı.',
        },
        caption: { en: 'Location card — Akım Galerisi', tr: 'Mekân kartı — Akım Galerisi' },
      },
      {
        media: 'cyber-rebirth/yasam-serasi',
        alt: {
          en: 'Location card showing a greenhouse dome with a waterfall, with rule text at the bottom.',
          tr: 'Altında kural metni bulunan, şelaleli bir sera kubbesini gösteren mekân kartı.',
        },
        caption: { en: 'Location card — Yaşam Serası', tr: 'Mekân kartı — Yaşam Serası' },
      },
      {
        media: 'cyber-rebirth/jackpot-pub',
        alt: {
          en: 'Location card showing a dim underground pub, with rule text at the bottom.',
          tr: 'Altında kural metni bulunan, loş bir yeraltı barını gösteren mekân kartı.',
        },
        caption: { en: 'Location card — Jackpot Pub', tr: 'Mekân kartı — Jackpot Pub' },
      },
      {
        media: 'cyber-rebirth/sunucu-odasi',
        alt: {
          en: 'Location card showing a server room with green monitors, with rule text at the bottom.',
          tr: 'Altında kural metni bulunan, yeşil monitörlü bir sunucu odasını gösteren mekân kartı.',
        },
        caption: { en: 'Location card — Sunucu Odası', tr: 'Mekân kartı — Sunucu Odası' },
      },
    ],
    video: null,
    links: {},
    detail: {
      en: {
        tagline: 'A neon-lit tabletop strategy game, designed card by card.',
        overview: [
          'Cyber Rebirth is a turn-based strategic tabletop board game. I developed all of its 2D visual design and card layouts independently.',
          'The current files include nine character designs, each in four colour variants, twelve location cards and a shared card back with the game logo. Card text is written in Turkish.',
        ],
        idea: [
          'Give a strategy game a cohesive cyberpunk identity — neon colour, dark surfaces and strong character silhouettes — while keeping every card readable at a glance on the table.',
        ],
        role: [
          'Game design',
          'Visual identity and logo treatment',
          'Card design and card layout',
          'Graphic design workflow, from editable master to exported PDF files',
        ],
        features: [
          { title: 'Visual identity', body: 'A neon cyberpunk logo and palette that carry across every card.' },
          { title: 'Card design', body: 'Character cards with a numeric value and location cards with a value and short rule text.' },
          { title: 'Game design', body: 'Turn-based strategy with rules expressed through the cards themselves.' },
          { title: 'Tabletop mechanics', body: 'Cards are designed as physical objects: portrait characters, landscape locations and a shared back.' },
          { title: 'Graphic design workflow', body: 'An editable Photoshop master with exported PDF card files.' },
        ],
        outcome: [
          'The card set and visual identity are produced and shown below. Playtesting results, print runs and release status are not specified, so none are claimed.',
        ],
        mediaNote: 'Real card designs from the project files. Card text is in Turkish.',
      },
      tr: {
        tagline: 'Neon ışıklı, kart kart tasarlanmış bir masaüstü strateji oyunu.',
        overview: [
          'Cyber Rebirth, sıra tabanlı stratejik bir masaüstü kutu oyunudur. Tüm 2D görsel tasarımını ve kart dizgilerini bağımsız olarak geliştirdim.',
          'Mevcut dosyalarda her biri dört renk varyantına sahip dokuz karakter tasarımı, on iki mekân kartı ve oyun logosunu taşıyan ortak bir kart arkası bulunur. Kart metinleri Türkçedir.',
        ],
        idea: [
          'Bir strateji oyununa bütünlüklü bir siberpunk kimlik kazandırmak — neon renkler, koyu yüzeyler, güçlü karakter silüetleri — ve her kartı masada tek bakışta okunur tutmak.',
        ],
        role: [
          'Oyun tasarımı',
          'Görsel kimlik ve logo uygulaması',
          'Kart tasarımı ve kart dizgisi',
          'Düzenlenebilir ana dosyadan dışa aktarılan PDF dosyalarına uzanan grafik tasarım iş akışı',
        ],
        features: [
          { title: 'Görsel kimlik', body: 'Her karta yayılan neon siberpunk bir logo ve renk paleti.' },
          { title: 'Kart tasarımı', body: 'Sayısal değer taşıyan karakter kartları; değer ve kısa kural metni taşıyan mekân kartları.' },
          { title: 'Oyun tasarımı', body: 'Kuralları kartların kendisi üzerinden ifade eden sıra tabanlı strateji.' },
          { title: 'Masaüstü mekanikleri', body: 'Kartlar fiziksel nesneler olarak tasarlandı: dikey karakterler, yatay mekânlar ve ortak bir arka yüz.' },
          { title: 'Grafik tasarım iş akışı', body: 'Düzenlenebilir bir Photoshop ana dosyası ve dışa aktarılmış PDF kart dosyaları.' },
        ],
        outcome: [
          'Kart seti ve görsel kimlik üretilmiş olup aşağıda gösterilmektedir. Oyun testi sonuçları, baskı adetleri ve yayın durumu belirtilmediği için hiçbiri iddia edilmemektedir.',
        ],
        mediaNote: 'Proje dosyalarından gerçek kart tasarımları. Kart metinleri Türkçedir.',
      },
    },
  },
];

export function getProjectsOrdered(): Project[] {
  return [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
