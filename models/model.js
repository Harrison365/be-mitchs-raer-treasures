const db = require("../db");

exports.selectTreasures = ({ sort_by = "age", order = "asc", colour }) => {
  order = order.toLowerCase();
  if (
    sort_by !== "age" &&
    sort_by !== "cost_at_auction" &&
    sort_by !== "treasure_name"
  ) {
    //  if(!["age", "cost_at_auction", "treasure_name"].includes(sort_by)); is an alternatice to this if statement.
    return Promise.reject({ status: 400, msg: "Invalid sort value" });
  }
  if (order !== "asc" && order !== "desc") {
    //if(!["asc", "desc"].includes(order)) is an alternative if statement.
    return Promise.reject({ status: 400, msg: "Invalid order value :)" });
  }

  const queryValues = [];

  let queryStr = `
      SELECT treasures.*, shop_name FROM treasures
      JOIN shops ON treasures.shop_id = shops.shop_id `;

  /*`SELECT * FROM treasures
JOIN shops ON treasures.shop_id = shops.shop_id`
^^^
This will also work nut will not only give you all of the treasure columns and shop_id columns but all of the other shop columns too (which isnt necessary).
*/

  if (colour) {
    queryValues.push(colour);
    queryStr += `WHERE colour = $1 `;
  }

  queryStr += `ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, queryValues).then(({ rows }) => rows);
};

exports.updateTreasure = (id, body) => {
  const cost_at_auction = body.cost_at_auction;
  return db
    .query(
      `UPDATE treasures SET cost_at_auction = $1 WHERE treasure_id = $2 RETURNING *;`,
      [cost_at_auction, id]
    )
    .then((res) => {
      return res.rows[0];
    });
};
//
