/**
 * Lista enlazada circular doblemente enlazada.
 * Usada por el hero carousel: cada slide es un nodo; next/prev recorren en O(1).
 */

export class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class CircularDoublyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private current: ListNode<T> | null = null;

  constructor(items: T[] = []) {
    if (items.length === 0) {
      return;
    }

    let first: ListNode<T> | null = null;
    let previous: ListNode<T> | null = null;

    for (const item of items) {
      const node = new ListNode(item);

      if (!first) {
        first = node;
        this.head = node;
        this.current = node;
      } else {
        previous!.next = node;
        node.prev = previous;
      }

      previous = node;
    }

    first!.prev = previous!;
    previous!.next = first!;
  }

  getCurrent(): T {
    if (!this.current) {
      throw new Error("La lista enlazada está vacía");
    }
    return this.current.data;
  }

  next(): T {
    if (!this.current) {
      throw new Error("La lista enlazada está vacía");
    }
    this.current = this.current.next!;
    return this.current.data;
  }

  prev(): T {
    if (!this.current) {
      throw new Error("La lista enlazada está vacía");
    }
    this.current = this.current.prev!;
    return this.current.data;
  }

  goTo(predicate: (data: T) => boolean): T {
    if (!this.head) {
      throw new Error("La lista enlazada está vacía");
    }

    let node: ListNode<T> = this.head;

    do {
      if (predicate(node.data)) {
        this.current = node;
        return node.data;
      }
      node = node.next!;
    } while (node !== this.head);

    return this.getCurrent();
  }

  toArray(): T[] {
    if (!this.head) {
      return [];
    }

    const result: T[] = [];
    let node: ListNode<T> = this.head;

    do {
      result.push(node.data);
      node = node.next!;
    } while (node !== this.head);

    return result;
  }
}
