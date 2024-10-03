export interface UserData {
    user_name: string | null;
    user_surname: string | null;
    user_email: string;
    user_phone_number: string | null;
    user_login: string;
    user_date_of_birth: string | null;
}

export interface UserOrderHistory {
    product_name: string;
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