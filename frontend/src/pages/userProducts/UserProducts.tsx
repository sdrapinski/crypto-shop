import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../state/AppContext";
import { ProductDetailsInterface } from "../../interfaces/product.interface";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteProductModal from "../../components/Modals/DeleteProductModal";

const UserProducts = () => {
  const [products, setproducts] = useState<ProductDetailsInterface[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setselectedProduct] =
    useState<ProductDetailsInterface>();
  const appContext = useContext(AppContext);

  const userID =
    appContext?.user?.user_id || "4d5686cf-c756-445e-a6f7-b04f2c615d2e";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ProductDetailsInterface[]>(
        `${appContext?.backendUrl}/getUserProducts/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        setproducts(resp.data);
      });

    return () => {};
  }, []);

  const handleDeleteProduct = async (product_id: string) => {
    await axios
      .delete(`${appContext?.backendUrl}/deleteOffer/${product_id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
    navigate("/account/userProducts");
  };

  return (
    <div>
      <h3>UserProducts </h3>
      <ul>
        {products.map((prod) => (
          <li key={prod.product_id}>
            {prod.product_name}{" "}
            <button>
              {" "}
              <NavLink to={`editProduct/${prod.product_id}`}>
                {" "}
                Edit Product{" "}
              </NavLink>{" "}
            </button>{" "}
            <button
              onClick={() => {
                setselectedProduct(prod);
                setModalShow(true);
              }}
            >
              Delete Product
            </button>{" "}
          </li>
        ))}
      </ul>
      {selectedProduct ? (
        <DeleteProductModal
          callback={() => handleDeleteProduct(selectedProduct.product_id)}
          product={selectedProduct}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </div>
  );
};

export default UserProducts;
