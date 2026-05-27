// src/Components/Profile/AddProductForm.tsx

import {
  useState,
} from "react";

import {
  db,
} from "../../firebase/config";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  gamingTree,
  softwareTree,
  subscriptionsTree,
} from "../../data/menuTree";

interface FormData {
  title: string;
  price: string;
  description: string;
  fullDescription: string;
  category: string;
  subCategory: string[];
  images: string;
  featured: boolean;
  bestSeller: boolean;
}

const AddProductForm = () => {

  const [formData,
    setFormData] =
      useState<FormData>({
        title: "",
        price: "",
        description: "",
        fullDescription: "",
        category: "gaming",
        subCategory: [],
        images: "",
        featured: false,
        bestSeller: false,
      });

  const [saving,
    setSaving] =
      useState(false);

  const [saveMessage,
    setSaveMessage] =
      useState("");

  // ================= SUBCATEGORIES =================

  const getSubCategories = () => {

    let tree;

    switch (
      formData.category
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
            child.label
        ) || []
    );
  };

  // ================= FORM CHANGE =================

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    const {
      name,
      value,
      type,
    } = e.target;

    const checked =
      (
        e.target as HTMLInputElement
      ).checked;

    if (
      name ===
      "subCategory"
    ) {

      setFormData(
        (prev) => {

          const current =
            prev.subCategory;

          return {
            ...prev,

            subCategory:
              checked
                ? [
                    ...current,
                    value,
                  ]
                : current.filter(
                    (
                      item
                    ) =>
                      item !==
                      value
                  ),
          };
        }
      );

      return;
    }

    setFormData(
      (prev) => ({
        ...prev,

        [name]:
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  };

  // ================= ADD PRODUCT =================

  const handleAddProduct =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setSaving(true);

      setSaveMessage("");

      try {

        const newId =
          Date.now();

        await setDoc(
          doc(
            db,
            "products",
            String(newId)
          ),
          {
            id: newId,

            title:
              formData.title,

            price:
              parseFloat(
                formData.price
              ),

            description:
              formData.description,

            fullDescription:
              formData.fullDescription,

            category:
              formData.category,

            subCategory:
              formData.subCategory,

            images:
              formData.images
                .split("\n")
                .map(
                  (s) =>
                    s.trim()
                )
                .filter(
                  Boolean
                ),

            featured:
              formData.featured,

            bestSeller:
              formData.bestSeller,
          }
        );

        setSaveMessage(
          "✅ Producto agregado"
        );

        setFormData({
          title: "",
          price: "",
          description: "",
          fullDescription: "",
          category: "gaming",
          subCategory: [],
          images: "",
          featured: false,
          bestSeller: false,
        });

      } catch (
        error
      ) {

        console.error(
          error
        );

        setSaveMessage(
          "❌ Error al guardar"
        );

      } finally {

        setSaving(false);
      }
    };

  // ================= RENDER =================

  return (

    <div className="admin-add-product-section">

      <h2>
        ➕ Agregar producto
      </h2>

      <form
        className="add-product-form"
        onSubmit={
          handleAddProduct
        }
      >

        <label>
          Título

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleFormChange
            }
            required
          />

        </label>

        <label>
          Precio

          <input
            type="number"
            name="price"
            step="0.01"
            value={
              formData.price
            }
            onChange={
              handleFormChange
            }
            required
          />

        </label>

        <label>
          Categoría

          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleFormChange
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

        <div className="subcategories-section">

          <span className="subcategories-title">
            Subcategorías
          </span>

          <div className="subcategories-grid">

            {getSubCategories().map(
              (sub) => (

                <label
                  key={sub}
                  className={`subcategory-pill ${
                    formData.subCategory.includes(
                      sub
                    )
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    name="subCategory"
                    value={sub}
                    checked={formData.subCategory.includes(
                      sub
                    )}
                    onChange={handleFormChange}
                  />

                  <span>
                    {sub}
                  </span>

                </label>
              )
            )}

          </div>

        </div>

        <label>

          Descripción corta

          <input
            type="text"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleFormChange
            }
          />

        </label>

        <label>

          Descripción completa

          <textarea
            name="fullDescription"
            value={
              formData.fullDescription
            }
            onChange={
              handleFormChange
            }
            rows={4}
          />

        </label>

        <label>

          URLs imágenes

          <textarea
            name="images"
            value={
              formData.images
            }
            onChange={
              handleFormChange
            }
            rows={3}
          />

        </label>

        <div className="checkbox-group">

          <label className="checkbox-label">

            <input
              type="checkbox"
              name="featured"
              checked={
                formData.featured
              }
              onChange={
                handleFormChange
              }
            />

            Destacado

          </label>

          <label className="checkbox-label">

            <input
              type="checkbox"
              name="bestSeller"
              checked={
                formData.bestSeller
              }
              onChange={
                handleFormChange
              }
            />

            Más vendido

          </label>

        </div>

        <button
          type="submit"
          className="submit-product-btn"
          disabled={saving}
        >

          {saving
            ? "Guardando..."
            : "Guardar producto"}

        </button>

        {saveMessage && (

          <p className="save-message">
            {saveMessage}
          </p>

        )}

      </form>

    </div>
  );
};

export default AddProductForm;