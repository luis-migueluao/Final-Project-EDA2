export interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "God of War",
    subtitle: "Nuevo lanzamiento",
    image:
      "https://static.posters.cz/image/hp/77631.jpg",
  },

  {
    id: 2,
    title: "Elden Ring",
    subtitle: "Más vendido",
    image:
      "https://images.steamusercontent.com/ugc/2058741034012526512/379E6434B473E7BE31C50525EB946D4212A8C8B3/",
  },

  {
    id: 3,
    title: "Forza Horizon 6",
    subtitle: "Carreras extremas",
    image:
      "https://images5.alphacoders.com/140/thumb-1920-1401537.jpg",
  },

  {
    id: 4,
    title: "Cyberpunk 2077",
    subtitle: "Oferta especial",
    image:
      "https://i.redd.it/c80pgq3hee331.jpg",
  },
];