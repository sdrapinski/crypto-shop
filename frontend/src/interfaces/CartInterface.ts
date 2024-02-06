export interface CartInterface {
  cart_id: string;
  cartItems: CartItem[];
}

interface CartItem {
  cart_item_id: string;
  product_id: string;
  quntity: number;
  product: Product;
}

interface Product {
  product_name: string;
  product_dollar_price: number;
}
