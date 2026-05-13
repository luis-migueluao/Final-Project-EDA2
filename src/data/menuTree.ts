export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

export const gamingTree: TreeNode = {
  id: 1,
  label: "Gaming",

  children: [
    {
      id: 2,
      label: "Por plataforma",

      children: [
        { id: 3, label: "Steam" },
        { id: 4, label: "Xbox Live" },
        { id: 5, label: "PSN" },
        { id: 6, label: "Nintendo eShop" },
        { id: 7, label: "Epic Games" },
      ],
    },

    {
      id: 8,
      label: "Por género",

      children: [
        { id: 9, label: "RPG" },
        { id: 10, label: "Shooter" },
        { id: 11, label: "Aventura" },
        { id: 12, label: "Deportes" },
      ],
    },

    {
      id: 13,
      label: "Por dispositivo",

      children: [
        { id: 14, label: "PC" },
        { id: 15, label: "PlayStation" },
        { id: 16, label: "Xbox" },
        { id: 17, label: "Nintendo" },
      ],
    },
  ],
};

export const softwareTree: TreeNode = {
  id: 20,
  label: "Software",

  children: [
    {
      id: 21,
      label: "Categorías",

      children: [
        { id: 22, label: "Antivirus" },
        { id: 23, label: "Office" },
        { id: 24, label: "Windows" },
      ],
    },
  ],
};

export const subscriptionsTree: TreeNode = {
  id: 30,
  label: "Suscriptions",

  children: [
    {
      id: 31,
      label: "Streaming",

      children: [
        { id: 32, label: "Netflix" },
        { id: 33, label: "Spotify" },
        { id: 34, label: "Crunchyroll" },
      ],
    },
  ],
};