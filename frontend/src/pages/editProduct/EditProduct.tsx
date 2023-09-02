import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../state/AppContext";
import { useParams } from "react-router-dom";
import { ProductDetailsInterface } from "../../interfaces/product.interface";

const EditProduct = () => {
  const appContext = useContext(AppContext);

  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsInterface | null>(null);

  useEffect(() => {
    axios
      .get<ProductDetailsInterface>(
        `${appContext?.backendUrl}/offer/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        setProduct(resp.data);
      });

    return () => {};
  }, [productId]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (product) {
        await axios.put(
          `${appContext?.backendUrl}/offer/product/${productId}`,
          product,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // Po zaktualizowaniu przekieruj na stronę z listą produktów lub gdziekolwiek chcesz
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Edit Product</h3>
      <form
        onSubmit={handleEdit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "800px" }}
      >
        <label>Product Name:</label>
        <input
          type="text"
          value={product.product_name}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct!,
              product_name: e.target.value,
            }))
          }
        />

        <label>Product Description:</label>
        <textarea
          value={product.product_description}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct!,
              product_description: e.target.value,
            }))
          }
        />

        <label>Product Quantity:</label>
        <input
          type="number"
          value={product.product_quantity}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct!,
              product_quantity: parseInt(e.target.value),
            }))
          }
        />
        <label>Product Price:</label>
        <input
          type="number"
          value={product.product_dollar_price}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct!,
              product_dollar_price: parseFloat(e.target.value),
            }))
          }
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
