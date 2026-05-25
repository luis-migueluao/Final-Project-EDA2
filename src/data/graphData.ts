export interface ProductNode {
  id: number;
  title: string;
  category: string;
  subCategory: string[];
}

export interface ProductEdge {
  source: number;
  target: number;
  weight: number;
}

export interface ProductGraph {
  nodes: ProductNode[];
  edges: ProductEdge[];
}

// ================= BUILD GRAPH =================

export const buildProductGraph = (
  products: ProductNode[]
): ProductGraph => {

  const graph: ProductGraph = {
    nodes: products,
    edges: [],
  };

  for (let i = 0; i < products.length; i++) {

    for (let j = i + 1; j < products.length; j++) {

      const productA = products[i];
      const productB = products[j];

      let weight = 0;

      // ================= SAME CATEGORY =================

      if (productA.category === productB.category) {
        weight += 1;
      }

      // ================= SAME SUBCATEGORIES =================

      const commonSubCategories =
        productA.subCategory.filter(sub =>
          productB.subCategory.includes(sub)
        );

      weight += commonSubCategories.length * 0.5;

      // ================= CREATE EDGE =================

      if (weight > 0) {

        graph.edges.push({
          source: productA.id,
          target: productB.id,
          weight,
        });

      }
    }
  }

  return graph;
};