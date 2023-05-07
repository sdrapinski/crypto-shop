import jwt_decode from "jwt-decode";

export class User {
  user_name: string;
  user_surname: string;
  user_id: Number;
  user_age: number;
  user_email: string;
  user_phone_number: string;
  join_date: Date;
  continent: string;
  country: string;
  city: string;
  street: string;
  user_password: string;
  user_login: string;

  constructor(token: string) {
    const decodedToken: User = jwt_decode(token);
    this.user_id = decodedToken.user_id;
    this.user_name = decodedToken.user_name;
    this.user_surname = decodedToken.user_surname;
    this.user_email = decodedToken.user_email;
    this.user_phone_number = decodedToken.user_phone_number;
    this.join_date = new Date(decodedToken.join_date);
    this.user_age = decodedToken.user_age;
    this.continent = decodedToken.continent;
    this.country = decodedToken.country;
    this.city = decodedToken.city;
    this.street = decodedToken.street;
    this.user_password = decodedToken.user_password;
    this.user_login = decodedToken.user_login;
  }
}
