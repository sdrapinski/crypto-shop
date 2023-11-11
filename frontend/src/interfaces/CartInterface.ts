export interface CartInterface {
  cart_id: string;
  cartItems: CartItem[];
}

interface CartItem {
  cart_item_id: string;
  product_id: string;
  quntity: number;
}
