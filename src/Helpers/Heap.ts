// src/Helpers/Heap.ts
// Estructura Heap (Montículo Binario) para ordenar productos por precio o prioridad

export type HeapType = "min" | "max";

export interface HeapItem<T> {
  priority: number;   // Valor numérico para ordenar (precio, prioridad, etc.)
  value: T;           // El dato asociado (producto, etc.)
}

export class Heap<T> {
  private items: HeapItem<T>[] = [];
  private type: HeapType;

  constructor(type: HeapType = "min") {
    this.type = type;
  }

  /**
   * Inserta un elemento en el Heap con una prioridad dada
   * @param value - El valor a almacenar
   * @param priority - La prioridad numérica (precio, puntuación, etc.)
   */
  insert(value: T, priority: number): void {
    this.items.push({ value, priority });
    this._bubbleUp(this.items.length - 1);
  }

  /**
   * Extrae el elemento con mayor o menor prioridad según el tipo de Heap
   */
  extract(): HeapItem<T> | null {
    if (this.items.length === 0) return null;

    const root = this.items[0];
    const last = this.items.pop()!;

    if (this.items.length > 0) {
      this.items[0] = last;
      this._sinkDown(0);
    }

    return root;
  }

  /**
   * Obtiene el elemento con mayor/menor prioridad sin extraerlo
   */
  peek(): HeapItem<T> | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  /**
   * Retorna todos los elementos ordenados (extrayendo uno por uno)
   * @returns - Array de valores ordenados según el tipo de Heap
   */
  extractAll(): T[] {
    const result: T[] = [];

    // Crear un heap temporal para no modificar el original
    const tempHeap = new Heap<T>(this.type);
    tempHeap.items = [...this.items];

    while (tempHeap.items.length > 0) {
      const extracted = tempHeap.extract();
      if (extracted) {
        result.push(extracted.value);
      }
    }

    return result;
  }

  /**
   * Obtiene los primeros n elementos ordenados sin modificar el Heap
   * @param n - Cantidad de elementos a obtener
   */
  getTop(n: number): T[] {
    const result: T[] = [];

    // Creamos un heap temporal para no modificar el original
    const tempHeap = new Heap<T>(this.type);
    tempHeap.items = [...this.items];

    for (let i = 0; i < Math.min(n, tempHeap.size()); i++) {
      const extracted = tempHeap.extract();
      if (extracted) {
        result.push(extracted.value);
      }
    }

    return result;
  }

  /**
   * Construye un Heap desde un array de elementos (más eficiente que insertar uno por uno)
   * @param items - Array de HeapItems
   */
  buildFromArray(items: HeapItem<T>[]): void {
    this.items = [...items];
    for (let i = Math.floor(this.items.length / 2) - 1; i >= 0; i--) {
      this._sinkDown(i);
    }
  }

  /**
   * Retorna la cantidad de elementos en el Heap
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Verifica si el Heap está vacío
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Vacía el Heap
   */
  clear(): void {
    this.items = [];
  }

  // ================= PRIVATE HELPERS =================

  /**
   * ALGORITMO: Heapify hacia arriba (Bubble Up)
   * Mantiene la propiedad del Heap después de una inserción
   */
  private _bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const shouldSwap = this.type === "min"
        ? this.items[index].priority < this.items[parentIndex].priority
        : this.items[index].priority > this.items[parentIndex].priority;

      if (shouldSwap) {
        [this.items[index], this.items[parentIndex]] = [this.items[parentIndex], this.items[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * ALGORITMO: Heapify hacia abajo (Sink Down)
   * Mantiene la propiedad del Heap después de una extracción
   */
  private _sinkDown(index: number): void {
    const length = this.items.length;
    let shouldContinue = true;

    while (shouldContinue) {
      let targetIndex = index;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftBetter = this.type === "min"
          ? this.items[leftChildIndex].priority < this.items[targetIndex].priority
          : this.items[leftChildIndex].priority > this.items[targetIndex].priority;

        if (leftBetter) {
          targetIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightBetter = this.type === "min"
          ? this.items[rightChildIndex].priority < this.items[targetIndex].priority
          : this.items[rightChildIndex].priority > this.items[targetIndex].priority;

        if (rightBetter) {
          targetIndex = rightChildIndex;
        }
      }

      if (targetIndex !== index) {
        [this.items[index], this.items[targetIndex]] = [this.items[targetIndex], this.items[index]];
        index = targetIndex;
      } else {
        shouldContinue = false;
      }
    }
  }

  /**
   * Convierte el Heap a un array plano (sin ordenar, solo los valores)
   */
  toArray(): T[] {
    return this.items.map((item) => item.value);
  }

  /**
   * Convierte el Heap a un array de HeapItems
   */
  toHeapItems(): HeapItem<T>[] {
    return [...this.items];
  }
}