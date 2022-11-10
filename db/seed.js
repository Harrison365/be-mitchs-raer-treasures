const db = require("./");
const format = require("pg-format");
const { makeRefObj } = require("../makeRefObj.js");

const seed = ({ shopData, treasureData }) => {
  return db.query(`DROP TABLE IF EXISTS treasures;`).then(() => {
    // drop any existing shops table
    return db.query(`DROP TABLE IF EXISTS shops;`).then(() => {
      return db
        .query(
          `CREATE TABLE shops (shop_id SERIAL PRIMARY KEY, shop_name VARCHAR(100) NOT NULL, owner VARCHAR(50) NOT NULL, slogan TEXT);`
        )
        .then(() => {
          return db.query(
            `CREATE TABLE treasures (treasure_id SERIAL PRIMARY KEY, treasure_name VARCHAR(100) NOT NULL, colour VARCHAR(20) NOT NULL, age INT NOT NULL, cost_at_auction FLOAT NOT NULL, shop_id INT REFERENCES shops(shop_id));`
          );
        })
        .then(() => {
          //inserting data using a array of objects
          //first map over and turn into array of arrays of property values
          const arrayOfArrays = shopData.map(({ shop_name, owner, slogan }) => {
            return [shop_name, owner, slogan];
          });
          //use pg-format to turn an SQL query string and the array of arrays into a full SQL query string. %L is a place holder for values, which will be made using the array of arrays.
          const sqlStr = format(
            `INSERT INTO shops (shop_name, owner, slogan) VALUES %L RETURNING *`,
            arrayOfArrays
          );
          //run the pg.query with the SQL string. This will return an object of each insertion in an array (result.rows) because we used RETURNING *
          return db.query(sqlStr);
        })
        .then((result) => {
          console.log(treasureData);
          const refObj = makeRefObj(result.rows);
          const treasureWithShopId = treasureData.map(
            ({ treasure_name, colour, age, cost_at_auction, shop }) => {
              return {}; //HERE!!!!!!
            }
          );
        });
    });
  });
};

module.exports = seed;
