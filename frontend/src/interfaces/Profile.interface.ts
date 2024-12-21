export interface UserData {
    user_name: string | null;
    user_surname: string | null;
    user_email: string;
    user_phone_number: string | null;
    user_login: string;
    user_date_of_birth: string | null;
}

export interface Notification {
    notification_id: string;
    productsBought_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
    productsBought: UserOrderHistory;
}

export interface UserOrderHistory {
    products_bought_id: string;
    buyer_id: string;
    seller_id: string;
    notification_id: string;
    sale_time: string;
    delivery_id: string;
    products_bought_items: ProductsBoughtItem[];
    delivery: Delivery;
    seller: Seller;
}

interface Product {
    product_id: string;
    user_id: string;
    products_category_id: number;
    product_name: string;
    product_description: string;
    product_images: string;
    product_dollar_price: number;
    product_quantity: number;
    product_watched_by_id: string;
    product_popularity: number;
    product_added_time: string;
    product_promotion: string | null;
    product_used: boolean;
    product_crypto: boolean;
}

interface ProductsBoughtItem {
    products_bought_items_id: string;
    products_bought_id: string;
    product_id: string;
    product_quantity: number;
    product: Product;
}

interface Delivery {
    id: string;
    city: string;
    street: string;
    houseNumber: number;
    postcode: string;
    phoneNumber: string;
    email: string;
    status: string;
    productsBought_id: string;
    supplier_id: string;
}

interface Seller {
    user_id: string;
    user_name: string;
    user_surname: string;
    user_email: string;
    user_date_of_birth: string;
    user_phone_number: string;
    user_login: string;
    user_password: string;
    user_join_date: string;
    user_avatar_url: string;
    user_premium_tokens: string | null;
}


export interface UserMessage {
    sender:{
        user_name: string;
        user_surname: string;
        user_email: string;
    },
    message: {
        content: string;
        is_read: number;
    }
}