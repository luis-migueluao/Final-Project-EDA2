export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
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

  insert(word: string, productId: number): void {
    let current = this.root;
    const lower = word.toLowerCase();

    for (const char of lower) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          productIds: new Set(),
        });
      }

      current = current.children.get(char)!;
      current.productIds.add(productId);
    }

    current.isEndOfWord = true;
    current.productIds.add(productId);
  }

  getSuggestions(prefix: string): number[] {
    const node = this._traverse(prefix.toLowerCase());
    if (!node) return [];

    return Array.from(node.productIds);
  }

  search(word: string): boolean {
    const node = this._traverse(word.toLowerCase());
    return !!node?.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this._traverse(prefix.toLowerCase()) !== null;
  }

  private _traverse(word: string): TrieNode | null {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) return null;
      current = current.children.get(char)!;
    }

    return current;
  }

  clear(): void {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      productIds: new Set(),
    };
  }
}