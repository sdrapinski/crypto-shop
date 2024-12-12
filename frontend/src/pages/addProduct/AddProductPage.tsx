import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import Form from "react-bootstrap/Form";
import { CategoriesInterface } from "../../interfaces/categories.interface";
import { AppContext } from "../../state/AppContext";
import { useNavigate } from 'react-router-dom';


interface ProductInfoInterface {
  product_name: string;
  product_description: string;
  products_category_id: number;
  product_dollar_price: number;
  product_quantity: number;
  product_promotion: Date | null;
  product_images: string;
  product_used: boolean;
  product_popularity: number;
  product_crypto: boolean;
  user_id: string | undefined;
}

const categoriesInit = {
  data: [{ product_category_id: 0, product_category_name: "", procuct_category_image:"" }],
};

const AddProductPage = () => {
  const appContext = useContext(AppContext);
  const user = appContext?.user;
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setcategories] =
    useState<CategoriesInterface>(categoriesInit);

  const [productDollarPrice, setProductDollarPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isProductPromoted, setIsProductPromoted] = useState(false);
  const [productPromotion, setProductPromotion] = useState("");
  const [isUsed, setisUsed] = useState<boolean>(false)
  const [cryptoAllowed, setiCryptoAllowed] = useState<boolean>(false)
  const [productImage, setProductImage] = useState<string>("")
  const [buttonStatus, setButtonStatus] = useState<{text:string,status:number }>({text:"Add Product",status:0 })
  const [isUserWalletActive, setisUserWalletActive] = useState(false)

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {

    if(appContext?.user?.user_wallets && appContext.user.user_wallets.length > 0){
      const activeWallets = appContext.user.user_wallets.filter((wallet)=>wallet.wallet_status === "Active")
      activeWallets.length > 0 ? setisUserWalletActive(true) : setisUserWalletActive(false)
    }
    
    
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

  const areAllFieldsFilled = (productInfo: ProductInfoInterface): boolean => {
    // Lista wymaganych pól
    const requiredFields = [
      "product_name",
      "product_description",
      "products_category_id",
      "product_dollar_price",
      "product_quantity",
      "product_images",
      "user_id",
    ];
  
    // Sprawdzanie, czy każde wymagane pole jest wypełnione
    return requiredFields.every((field) => {
      const value = productInfo[field as keyof typeof productInfo];
      return value !== undefined && value !== null && value !== "";
    });
  };


  const handleAddProduct = () => {
    // Tworzenie obiektu reprezentującego nowy produkt
    const Productinfo = {
      product_name: productName,
      product_description: productDescription,
      products_category_id: parseInt(selectedCategoryId), 
      product_dollar_price:productDollarPrice,
      product_quantity:productQuantity,
      product_promotion: isProductPromoted ? new Date(productPromotion) : null,
      product_images: JSON.stringify({src:productImage}),
      product_used:isUsed,
      product_popularity:0,
      product_crypto:cryptoAllowed,
      
      user_id: appContext?.user?.user_id,
    };
    console.log(Productinfo);
    
    if(areAllFieldsFilled(Productinfo)){
      axios
      .post(`${backendUrl}/offer/createOffer`, Productinfo, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then( (response) => {
        // Obsługa odpowiedzi serwera po pomyślnym dodaniu produktu
        setButtonStatus({text:"Product added successfully",status:200})
        setTimeout(() => {
        setProductDollarPrice(0);
        setProductQuantity(0);
        setProductName("")
        setProductDescription("")
        setIsProductPromoted(false);
        setProductPromotion("");
        setisUsed(false);
        setiCryptoAllowed(false);
        setProductImage("");
        setButtonStatus({ text: "Add Product", status: 0 });
        }, 2000);
       
      })
      .catch((error) => {
        // Obsługa błędów podczas dodawania produktu
        setButtonStatus({text:"Failed to add item",status:400})
      });
    }
    
    
  };


 

  return (
    <div className="add-product-container">
      <h2 className="add-product-header">Add Product</h2>
      <label>Product image url:</label>
        <input
          type="text"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
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
          Is Product Used?
          <input
            type="checkbox"
            checked={isUsed}
            onChange={(e) => setisUsed(e.target.checked)}
          />{" "}
        </label> <br />
        <label>
          Allow Cryptocurrency payments?
          <input
            type="checkbox"
            checked={cryptoAllowed}
            onChange={(e) => setiCryptoAllowed(e.target.checked)}
            disabled = {isUserWalletActive? false : true}
          />{" "}
          {isUserWalletActive? <></> : <span style={{color:"red"}}>First assign and activate MetaMask wallet in your account wallet options </span>}
        </label>
        
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
          className={buttonStatus.status === 0 ? "primary" : buttonStatus.status === 200 ? "success" : "danger"}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
         {buttonStatus.text}
        </button>
      </div>
  );
};

export default AddProductPage;
