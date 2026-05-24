/**
 * Cola (FIFO) para el carrito de compras.
 * enqueue = agregar al final; dequeue = atender el primero (checkout).
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
}
