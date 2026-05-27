# 🎮 GameStore - Proyecto Final EDA2

Plataforma web de venta de videojuegos, software y suscripciones digitales.

## 🚀 Enlaces

| **Repositorio GitHub** | [https://github.com/luis-migueluao/Final-Project-EDA2]|

| **Propuesta gráfica (Figma)** | *[https://www.figma.com/proto/uGIaKer49Bhrw9hKAiTabS/Estructura-de-Datos-2-Final-Project?node-id=6-5&p=f&t=yomllUI4cBplACRL-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=6%3A5]* |

| **Despliegue (Netlify)** | *[https://exquisite-cupcake-a9a7ec.netlify.app]* |

| **Documento Final** | *[https://docs.google.com/document/d/1DlPrjDAbV-2eI--Xjuem8TS6ES1C_3xHeres4w6e9Js/edit?usp=sharing]* |


## 👥 Integrantes

| *[LUIS MIGUEL CRUZ MALDONADO ](2235482)* |


## 📁 Estructura del proyecto

```
src/
├── Components/       # Componentes reutilizables
│   ├── Header.tsx
│   ├── Menu.tsx
│   ├── HeroCarousel.tsx
│   ├── ProductCard.tsx
│   ├── ProductsSection.tsx
│   ├── CheckoutModal.tsx
│   └── Profile/      # Componentes del panel profile
├── Context/           # Contextos de React (Auth, Cart, Products)
├── data/              # Datos estáticos (menú tree, carrusel, search)
├── firebase/          # Configuración de Firebase
├── Helpers/           # Implementación de estructuras de datos
│   ├── Queue.ts
│   ├── Heap.ts
│   ├── Trie.ts
│   ├── GeneralTree.ts
│   ├── CircularLinkedList.ts
│   └── graphAlgorithms.ts
├── hooks/             # Custom hooks
├── Pages/             # Páginas de la aplicación
│   ├── Home.tsx
│   ├── Cart.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ProductDescription.tsx
│   ├── Profile.tsx
│   ├── ProfileUser.tsx
│   ├── ProfileAdmin.tsx
│   └── NotFound.tsx
├── Routes/            # Configuración de rutas
│   ├── AppRoutes.tsx
│   ├── UserRoutes.tsx
│   ├── AdminRoutes.tsx
│   └── PrivateRoute.tsx
└── styles/            # Hojas de estilo CSS
```

