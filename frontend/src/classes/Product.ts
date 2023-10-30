export class Product {
  product_id: string;
  user_id: string;
  product_category_id: number;
  product_name: string;
  product_description?: string;
  product_images: any;
  product_dollar_price: number;
  product_quantity: number;
  product_watched_by_id: string;
  product_popularity?: number;
  product_added_time: Date;
  product_promotion?: Date;

  constructor(
    product_id: string,
    user_id: string,
    product_category_id: number,
    product_name: string,
    product_images: any,
    product_dollar_price: number,
    product_quantity: number,
    product_watched_by_id: string,
    product_added_time: Date,
    product_promotion?: Date,
    product_description?: string,
    product_popularity?: number
  ) {
    this.product_id = product_id;
    this.user_id = user_id;
    this.product_category_id = product_category_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_images = product_images;
    this.product_dollar_price = product_dollar_price;
    this.product_quantity = product_quantity;
    this.product_watched_by_id = product_watched_by_id;
    this.product_added_time = product_added_time;
    this.product_promotion = product_promotion;
    this.product_popularity = product_popularity;
  }
}
