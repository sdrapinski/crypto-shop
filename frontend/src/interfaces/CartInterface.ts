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
}
