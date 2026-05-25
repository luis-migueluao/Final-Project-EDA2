import type {
  ProductNode,
  ProductGraph
} from "../data/graphData";


// ================= RELATED PRODUCTS =================

export const getRelatedProducts = (
  graph: ProductGraph,
  productId: number,
  limit: number = 5
): ProductNode[] => {

  const relatedMap = new Map<number, number>();

  // ================= GRAPH RELATIONS =================

  graph.edges.forEach(edge => {

    if (edge.source === productId) {

      relatedMap.set(
        edge.target,
        (relatedMap.get(edge.target) || 0) + edge.weight
      );

    }

    else if (edge.target === productId) {

      relatedMap.set(
        edge.source,
        (relatedMap.get(edge.source) || 0) + edge.weight
      );

    }

  });


  // ================= SORT BY WEIGHT =================

  const sortedIds = [...relatedMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  // ================= RETURN PRODUCTS =================

  return sortedIds
    .map(id =>
      graph.nodes.find(node => node.id === id)
    )
    .filter(
      (node): node is ProductNode =>
        node !== undefined &&
        node.id !== productId
    )
    .slice(0, limit);
};