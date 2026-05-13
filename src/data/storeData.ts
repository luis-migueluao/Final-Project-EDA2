export interface Product {
  id: number;
  title: string;
  platform: string;
  price: string;
  image: string;
  description: string;
  category: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export const storeProducts: Product[] = [

  // ================= GAMING =================

  {
    id: 1,
    title: "God of War",
    platform: "Steam",
    price: "$39.99",
    image:
      "https://www.posterposse.com/wp-content/uploads/2018/06/God-Of-War-banner.jpeg",
    description: "Kratos y Atreus en una aventura épica.",
    category: "gaming",
    featured: true,
    bestSeller: true,
  },

  {
    id: 2,
    title: "Elden Ring",
    platform: "Steam",
    price: "$49.99",
    image:
      "https://images.steamusercontent.com/ugc/2058741034012526512/379E6434B473E7BE31C50525EB946D4212A8C8B3/",
    description: "Explora un mundo oscuro lleno de desafíos.",
    category: "gaming",
    featured: true,
    bestSeller: true,
  },

  {
    id: 3,
    title: "Forza Horizon 6",
    platform: "Xbox / PC",
    price: "$59.99",
    image:
      "https://images5.alphacoders.com/140/thumb-1920-1401537.jpg",
    description: "Carreras extremas en mundo abierto.",
    category: "gaming",
    featured: false,
    bestSeller: true,
  },

  {
    id: 4,
    title: "Cyberpunk 2077",
    platform: "Steam",
    price: "$29.99",
    image:
      "https://press.cdprojektred.com/_next/image?url=https%3A%2F%2Fpress.cdn.cdpr.app%2Fnews%2F6fdf182c4be4a018da07e1703f3a21aefb6d5833525d8ec1.png&w=1920&q=75",
    description: "Night City te espera.",
    category: "gaming",
    featured: false,
    bestSeller: true,
  },

  // ================= SOFTWARE =================

  {
    id: 5,
    title: "Windows 11 Pro",
    platform: "Microsoft",
    price: "$19.99",
    image:
      "https://www.janus.com.co/cdn/shop/files/Windows11.webp?v=1747701152",
    description: "Licencia original de Windows 11 Pro.",
    category: "software",
    featured: true,
    bestSeller: true,
  },

  {
    id: 6,
    title: "Office 365",
    platform: "Microsoft",
    price: "$24.99",
    image:
      "https://www.euskomilenio.com/wp-content/uploads/2022/08/OFFICE-365.png",
    description: "Word, Excel y PowerPoint.",
    category: "software",
    featured: true,
    bestSeller: true,
  },

  // ================= SUBSCRIPTIONS =================

  {
    id: 7,
    title: "Netflix Premium",
    platform: "Streaming",
    price: "$9.99",
    image:
      "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940",
    description: "Series y películas ilimitadas.",
    category: "subscriptions",
    featured: true,
    bestSeller: true,
  },

  {
    id: 8,
    title: "Spotify Premium",
    platform: "Music",
    price: "$5.99",
    image:
      "https://planetafacil.plenainclusion.org/wp-content/uploads/2022/02/Spotify_logo_with_color_system-820x547.gif",
    description: "Música sin anuncios.",
    category: "subscriptions",
    featured: false,
    bestSeller: true,
  },

  {
  id: 9,
  title: "EA Sports FC 26",
  platform: "EA App",
  price: "$59.99",
  image:
    "https://media.es.wired.com/photos/6880fadda69582ec829f6bca/master/w_2560%2Cc_limit/ea-sports-fc-26-Cover.jpg",
  description: "La nueva generación del fútbol.",
  category: "gaming",
  featured: true,
  bestSeller: true,
},
];