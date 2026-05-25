// src/Helpers/Trie.ts
// Estructura Trie (Árbol de Prefijos) para búsqueda y autocompletado de productos

export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  /** IDs de productos asociados a este nodo (útil para sugerencias) */
  productIds: Set<number>;
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      productIds: new Set(),
    };
  }

  /**
   * Inserta una palabra en el Trie y asocia los IDs de productos
   * @param word - La palabra a insertar (en minúsculas)
   * @param productId - ID del producto asociado
   */
  insert(word: string, productId: number): void {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          productIds: new Set(),
        });
      }
      current = current.children.get(char)!;
      // Cada nodo en el camino guarda el ID del producto
      current.productIds.add(productId);
    }

    current.isEndOfWord = true;
    current.productIds.add(productId);
  }

  /**
   * Busca si una palabra existe exactamente en el Trie
   */
  search(word: string): boolean {
    const current = this._traverse(word.toLowerCase());
    return current !== null && current.isEndOfWord;
  }

  /**
   * Verifica si hay alguna palabra que comience con el prefijo dado
   */
  startsWith(prefix: string): boolean {
    return this._traverse(prefix.toLowerCase()) !== null;
  }

  /**
   * Obtiene todas las sugerencias (IDs de productos) para un prefijo dado
   * @param prefix - El prefijo a buscar
   * @returns - Array de IDs de productos que coinciden con el prefijo
   */
  getSuggestions(prefix: string): number[] {
    const node = this._traverse(prefix.toLowerCase());
    if (!node) return [];

    // Retornar los IDs únicos de productos asociados a este prefijo
    return Array.from(node.productIds);
  }

  /**
   * Encuentra todas las palabras completas a partir de un nodo (DFS)
   * @param prefix - Prefijo actual para construir palabras completas
   * @param node - Nodo desde el que buscar
   * @param result - Array para almacenar las palabras encontradas
   */
  findAllWords(prefix: string, node: TrieNode = this.root, result: string[] = []): string[] {
    if (node.isEndOfWord) {
      result.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this.findAllWords(prefix + char, childNode, result);
    }

    return result;
  }

  /**
   * Busca productos por término parcial (contiene el texto en cualquier parte)
   * Útil para búsqueda más flexible
   */
  searchByPartial(term: string, allWords: string[]): string[] {
    const lowerTerm = term.toLowerCase();
    return allWords.filter((word) => word.includes(lowerTerm));
  }

  /**
   * Helper: Recorre el Trie siguiendo el string dado
   */
  private _traverse(word: string): TrieNode | null {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }

  /**
   * Vacía el Trie
   */
  clear(): void {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      productIds: new Set(),
    };
  }

  /**
   * Retorna el tamaño total (cantidad de nodos) del Trie
   */
  size(): number {
    let count = 0;
    const stack: TrieNode[] = [this.root];

    while (stack.length > 0) {
      const node = stack.pop()!;
      count++;
      for (const childNode of node.children.values()) {
        stack.push(childNode);
      }
    }

    return count;
  }
}