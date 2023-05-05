export class User {
  isLoggedIn = true;
  user_name?: string;
  user_surname?: string;
  user_age?: number;
  user_email?: string;
  user_phone_number?: string;
  join_date?: Date;
  continent?: string;
  country?: string;
  city?: string;
  street?: string;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
