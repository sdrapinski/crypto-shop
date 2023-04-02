const DB = require('./db.js');

class adoffer{
    #db=new DB();
    addOffer(user_id, products_id, product_name, product_cost_cash, product_cost_crypto, product_quantity, product_destcription, photo_id){
        const query = `
          INSERT INTO offers (user_id, products_id, product_name, product_cost_cash, product_cost_crypto, product_quantity, product_destcription, photo_id) 
          VALUES (${user_id}, ${products_id}, ${product_name}, ${product_cost_cash}, ${ product_cost_crypto}, ${product_quantity}, ${product_destcription}, ${photo_id})
        `;
        this.#db.INSERT(query);
      };
}