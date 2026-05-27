// src/Components/Profile/ProductsManager.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  db,
} from "../../firebase/config";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  gamingTree,
  softwareTree,
  subscriptionsTree,
} from "../../data/menuTree";

interface Product {
  id: number;

  title: string;

  price: number;

  description?: string;

  fullDescription?: string;

  category?: string;

  subCategory?: string[];

  images?: string[];

  featured?: boolean;

  bestSeller?: boolean;
}

const ProductsManager = () => {

  const [products,
    setProducts] =
      useState<Product[]>([]);

  const [loading,
    setLoading] =
      useState(true);

  const [editingId,
    setEditingId] =
      useState<number | null>(
        null
      );

  const [editData,
    setEditData] =
      useState<Partial<Product>>(
        {}
      );

  // ================= FETCH =================

  const fetchProducts =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "products"
            )
          );

        const data =
          snapshot.docs.map(
            (doc) =>
              doc.data() as Product
          );

        setProducts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  // ================= GET SUBCATEGORIES =================

  const getSubCategories = () => {

    let tree;

    switch (
      editData.category
    ) {

      case "gaming":
        tree = gamingTree;
        break;

      case "software":
        tree = softwareTree;
        break;

      case "subscriptions":
        tree =
          subscriptionsTree;
        break;

      default:
        return [];
    }

    return (
      tree.children || []
    ).flatMap(
      (group) =>
        group.children?.map(
          (child) =>
            child.label.toLowerCase()
        ) || []
    );
  };

  // ================= DELETE =================

  const handleDelete =
    async (
      id: number
    ) => {

      const confirmDelete =
        window.confirm(
          "¿Eliminar producto?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "products",
            String(id)
          )
        );

        setProducts((prev) =>
          prev.filter(
            (p) =>
              p.id !== id
          )
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ================= START EDIT =================

  const startEdit = (
    product: Product
  ) => {

    setEditingId(
      product.id
    );

    setEditData({

      ...product,

      category:
        product.category ||
        "gaming",

      subCategory:
        product.subCategory?.map(
          (sub) =>
            sub.toLowerCase()
        ) || [],

      images:
        product.images || [],
    });
  };

  // ================= TOGGLE SUBCATEGORY =================

  const toggleSubcategory = (
    sub: string
  ) => {

    const normalized =
      sub.toLowerCase();

    const current =
      editData.subCategory || [];

    const exists =
      current.includes(
        normalized
      );

    if (exists) {

      setEditData({

        ...editData,

        subCategory:
          current.filter(
            (item) =>
              item !== normalized
          ),
      });

    } else {

      setEditData({

        ...editData,

        subCategory: [
          ...current,
          normalized,
        ],
      });
    }
  };

  // ================= SAVE =================

  const handleSave =
    async () => {

      if (!editingId)
        return;

      try {

        await updateDoc(
          doc(
            db,
            "products",
            String(editingId)
          ),
          {
            ...editData,
          }
        );

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  ...editData,
                }
              : p
          )
        );

        setEditingId(null);

      } catch (error) {

        console.error(error);
      }
    };

  // ================= RENDER =================

  return (

    <div className="products-manager">

      <h2>
        📦 Productos
      </h2>

      {loading ? (

        <div className="profile-loading">
          Cargando productos...
        </div>

      ) : (

        <div className="products-grid">

          {products.map(
            (product) => (

              <div
                key={product.id}
                className="product-admin-card"
              >

                {editingId ===
                product.id ? (

                  <>

                    {/* IMAGE */}

                    {editData.images?.[0] && (

                      <img
                        src={
                          editData.images[0]
                        }
                        alt="preview"
                        className="product-admin-image"
                      />

                    )}

                    {/* TITLE */}

                    <label>

                      Título

                      <input
                        value={
                          editData.title || ""
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            title:
                              e.target.value,
                          })
                        }
                      />

                    </label>

                    {/* PRICE */}

                    <label>

                      Precio

                      <input
                        type="number"
                        value={
                          editData.price || 0
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            price:
                              Number(
                                e.target.value
                              ),
                          })
                        }
                      />

                    </label>

                    {/* CATEGORY */}

                    <label>

                      Categoría

                      <select
                        value={
                          editData.category || "gaming"
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            category:
                              e.target.value,

                            subCategory: [],
                          })
                        }
                      >

                        <option value="gaming">
                          Gaming
                        </option>

                        <option value="software">
                          Software
                        </option>

                        <option value="subscriptions">
                          Suscripciones
                        </option>

                      </select>

                    </label>

                    {/* SUBCATEGORIES */}

                    <div className="subcategories-section">

                      <span className="subcategories-title">
                        Subcategorías
                      </span>

                      <div className="subcategories-grid">

                        {getSubCategories().map(
                          (sub) => {

                            const isSelected =
                              editData.subCategory?.includes(
                                sub.toLowerCase()
                              );

                            return (

                              <label
                                key={sub}
                                className={`subcategory-pill ${
                                  isSelected
                                    ? "selected"
                                    : ""
                                }`}
                              >

                                <input
                                  type="checkbox"
                                  checked={
                                    isSelected || false
                                  }
                                  onChange={() =>
                                    toggleSubcategory(
                                      sub
                                    )
                                  }
                                />

                                {sub}

                              </label>
                            );
                          }
                        )}

                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    <label>

                      Descripción corta

                      <textarea
                        value={
                          editData.description || ""
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            description:
                              e.target.value,
                          })
                        }
                      />

                    </label>

                    {/* FULL DESCRIPTION */}

                    <label>

                      Descripción completa

                      <textarea
                        className="large-textarea"
                        value={
                          editData.fullDescription || ""
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            fullDescription:
                              e.target.value,
                          })
                        }
                      />

                    </label>

                    {/* IMAGES */}

                    <label>

                      URLs de imágenes

                      <small>
                        Una URL por línea
                      </small>

                      <textarea
                        className="large-textarea"
                        value={
                          editData.images?.join(
                            "\n"
                          ) || ""
                        }
                        onChange={(e) =>
                          setEditData({

                            ...editData,

                            images:
                              e.target.value
                                .split("\n")
                                .map(
                                  (img) =>
                                    img.trim()
                                )
                                .filter(
                                  Boolean
                                ),
                          })
                        }
                      />

                    </label>

                    {/* IMAGE PREVIEW */}

                    {editData.images &&
                      editData.images.length > 0 && (

                      <div className="product-preview-grid">

                        {editData.images.map(
                          (
                            image,
                            index
                          ) => (

                            <img
                              key={index}
                              src={image}
                              alt={`preview-${index}`}
                              className="product-preview-image"
                            />

                          )
                        )}

                      </div>

                    )}

                    {/* CHECKBOXES */}

                    <div className="checkbox-group">

                      <label className="checkbox-label">

                        <input
                          type="checkbox"
                          checked={
                            editData.featured || false
                          }
                          onChange={(e) =>
                            setEditData({

                              ...editData,

                              featured:
                                e.target.checked,
                            })
                          }
                        />

                        Featured

                      </label>

                      <label className="checkbox-label">

                        <input
                          type="checkbox"
                          checked={
                            editData.bestSeller || false
                          }
                          onChange={(e) =>
                            setEditData({

                              ...editData,

                              bestSeller:
                                e.target.checked,
                            })
                          }
                        />

                        Best Seller

                      </label>

                    </div>

                    {/* ACTIONS */}

                    <div className="product-admin-actions">

                      <button
                        className="save-btn"
                        onClick={
                          handleSave
                        }
                      >
                        💾 Guardar
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          setEditingId(
                            null
                          )
                        }
                      >
                        ❌ Cancelar
                      </button>

                    </div>

                  </>

                ) : (

                  <>

                    {/* IMAGE */}

                    {product.images?.[0] && (

                      <img
                        src={
                          product.images[0]
                        }
                        alt={product.title}
                        className="product-admin-image"
                      />

                    )}

                    {/* INFO */}

                    <h3>
                      {product.title}
                    </h3>

                    <p className="product-price">
                      $
                      {product.price}
                    </p>

                    <span className="product-category">
                      {
                        product.category
                      }
                    </span>

                    {/* SUBCATEGORIES */}

                    {product.subCategory &&
                      product.subCategory.length > 0 && (
                        <div className="product-subcategories">
                          {product.subCategory.map(
                            (sub, index) => (
                              <span
                                key={index}
                                className="subcategory-tag"
                              >
                                {sub}
                              </span>
                            )
                          )}
                        </div>
                    )}

                    {/* DESCRIPTION */}

                    <p className="product-description">
                      {
                        product.description
                      }
                    </p>

                    {/* ACTIONS */}

                    <div className="product-admin-actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEdit(
                            product
                          )
                        }
                      >
                        ✏️ Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >
                        🗑 Eliminar
                      </button>

                    </div>

                  </>

                )}

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
};

export default ProductsManager;