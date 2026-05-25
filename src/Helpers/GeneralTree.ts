// src/Helpers/GeneralTree.ts

export interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

export class GeneralTree {
  public root: TreeNode;

  constructor(rootNode: TreeNode) {
    this.root = rootNode;
  }

  /**
   * ALGORITMO: Búsqueda en Profundidad (DFS) Recursiva
   * Busca un nodo por ID para verificar si existe o extraer sus hijos.
   */
  public findNodeById(id: number, currentNode: TreeNode = this.root): TreeNode | null {
    if (currentNode.id === id) {
      return currentNode;
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        const found = this.findNodeById(id, child);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * ALGORITMO: Inserción Dinámica de una nueva subcategoría
   */
  public insertSubCategory(parentId: number, newId: number, label: string): boolean {
    const parentNode = this.findNodeById(parentId);
    if (!parentNode) return false;

    if (!parentNode.children) {
      parentNode.children = [];
    }

    // Validar que no se duplique el ID en el árbol
    if (this.findNodeById(newId)) return false;

    parentNode.children.push({ id: newId, label });
    return true;
  }

  /**
   * ALGORITMO: Obtener todos los nombres de las categorías en un Array plano (DFS)
   */
  public getAllLabels(currentNode: TreeNode = this.root, result: string[] = []): string[] {
    result.push(currentNode.label);
    if (currentNode.children) {
      for (const child of currentNode.children) {
        this.getAllLabels(child, result);
      }
    }
    return result;
  }
}