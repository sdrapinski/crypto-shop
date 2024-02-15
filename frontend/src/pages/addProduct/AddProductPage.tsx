import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import { CategoriesInterface } from "../../interfaces/categories.interface";
import { AppContext } from "../../state/AppContext";

const categoriesInit = {
  data: [{ product_category_id: 0, product_category_name: "" }],
};

const AddProductPage = () => {
  const appContext = useContext(AppContext);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setcategories] =
    useState<CategoriesInterface>(categoriesInit);

  const [productDollarPrice, setProductDollarPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isProductPromoted, setIsProductPromoted] = useState(false);
  const [productPromotion, setProductPromotion] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${backendUrl}/offer/Categories`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        setcategories(resp);
      });

    return () => {};
  }, []);

  const handleThumbnailClick = (index: number) => {
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [
        ...prevPreviews.slice(0, index),
        ...prevPreviews.slice(index + 1),
      ];
      return updatedPreviews;
    });

    setProductImages((prevImages) => {
      const updatedImages = [
        ...prevImages.slice(0, index),
        ...prevImages.slice(index + 1),
      ];
      return updatedImages;
    });
  };

  const handleAddProduct = () => {
    // Tworzenie obiektu reprezentującego nowy produkt
    const newProduct = {
      productName,
      productDescription,
      products_category_id: selectedCategoryId, // Załóżmy, że masz wybrany identyfikator kategorii produktu
      productDollarPrice,
      productQuantity,
      productPromotion: isProductPromoted ? productPromotion : null,
      // Tutaj załóżmy, że identyfikator użytkownika (user_id) jest dostępny w appContext
      user_id: appContext?.user?.user_id,
    };

    // Wysłanie zapytania POST do serwera w celu dodania produktu
    axios
      .post(`${backendUrl}/offer/createOffer`, newProduct, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        // Obsługa odpowiedzi serwera po pomyślnym dodaniu produktu
        console.log("Product added successfully:", response.data);
        // Tutaj możesz wykonać odpowiednie akcje po dodaniu produktu, np. zresetować formularz
        // lub wyświetlić powiadomienie o sukcesie
      })
      .catch((error) => {
        // Obsługa błędów podczas dodawania produktu
        console.error("Error adding product:", error);
        // Tutaj możesz wyświetlić odpowiedni komunikat błędu dla użytkownika
      });
  };

  useEffect(() => {
    // Convert selected files to data URLs
    Promise.all(
      productImages.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    ).then((previewUrls) => {
      setImagePreviews(previewUrls);
    });
  }, [productImages]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProductImages((prev) => [...prev, ...files]);
  };
  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-header">Add Product</h2>
      <div className="add-product-form">
        {imagePreviews.length > 0 && (
          <div className="image-preview-container">
            <div className="image-preview-selected">
              <img
                src={imagePreviews[0]}
                alt={`Preview added product`}
                className="selected-image"
              />
              <button
                className="remove-image-btn"
                onClick={() => handleRemoveImage(0)}
              >
                X
              </button>
            </div>
            <div className="image-preview-thumbnails">
              {imagePreviews.slice(1).map((previewUrl, index) => (
                <img
                  key={index}
                  src={previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        )}
        <label>Product Images:</label>
        <input
          multiple
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <br />
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />

        <label>Product Description:</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <br />
        <label>Product Category:</label>
        <Form.Select
          aria-label="Select product category"
          value={selectedCategoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Select category</option>
          {categories.data.map((category) => (
            <option
              key={category.product_category_id}
              value={category.product_category_id}
            >
              {category.product_category_name}
            </option>
          ))}
        </Form.Select>
        {/* Dodaj nowe pole do wprowadzenia niestandardowej kategorii */}

        <label>Product Dollar Price:</label>
        <input
          type="number"
          value={productDollarPrice}
          onChange={(e) => setProductDollarPrice(parseFloat(e.target.value))}
        />
        <br />

        <label>Product Quantity:</label>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(parseInt(e.target.value))}
        />
        <br />

        <label>
          Is Product Promoted?
          <input
            type="checkbox"
            checked={isProductPromoted}
            onChange={(e) => setIsProductPromoted(e.target.checked)}
          />{" "}
        </label>
        {isProductPromoted && (
          <div>
            <label>Product Promotion Date:</label>
            <input
              type="date"
              value={productPromotion}
              onChange={(e) => setProductPromotion(e.target.value)}
            />
          </div>
        )}
        <br />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;
