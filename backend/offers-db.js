const DB = require('./db.js');

class Offers{
    #db=new DB();
    addOffer(user_id, product_name, products_category_id, product_cost_cash, product_cost_crypto, product_quantity, product_destcription, photo_id, added_when, popularity){
        const query = `
          INSERT INTO products (user_id, product_name, products_category_id, product_cost_cash, product_cost_crypto, product_quantity, product_destcription, photo_id, added_when) 
          VALUES (${user_id}, ${product_name}, ${products_category_id}, ${product_cost_cash}, ${ product_cost_crypto}, ${product_quantity}, ${product_destcription}, ${photo_id}, ${photo_id}, ${added_when})
        `;
        this.#db.INSERT(query);
      };
      removeOffer(products_id){
        const query = `
          DELETE FROM products WHERE products_id=${products_id}
        `;
        this.#db.DELETE(query);
      };
      overwrite_Offer( products_id, product_name, product_cost_cash, product_cost_crypto, product_quantity, product_destcription, photo_id, photo_id){
        const query = `
          UPDATE products SET product_name=${product_name} ,product_cost_cash=${product_cost_cash}, product_cost_crypto= ${ product_cost_crypto}, product_quantity=${product_quantity}, product_destcription=${product_destcription} , photo_id=  ${photo_id}, added_when=${added_when}
          WHERE products_id=${products_id}
        `;
        this.#db.INSERT(query);
      };
        OfferSearch(Searched_pharse){
          const query = `
           SELECT products WHERE product_name LIKE '%${Searched_pharse}%' OR product_destcription LIKE '%${Searched_pharse}%'
          `;
        return this.#db.SELECT(query);
      };
}
module.exports = Offers;
