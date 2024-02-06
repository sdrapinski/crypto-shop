import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../state/AppContext";
import { ProductDetailsInterface } from "../../../interfaces/product.interface";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteProductModal from "../../../components/Modals/DeleteProductModal";

const UserProducts = () => {
  const [products, setproducts] = useState<ProductDetailsInterface[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setselectedProduct] =
    useState<ProductDetailsInterface>();
  const appContext = useContext(AppContext);

  const userID =
    appContext?.user?.user_id || "066a9388-56f0-4940-a0d0-a2d46d49db42";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<ProductDetailsInterface[]>(
        `${appContext?.backendUrl}/offer/getUserProducts/${userID}`,
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
      .delete(`${appContext?.backendUrl}/offer/deleteOffer/${product_id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
    navigate("/account");
  };

  return (
    <div className="tab-pane fade show active" id="userProduct-content">
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
