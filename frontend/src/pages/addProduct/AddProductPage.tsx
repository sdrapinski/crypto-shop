import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [productDollarPrice, setProductDollarPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isProductPromoted, setIsProductPromoted] = useState(false);
  const [productPromotion, setProductPromotion] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //// testowanko

  // Lista predefiniowanych kategorii
  const predefinedCategories = [
    "Category 1",
    "Category 2",
    "food",
    // Dodaj tutaj pozostałe predefiniowane kategorie z bazy danych
  ];

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
    // Podobnie jak wcześniej, dodaj logikę do wysłania danych produktu na serwer
    // Pamiętaj, że musisz również przekazać identyfikator użytkownika (user_id) dla danego produktu,
    // który możesz uzyskać z appContext.
    // Przykład:
    // const newProduct = {
    //
    //   productName,
    //   productDescription,
    //   productDollarPrice,
    //   productQuantity,
    //   productPromotion: isProductPromoted ? productPromotion : undefined,
    //   user_id: appContext.userId
    // };
    // Wyślij zapytanie POST do serwera, aby dodać produkt
    // axios.post("/api/products", newProduct).then((response) => {
    //   // Obsłuż odpowiedź serwera, np. wyświetl komunikat o powodzeniu dodania produktu.
    // }).catch((error) => {
    //   // Obsłuż błąd, np. wyświetl komunikat o niepowodzeniu dodania produktu.
    // });
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
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          {predefinedCategories.map((category) => (
            <option key={category} value={category}>
              {category}
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
