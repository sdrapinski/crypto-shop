export interface mainPageProductsInterface {
  product_added_time: string;
  product_description: string;
  product_dollar_price: number;
  product_id: string;
  product_images: string;
  product_name: string;
  product_popularity: number;
  product_promotion: Date | null;
  product_quantity: number;
  product_watched_by_id: string;
  products_category: {
    product_category_id: number;
    product_category_name: string;
  };
  product_used: Boolean;
  products_category_id: number;
  user_id: string;
  product_crypto:boolean
}

export interface ProductsArrayInterface {
  products: Array<mainPageProductsInterface>;
}

export interface NewProductsArrayInterface {
  products: Array<ProductPageProductsInterface>;
}

export interface ProductDetailsInterface extends mainPageProductsInterface {
  
  user: {
    user_name: string;
  };
 
}

export interface ProductPageProductsInterface extends mainPageProductsInterface {
  
  user: {
    user_name: string;
    user_surname:string,
    user_login:string
  };
 
}
