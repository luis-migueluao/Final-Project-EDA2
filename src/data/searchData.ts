import { Trie } from "../Helpers/Trie";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export interface SearchResult {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  subCategory: string[];
}

let trie: Trie | null = null;
let productsCache: SearchResult[] = [];
let isLoaded = false;

// ================= LOAD INDEX =================

export const loadSearchIndex = async (): Promise<void> => {
  const snapshot = await getDocs(collection(db, "products"));

  const newTrie = new Trie();

  productsCache = snapshot.docs.map((doc) => {
    const data = doc.data();

    const product: SearchResult = {
      id: Number(data.id ?? doc.id), // FIX IMPORTANTE
      title: data.title,
      price: data.price,
      image: data.images?.[0] || "",
      category: data.category,
      subCategory: data.subCategory || [],
    };

    // ===== INDEXACIÓN =====

    const words = product.title.toLowerCase().split(/\s+/);

    words.forEach((w) => newTrie.insert(w, product.id));

    newTrie.insert(product.title.toLowerCase(), product.id);
    newTrie.insert(product.category.toLowerCase(), product.id);

    product.subCategory.forEach((sub) => {
      newTrie.insert(sub.toLowerCase(), product.id);
    });

    return product;
  });

  trie = newTrie;
  isLoaded = true;
};

// ================= GET TRIE =================

const getTrie = (): Trie => {
  if (!trie) {
    throw new Error("Trie no inicializado. Ejecuta loadSearchIndex()");
  }
  return trie;
};

// ================= SEARCH =================

export const searchProducts = (
  query: string,
  maxResults = 5
): SearchResult[] => {
  if (!isLoaded || !trie) return [];
  if (!query.trim()) return [];

  const lower = query.toLowerCase().trim();

  const ids = getTrie().getSuggestions(lower);

  const results = ids
    .map((id) => productsCache.find((p) => p.id === id))
    .filter((p): p is SearchResult => p !== undefined)
    .slice(0, maxResults);

  return results;
};