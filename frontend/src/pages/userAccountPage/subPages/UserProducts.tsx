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
    appContext?.user?.user_id;

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
        if (resp.status === 200) {
          const filteredProducts = products.filter(
            (product) => product_id !== product.product_id
          );
          setproducts(filteredProducts);
        } else {
          console.error("unable to delete a product");
        }
      });
  };

  return (
    <div className="tab-pane fade show active" id="userProduct-content">
      <div className={""}>
        {products.map((prod) => (
            <div className={"card card-body my-2"}>
              <div className={"row col-12 my-1"} key={prod.product_id}>
                <div className={"col-4 fw-bold d-flex justify-content-start align-items-center"}>
                  {prod.product_name}{" "}
                </div>
                <div className={"col-8 d-flex justify-content-end align-items-center"}>
                  <NavLink className={"btn btn-primary me-1"} to={`editProduct/${prod.product_id}`}>
                    {" "}
                    Edit Product{" "}
                  </NavLink>{" "}
                  <button className={"btn btn-danger"}
                          onClick={() => {
                            setselectedProduct(prod);
                            setModalShow(true);
                          }}
                  >
                    Delete Product
                  </button>
                  {" "}
                </div>
              </div>
            </div>
        ))}
      </div>
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
