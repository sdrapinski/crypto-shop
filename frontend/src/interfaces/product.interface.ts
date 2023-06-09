export interface mainPageProductsInterface {
  product_added_time: string;
  product_description: string;
  product_dollar_price: number;
  product_id: string;
  product_images: {};
  product_name: string;
  product_popularity: number;
  product_promotion: Date | null;
  product_quantity: number;
  product_watched_by_id: string;
  products_category: {
    product_category_id: number;
    product_category_name: string;
  };
  products_category_id: number;
  user_id: string;
}
