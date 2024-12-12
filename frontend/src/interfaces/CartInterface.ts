export interface CartInterface {
  cart_id: string;
  cartItems: CartItem[];
}

export interface CartItem {
  cart_item_id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface Product {
  product_name: string;
  product_dollar_price: number;
  product_images: string;
  user:User
}

interface User {
  user_id: string;
  user_name:string;
  user_surname:string;
  
}