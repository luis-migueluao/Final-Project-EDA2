/**
 * Cola (FIFO) para el carrito de compras.
 * enqueue = agregar al final; dequeue = atender el primero (checkout).
 * Los items se procesan en orden FIFO durante el checkout.
 */
export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }

  load(items: T[]): void {
    this.items = [...items];
  }

  /**
   * Encuentra y actualiza un elemento en la cola usando un predicado.
   * Retorna true si encontró y actualizó, false si no.
   */
  findAndUpdate(predicate: (item: T) => boolean, updater: (item: T) => T): boolean {
    const index = this.items.findIndex(predicate);
    if (index === -1) return false;
    this.items[index] = updater(this.items[index]);
    return true;
  }

  /**
   * Elimina elementos que cumplan con el predicado.
   * Retorna la cantidad de elementos eliminados.
   */
  remove(predicate: (item: T) => boolean): number {
    const before = this.items.length;
    this.items = this.items.filter(item => !predicate(item));
    return before - this.items.length;
  }

  /**
   * Procesa todos los elementos de la cola en orden FIFO,
   * ejecutando un callback por cada elemento y vaciando la cola.
   * Retorna un array con los resultados del callback.
   */
  processAll<R>(callback: (item: T) => R): R[] {
    const results: R[] = [];
    while (!this.isEmpty()) {
      const item = this.dequeue();
      if (item !== undefined) {
        results.push(callback(item));
      }
    }
    return results;
  }
}
