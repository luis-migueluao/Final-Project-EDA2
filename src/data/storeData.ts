// src/data/storeData.ts

export interface Product {
  id: number;

  title: string;

  price: string;

  images: string[];

  description: string;

  fullDescription: string;

  category:
    | "gaming"
    | "software"
    | "subscriptions";

  subCategory: string[];

  featured?: boolean;
  bestSeller?: boolean;
}

export const storeProducts: Product[] = [

  // ================= GAMING =================

  {
    id: 1,

    title: "God of War",

    price: "$39.99",

    images: [
      "https://images3.alphacoders.com/843/thumb-1920-843016.jpg",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/ss_6eccc970b5de2943546d93d319be1b5c0618f21b.1920x1080.jpg?t=1763059412",

      "https://i.blogs.es/9e56ac/ss_f1bff24d3967a21d303d95e11ed892e3d9113057/1366_2000.jpeg",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/ss_93a3ca63aa2cd8c675bbb6430324ee3f2d44b845.1920x1080.jpg?t=1763059412",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/ss_1351cb512d008f7e47fc50b74197f4f8eb6f3419.1920x1080.jpg?t=1763059412",

      "https://images6.alphacoders.com/934/thumb-1920-934730.jpg"
    ],

    description:
      "Kratos y Atreus en una aventura épica.",

    fullDescription:
      "Embárcate en una aventura legendaria junto a Kratos y Atreus en los reinos nórdicos. God of War combina combate brutal, exploración, enemigos mitológicos y una historia emocional increíble. Disfruta de gráficos cinematográficos, efectos visuales avanzados y una experiencia inmersiva llena de acción y descubrimientos.",

    category: "gaming",

    subCategory: [
      "steam",
      "aventura",
      "pc",
      "playstation",
    ],

    featured: true,
    bestSeller: true,
  },

  {
    id: 2,

    title: "Elden Ring",

    price: "$49.99",

    images: [
      "https://images.steamusercontent.com/ugc/2058741034012526512/379E6434B473E7BE31C50525EB946D4212A8C8B3/",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_c2baf8aada6140beee79d701d14043899e91af47.1920x1080.jpg?t=1767883716",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_fa6b881ef7c30522012ab2b2b83001e79baee093.1920x1080.jpg?t=1767883716",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1767883716",
    ],

    description:
      "Explora un mundo oscuro lleno de desafíos.",

    fullDescription:
      "Elden Ring te lleva a un gigantesco mundo abierto creado por FromSoftware. Explora castillos, cuevas, jefes épicos y secretos ocultos mientras desarrollas tu personaje con total libertad. Su dificultad desafiante y su ambientación oscura convierten cada batalla en una experiencia inolvidable.",

    category: "gaming",

    subCategory: [
      "steam",
      "rpg",
      "aventura",
      "pc",
      "playstation",
      "xbox",
    ],

    featured: true,
    bestSeller: true,
  },

  {
    id: 3,

    title: "Forza Horizon 6",

    price: "$59.99",

    images: [
      "https://images5.alphacoders.com/140/thumb-1920-1401537.jpg",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/706eb79418b2a74192de059693ddcbfaa803108a/ss_706eb79418b2a74192de059693ddcbfaa803108a.1920x1080.jpg?t=1778262106",

      "https://images-1.bluntmag.com.au/cdn-cgi/image/f=auto,quality=80,fit=scale-down/https://images-1.bluntmag.com.au/uploads/2025/09/Blunt-Header-368.jpg",

      "https://xboxwire.thesourcemediaassets.com/sites/4/FH6_Evergreen_KeyArt_Branded-Horizontal_3840x2160-7591242f9c6791be6d45-02424ec6fdf8b34438cf.jpg",
    ],

    description:
      "Carreras extremas en mundo abierto.",

    fullDescription:
      "Disfruta de la experiencia definitiva de conducción en Forza Horizon 6. Recorre enormes paisajes, compite en eventos dinámicos y desbloquea vehículos de alto rendimiento. El juego ofrece gráficos hiperrealistas, clima dinámico y una sensación de velocidad impresionante.",

    category: "gaming",

    subCategory: [
      "xbox live",
      "deportes",
      "xbox",
      "pc",
    ],

    featured: false,
    bestSeller: true,
  },

  {
    id: 4,

    title: "Cyberpunk 2077",

    price: "$29.99",

    images: [
      "https://press.cdprojektred.com/_next/image?url=https%3A%2F%2Fpress.cdn.cdpr.app%2Fnews%2F6fdf182c4be4a018da07e1703f3a21aefb6d5833525d8ec1.png&w=1920&q=75",

      "https://www.cyberpunk.net/build/images/social-thumbnail-en-ddcf4d23.jpg",

      "https://i.redd.it/c80pgq3hee331.jpg",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1769690377",

      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.1920x1080.jpg?t=1769690377"
    ],

    description:
      "Night City te espera.",

    fullDescription:
      "Adéntrate en Night City, una metrópolis futurista llena de tecnología, crimen y acción. Cyberpunk 2077 ofrece una historia intensa, combate dinámico y personalización completa de habilidades y armas. Vive una experiencia RPG inmersiva con gráficos de nueva generación.",

    category: "gaming",

    subCategory: [
      "epic games",
      "rpg",
      "shooter",
      "pc",
      "playstation",
    ],

    featured: false,
    bestSeller: true,
  },

  {
    id: 5,

    title: "EA Sports FC 26",

    price: "$59.99",

    images: [
      "https://media.es.wired.com/photos/6880fadda69582ec829f6bca/master/w_2560%2Cc_limit/ea-sports-fc-26-Cover.jpg",

      "https://i.ytimg.com/vi/F2Q4xrASt94/maxresdefault.jpg",

      "https://i.ytimg.com/vi/0GE8YCIQF2M/maxresdefault.jpg",

      "https://cdn2.unrealengine.com/ea-sports-fc-26-musiala-gameplay-3840x2160-d46757882367.jpg",
    ],

    description:
      "La nueva generación del fútbol.",

    fullDescription:
      "Vive toda la emoción del fútbol con EA Sports FC 26. Juega con equipos oficiales, modos competitivos online y gráficos renovados que llevan el realismo al siguiente nivel. Experimenta animaciones fluidas, estadios detallados y nuevas mecánicas de juego.",

    category: "gaming",

    subCategory: [
      "deportes",
      "psn",
      "playstation",
      "xbox",
      "pc",
    ],

    featured: true,
    bestSeller: true,
  },

  // ================= SOFTWARE =================

  {
    id: 6,

    title: "Windows 11 Pro",

    price: "$19.99",

    images: [
      "https://www.muycomputer.com/wp-content/uploads/2021/11/Windows_11_Home.jpg",

      "https://blog.snd.com.br/wp-content/uploads/2026/02/ARTIGO2.png",

      "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-FY25-All-in-one?fmt=png-alpha&wid=834&hei=470&fit=crop&resSharp=1",

      "https://imagenes2.eltiempo.com/files/og_thumbnail/uploads/2023/08/25/64e924c262bbd.jpeg"
    ],

    description:
      "Licencia original de Windows 11 Pro.",

    fullDescription:
      "Obtén todas las funciones avanzadas de Windows 11 Pro con una licencia original. Disfruta de mayor seguridad, rendimiento optimizado y herramientas profesionales ideales para productividad y gaming.",

    category: "software",

    subCategory: [
      "windows",
    ],

    featured: true,
    bestSeller: true,
  },

  {
    id: 7,

    title: "Office 365",

    price: "$24.99",

    images: [
      "https://www.euskomilenio.com/wp-content/uploads/2022/08/OFFICE-365.png",

      "https://dapencentroestudios.com/wp-content/uploads/2025/07/que-es-office-365-para-empresas.png",

      "https://keys.franboxoriginal.com/wp-content/uploads/2024/10/Office-365-v3.jpg",
    ],

    description:
      "Word, Excel y PowerPoint.",

    fullDescription:
      "Trabaja de forma profesional con Office 365. Accede a Word, Excel, PowerPoint y otras aplicaciones esenciales desde cualquier dispositivo.",

    category: "software",

    subCategory: [
      "office",
      "windows",
    ],

    featured: true,
    bestSeller: true,
  },

  {
    id: 8,

    title: "Kaspersky Premium",

    price: "$14.99",

    images: [
      "https://computadorasylaptopsmonterrey.com/wp-content/uploads/2025/04/Ventajas-de-Kaspersky-Antivirus-01.png",

      "https://wallpaperaccess.com/full/4859907.jpg",

      "https://gocdkeys.es/assets/thumbnails/kaspersky-premium-2024-pc-cd-key-1.webp",
    ],

    description:
      "Protección avanzada para tu PC.",

    fullDescription:
      "Protege tus dispositivos con Kaspersky Premium. Obtén seguridad avanzada contra virus, malware y amenazas online.",

    category: "software",

    subCategory: [
      "antivirus",
      "windows",
    ],

    featured: false,
    bestSeller: true,
  },

  // ================= SUBSCRIPTIONS =================

  {
    id: 9,

    title: "Netflix Premium",

    price: "$9.99",

    images: [
      "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",

      "https://www.marketingdirecto.com/wp-content/uploads/2022/11/NETFLIX.jpg",

      "https://wallpapers.com/images/featured/netflix-background-gs7hjuwvv2g0e9fj.jpg",
    ],

    description:
      "Series y películas ilimitadas.",

    fullDescription:
      "Disfruta de películas, series y documentales en alta calidad con Netflix Premium.",

    category: "subscriptions",

    subCategory: [
      "netflix",
    ],

    featured: true,
    bestSeller: true,
  },

  {
    id: 10,

    title: "Spotify Premium",

    price: "$5.99",

    images: [
      "https://planetafacil.plenainclusion.org/wp-content/uploads/2022/02/Spotify_logo_with_color_system-820x547.gif",

      "https://tf.prtl.imusician.pro/production/images/What-is-Spotify-for-Artists__meta.jpg?w=1200&h=630&auto=compress%2Cformat&fit=crop&dm=1740497187&s=ca12775d950ca8b9f774f45a2855fea0",

      "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/TDHLFC4X4VCD5MAMBDDFYH5NRQ.jpg",

      "https://www.radioacktiva.com/wp-content/uploads/2025/09/Spotify-100925.png"
    ],

    description:
      "Música sin anuncios.",

    fullDescription:
      "Escucha millones de canciones sin interrupciones con Spotify Premium.",

    category: "subscriptions",

    subCategory: [
      "spotify",
    ],

    featured: false,
    bestSeller: true,
  },

  {
    id: 11,

    title: "Crunchyroll Mega Fan",

    price: "$7.99",

    images: [
      "https://sm.ign.com/t/ign_in/news/c/crunchyrol/crunchyroll-is-increasing-prices-right-after-removing-its-fr_xwjx.1200.jpg",

      "https://static.crunchyroll.com/cr-acquisition/assets/img/start/hero/us-global/background-desktop.jpg",

      "https://a.storyblok.com/f/178900/1920x1080/4128b079ea/crunchyroll-editorial-hero-image-general.jpg",

      "https://planoamericano.com/wp-content/uploads/2025/08/Crunchyroll.webp",
    ],

    description:
      "Anime ilimitado en HD.",

    fullDescription:
      "Accede a miles de episodios y películas anime con Crunchyroll Mega Fan.",

    category: "subscriptions",

    subCategory: [
      "crunchyroll",
    ],

    featured: true,
    bestSeller: true,
  },
];