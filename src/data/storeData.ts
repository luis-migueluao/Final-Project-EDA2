// src/data/storeData.ts

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;

  // MENU PRINCIPAL
  category: "gaming" | "software" | "subscriptions";

  // SUBCATEGORIAS
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
    image:
      "https://www.posterposse.com/wp-content/uploads/2018/06/God-Of-War-banner.jpeg",
    description: "Kratos y Atreus en una aventura épica.",

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
    image:
      "https://images.steamusercontent.com/ugc/2058741034012526512/379E6434B473E7BE31C50525EB946D4212A8C8B3/",
    description: "Explora un mundo oscuro lleno de desafíos.",

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
    image:
      "https://images5.alphacoders.com/140/thumb-1920-1401537.jpg",
    description: "Carreras extremas en mundo abierto.",

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
    image:
      "https://press.cdprojektred.com/_next/image?url=https%3A%2F%2Fpress.cdn.cdpr.app%2Fnews%2F6fdf182c4be4a018da07e1703f3a21aefb6d5833525d8ec1.png&w=1920&q=75",
    description: "Night City te espera.",

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
    image:
      "https://media.es.wired.com/photos/6880fadda69582ec829f6bca/master/w_2560%2Cc_limit/ea-sports-fc-26-Cover.jpg",
    description: "La nueva generación del fútbol.",

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
    image:
      "https://www.janus.com.co/cdn/shop/files/Windows11.webp?v=1747701152",
    description: "Licencia original de Windows 11 Pro.",

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
    image:
      "https://www.euskomilenio.com/wp-content/uploads/2022/08/OFFICE-365.png",
    description: "Word, Excel y PowerPoint.",

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
    image:
      "https://computadorasylaptopsmonterrey.com/wp-content/uploads/2025/04/Ventajas-de-Kaspersky-Antivirus-01.png",
    description: "Protección avanzada para tu PC.",

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
    image:
      "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",
    description: "Series y películas ilimitadas.",

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
    image:
      "https://planetafacil.plenainclusion.org/wp-content/uploads/2022/02/Spotify_logo_with_color_system-820x547.gif",
    description: "Música sin anuncios.",

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
    image:
      "https://sm.ign.com/t/ign_in/news/c/crunchyrol/crunchyroll-is-increasing-prices-right-after-removing-its-fr_xwjx.1200.jpg",
    description: "Anime ilimitado en HD.",

    category: "subscriptions",

    subCategory: [
      "crunchyroll",
    ],

    featured: true,
    bestSeller: true,
  },
];