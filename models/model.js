const db = require("../db")


exports.fetchTreasures = () => {
return db.query('SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures JOIN shops ON treasures.shop_id = shops.shop_id;').then((result) => {
    return result.rows
})
}