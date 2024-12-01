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
        await axios
          .put(
            `${appContext?.backendUrl}/offer/product/${productId}`,
            product,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((resp) => {
            console.log(resp.data);
          });

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
    <div className={"container d-flex justify-content-center align-items-center mt-4"}>
        <div className={"card card-body"}>
            <h3>Edit Product</h3>
            <form
                onSubmit={handleEdit}
                style={{display: "flex", flexDirection: "column", maxWidth: "800px"}}
            >
                <label className={"fw-bold my-1"}>Product Name:</label>
                <input className={"form-control form-control-sm"}
                    type="text"
                    value={product.product_name}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({
                            ...prevProduct!,
                            product_name: e.target.value,
                        }))
                    }
                />

                <label className={"fw-bold my-1"}>Product Description:</label>
                <textarea className={"form-control form-control-sm"}
                    value={product.product_description}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({
                            ...prevProduct!,
                            product_description: e.target.value,
                        }))
                    }
                />

                <label className={"fw-bold my-1"}>Product Quantity:</label>
                <input className={"form-control form-control-sm"}
                    type="number"
                    value={product.product_quantity}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({
                            ...prevProduct!,
                            product_quantity: parseInt(e.target.value),
                        }))
                    }
                />
                <label className={"fw-bold my-1"}>Product Price:</label>
                <input className={"form-control form-control-sm"}
                    type="number"
                    value={product.product_dollar_price}
                    onChange={(e) =>
                        setProduct((prevProduct) => ({
                            ...prevProduct!,
                            product_dollar_price: parseFloat(e.target.value),
                        }))
                    }
                />

                <div>
                    <button className={"btn btn-primary mt-2"} type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default EditProduct;
