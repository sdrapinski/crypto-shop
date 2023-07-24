import React, { useState } from "react";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [productDollarPrice, setProductDollarPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isProductPromoted, setIsProductPromoted] = useState(false);
  const [productPromotion, setProductPromotion] = useState("");

  // Lista predefiniowanych kategorii
  const predefinedCategories = [
    "Category 1",
    "Category 2",
    "food",
    // Dodaj tutaj pozostałe predefiniowane kategorie z bazy danych
  ];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleAddProduct = () => {
    // Podobnie jak wcześniej, dodaj logikę do wysłania danych produktu na serwer
    // Pamiętaj, że musisz również przekazać identyfikator użytkownika (user_id) dla danego produktu,
    // który możesz uzyskać z appContext.
    // Przykład:
    // const selectedProductCategory = customCategory || selectedCategory;
    // const newProduct = {
    //   productName,
    //   productDescription,
    //   productCategory: selectedProductCategory,
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

  return (
    <div className="add-product-container">
      <h2 className="add-product-header">Add Product</h2>
      <form className="add-product-form">
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
        {/* Użyj elementu datalist do wyświetlenia listy sugestii */}
        <input
          type="text"
          value={selectedCategory}
          onChange={handleCategoryChange}
          list="categories"
        />
        <datalist id="categories">
          {predefinedCategories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
        <br />

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

        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
