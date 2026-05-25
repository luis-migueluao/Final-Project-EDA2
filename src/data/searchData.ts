// src/data/searchData.ts
// Configuración del Trie para búsqueda de productos
import { Trie } from "../Helpers/Trie";
import { storeProducts } from "./storeData";

/**
 * Construye el Trie con todos los productos disponibles.
 * Cada producto se indexa por su título y subcategorías para
 * permitir búsqueda por nombre y por categoría.
 */
export const buildSearchTrie = (): Trie => {
  const trie = new Trie();

  storeProducts.forEach((product) => {
    // Indexar por título completo (palabra por palabra)
    const titleWords = product.title.toLowerCase().split(/\s+/);
    titleWords.forEach((word) => {
      trie.insert(word, product.id);
    });

    // Indexar por título completo
    trie.insert(product.title.toLowerCase(), product.id);

    // Indexar por subcategorías
    product.subCategory.forEach((sub) => {
      trie.insert(sub.toLowerCase(), product.id);
    });

    // Indexar por categoría principal
    trie.insert(product.category.toLowerCase(), product.id);
  });

  return trie;
};

/**
 * Instancia única del Trie (singleton) para usar en toda la app
 */
let searchTrieInstance: Trie | null = null;

export const getSearchTrie = (): Trie => {
  if (!searchTrieInstance) {
    searchTrieInstance = buildSearchTrie();
  }
  return searchTrieInstance;
};

/**
 * Obtiene sugerencias de productos según un término de búsqueda
 * @param query - Término a buscar
 * @param maxResults - Máximo de resultados a retornar
 */
export interface SearchResult {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subCategory: string[];
}

export const searchProducts = (
  query: string,
  maxResults: number = 5
): SearchResult[] => {
  if (!query || query.trim().length === 0) return [];

  const trie = getSearchTrie();
  const lowerQuery = query.toLowerCase().trim();

  // Obtener IDs de productos que coinciden con el prefijo
  const suggestionIds = trie.getSuggestions(lowerQuery);

  // También buscar por coincidencia parcial en palabras completas
  const allWords = storeProducts.map((p) => p.title.toLowerCase());
  const partialMatches = trie.searchByPartial(lowerQuery, allWords);

  // Combinar y deduplicar IDs
  const allIds = new Set([...suggestionIds]);

  // Buscar productos que coincidan con las palabras parciales
  partialMatches.forEach((word) => {
    storeProducts.forEach((product) => {
      if (
        product.title.toLowerCase().includes(word) ||
        product.subCategory.some((s) => s.toLowerCase().includes(word)) ||
        product.category.toLowerCase().includes(word)
      ) {
        allIds.add(product.id);
      }
    });
  });

  // Convertir IDs a datos de productos
  const results = Array.from(allIds)
    .map((id) => storeProducts.find((p) => p.id === id))
    .filter((p): p is (typeof storeProducts)[0] => p !== undefined)
    .slice(0, maxResults)
    .map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.images[0] || "",
      category: p.category,
      subCategory: p.subCategory,
    }));

  return results;
};
